import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Message } from "@/lib/types";

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

const ClientMessagesPage = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  const scrollDown = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const { data: cl } = await supabase.from("clients").select("id").eq("user_id", profile.id).single();
      if (!cl) { setLoading(false); return; }
      setClientId(cl.id);

      const { data } = await supabase.from("messages").select("*,profiles(full_name,avatar_url)").eq("client_id", cl.id).order("created_at");
      setMessages(data ?? []);
      setLoading(false);
      scrollDown();

      // Mark admin messages as read
      await supabase.from("messages").update({ read_at: new Date().toISOString() })
        .eq("client_id", cl.id).eq("is_admin", true).is("read_at", null);
    };
    load();
  }, [profile]);

  // Real-time subscription
  useEffect(() => {
    if (!clientId) return;
    const channel = supabase
      .channel(`messages:${clientId}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `client_id=eq.${clientId}`,
      }, async (payload) => {
        const { data } = await supabase.from("messages")
          .select("*,profiles(full_name,avatar_url)").eq("id", payload.new.id).single();
        if (data) {
          setMessages((p) => [...p, data]);
          scrollDown();
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [clientId]);

  const send = async () => {
    if (!text.trim() || !clientId || !profile) return;
    setSending(true);
    const payload = {
      client_id: clientId,
      sender_id: profile.id,
      content: text.trim(),
      is_admin: false,
    };
    const { data } = await supabase.from("messages").insert(payload).select("*,profiles(full_name,avatar_url)").single();
    if (data) setMessages((p) => [...p, data]);
    setText("");
    setSending(false);
    scrollDown();
  };

  // Group messages by date
  const grouped: { date: string; msgs: Message[] }[] = [];
  messages.forEach((m) => {
    const d = fmtDate(m.created_at);
    const last = grouped[grouped.length - 1];
    if (last && last.date === d) last.msgs.push(m);
    else grouped.push({ date: d, msgs: [m] });
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your direct line to the KLENTEC team.</p>
      </div>

      {/* No client */}
      {!clientId ? (
        <div className="card-dreamy p-12 text-center flex-1">
          <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Account not linked. Contact your KLENTEC team.</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 card-dreamy overflow-hidden">
          {/* Message thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-1 scroll-smooth">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-12 h-12 text-muted mb-3" />
                <p className="text-muted-foreground font-medium">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Start the conversation. Your KLENTEC team will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <>
                {grouped.map(({ date, msgs }) => (
                  <div key={date}>
                    {/* Date divider */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-border/40" />
                      <span className="text-xs text-muted-foreground font-medium px-2">{date}</span>
                      <div className="flex-1 h-px bg-border/40" />
                    </div>

                    {msgs.map((m) => {
                      const isMe = !m.is_admin;
                      return (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-end gap-2.5 max-w-[75%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                            {/* Avatar */}
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${isMe ? "opacity-0" : ""}`}
                              style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
                              K
                            </div>

                            {/* Bubble */}
                            <div>
                              {!isMe && (
                                <p className="text-[10px] text-muted-foreground font-semibold mb-1 ml-1 uppercase tracking-wide">KLENTEC Team</p>
                              )}
                              <div
                                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-full ${
                                  isMe
                                    ? "text-white rounded-br-sm"
                                    : "bg-muted/70 text-foreground rounded-bl-sm"
                                }`}
                                style={isMe ? {
                                  background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))",
                                } : {}}
                              >
                                {m.content}
                              </div>
                              <p className={`text-[10px] text-muted-foreground mt-1 ${isMe ? "text-right mr-1" : "ml-1"}`}>
                                {fmtTime(m.created_at)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border/30 p-4 shrink-0">
            <div className="flex gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                }}
                placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
                rows={2}
                className="flex-1 px-4 py-3 rounded-2xl border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm resize-none bg-background"
              />
              <button
                onClick={send}
                disabled={!text.trim() || sending}
                className="w-12 h-12 self-end rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-40 hover:-translate-y-0.5 shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Your KLENTEC team responds within 4 business hours · Mon–Sat, 10 AM – 7 PM IST
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientMessagesPage;
