import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, Home, Mail } from "lucide-react";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useRegionalPrice();
  const [isLoading, setIsLoading] = useState(true);

  const orderId = searchParams.get("orderId") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const serviceName = searchParams.get("serviceName") || "Service";
  const amount = parseFloat(searchParams.get("amount") || "0");
  const email = searchParams.get("email") || "";

  useEffect(() => {
    // Simulate order processing completion
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {isLoading ? (
        <div className="text-center">
          <motion.div
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <CheckCircle size={64} className="text-green-400" />
          </motion.div>
          <p className="text-slate-400">Processing your order...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* Success Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900/20 border border-green-500/30">
                <CheckCircle size={48} className="text-green-400" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-2"
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mb-8"
            >
              Your order has been confirmed and processing
            </motion.p>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700 space-y-4"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <span className="text-slate-400">Service</span>
                <span className="text-white font-semibold">{serviceName}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <span className="text-slate-400">Amount Paid</span>
                <span className="text-lg font-bold text-green-400">
                  {formatPrice(amount)}
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <span className="text-slate-400">Order ID</span>
                <span className="text-white font-mono text-sm">{orderId || "N/A"}</span>
              </div>

              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Payment ID</span>
                  <span className="text-white font-mono text-sm">{paymentId}</span>
                </div>
              )}
            </motion.div>

            {/* Status Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 mb-8 p-4 rounded-lg bg-green-900/10 border border-green-500/20"
            >
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm">Payment received and verified</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm">Order confirmation sent to {email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm">Our team will contact you shortly</span>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
            >
              <p className="text-slate-300 mb-2 font-semibold">What's next?</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>✓ Check your email for order confirmation and invoice</li>
                <li>✓ Our team will reach out within 24 hours</li>
                <li>✓ You'll receive project kickoff details soon</li>
              </ul>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all"
              >
                <Home size={18} />
                Back to Home
              </button>

              <button
                onClick={() => navigate("/services")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-600 hover:border-purple-500 text-slate-300 hover:text-purple-400 font-semibold transition-all"
              >
                <Mail size={18} />
                View Services
              </button>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-8 border-t border-slate-800 text-slate-400 text-sm"
            >
              <p>
                Questions? Contact us at{" "}
                <a
                  href="mailto:support@klentec.com"
                  className="text-purple-400 hover:text-purple-300"
                >
                  support@klentec.com
                </a>
              </p>
            </motion.div>
          </div>

          {/* Invoice Download Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-slate-400 text-sm flex items-center justify-center gap-2"
          >
            <Download size={16} />
            <span>Download invoice from your email</span>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default PaymentSuccessPage;
