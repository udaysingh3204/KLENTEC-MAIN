import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Receipt, IndianRupee, Check, Clock, AlertTriangle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Invoice } from "@/lib/types";

const STATUS_CONFIG: Record<string, { cls: string; icon: React.ElementType; label: string }> = {
  pending:   { cls: "bg-amber-50 border-amber-200 text-amber-700",   icon: Clock,          label: "Payment Pending" },
  paid:      { cls: "bg-emerald-50 border-emerald-200 text-emerald-700", icon: Check,       label: "Paid" },
  overdue:   { cls: "bg-red-50 border-red-200 text-red-600",           icon: AlertTriangle, label: "Overdue" },
  cancelled: { cls: "bg-slate-50 border-slate-200 text-slate-500",    icon: XCircle,       label: "Cancelled" },
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const ClientInvoicesPage = () => {
  const { profile } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const { data: cl } = await supabase.from("clients").select("id").eq("user_id", profile.id).single();
      if (!cl) { setLoading(false); return; }
      setClientId(cl.id);
      const { data } = await supabase.from("invoices").select("*").eq("client_id", cl.id).order("created_at", { ascending: false });
      setInvoices(data ?? []);
      setLoading(false);
    };
    load();
  }, [profile]);

  const totalPaid    = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-48 bg-muted rounded-xl animate-pulse" />
        {[1,2,3].map(i => <div key={i} className="h-28 card-dreamy animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Invoices</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Summary */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Paid", amount: totalPaid, from: "from-emerald-500", to: "to-teal-600" },
            { label: "Pending",    amount: totalPending, from: "from-amber-500", to: "to-orange-500" },
            { label: "Overdue",    amount: totalOverdue, from: "from-red-500",   to: "to-rose-600" },
          ].map((s) => (
            <div key={s.label} className="card-dreamy p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.from} ${s.to} flex items-center justify-center shrink-0`}>
                <IndianRupee className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">{fmt(s.amount)}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice list */}
      {!clientId ? (
        <div className="card-dreamy p-12 text-center">
          <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Account not linked. Contact your KLENTEC team.</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="card-dreamy p-12 text-center">
          <Receipt className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted-foreground">No invoices yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Your invoices will appear here once issued.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv, i) => {
            const cfg = STATUS_CONFIG[inv.status];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`card-dreamy border p-5 ${cfg.cls}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold opacity-70">{inv.invoice_number}</p>
                      <p className="text-2xl font-display font-bold mt-0.5">{fmt(inv.amount)}</p>
                      {inv.description && (
                        <p className="text-xs opacity-70 mt-0.5 max-w-xs">{inv.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      <Icon className="w-4 h-4" />
                      {cfg.label}
                    </span>
                    <div className="mt-1 space-y-0.5 text-xs opacity-70">
                      <p>Issued {new Date(inv.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      {inv.due_date && inv.status === "pending" && (
                        <p>Due by {new Date(inv.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      )}
                      {inv.paid_at && (
                        <p>Paid {new Date(inv.paid_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      )}
                    </div>
                    {(inv.status === "pending" || inv.status === "overdue") && (
                      <a
                        href="https://wa.me/919557630336?text=Payment%20confirmation%20for%20invoice%20"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white transition-colors"
                      >
                        Confirm Payment
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Payment info */}
      <div className="card-dreamy p-5 border-primary/15">
        <p className="text-sm font-semibold text-foreground mb-3">Payment Options</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
          {[
            { label: "Bank Transfer", detail: "NEFT / IMPS — details on invoice" },
            { label: "UPI", detail: "Scan QR or send to klentec@upi" },
            { label: "EMI Available", detail: "On projects above ₹50,000" },
          ].map((p) => (
            <div key={p.label} className="p-3 rounded-xl bg-accent/30">
              <p className="font-medium text-foreground text-xs">{p.label}</p>
              <p className="text-xs mt-0.5">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientInvoicesPage;
