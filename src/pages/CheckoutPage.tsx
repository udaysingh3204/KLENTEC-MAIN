import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";
import { regionalConfigs } from "@/config/regionalConfig";
import { PaymentButton } from "@/components/PaymentButton";
import { CurrencySelector } from "@/components/CurrencySelector";
import { ArrowLeft, Shield, Clock, Lock } from "lucide-react";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedRegion, formatPrice } = useRegionalPrice();

  const serviceId = searchParams.get("serviceId") || "";
  const serviceName = searchParams.get("serviceName") || "";
  const amount = parseFloat(searchParams.get("amount") || "0");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const config = regionalConfigs[selectedRegion];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && amount > 0;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Secure Checkout</h1>
          </div>
          <CurrencySelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Order Details */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                  <div>
                    <p className="text-sm text-slate-400">Service</p>
                    <p className="text-lg font-semibold text-white">
                      {serviceName || "Service"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Price</p>
                    <p className="text-lg font-bold text-purple-400">
                      {formatPrice(amount)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-white">
                  <p className="font-semibold">Total</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {formatPrice(amount)}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Shield size={18} className="text-green-400" />
                  <span>Secure payment powered by{" "} {selectedRegion === "IN" ? "Razorpay" : selectedRegion === "US" ? "Stripe" : "Telr"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Lock size={18} className="text-green-400" />
                  <span>PCI-DSS Compliant & Encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Clock size={18} className="text-green-400" />
                  <span>Instant confirmation & receipt</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Billing Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name (optional)"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-32 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6">
                Payment Method
              </h3>

              {/* Gateway Info */}
              <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
                <p className="text-xs text-slate-400 mb-2">PAYMENT GATEWAY</p>
                <p className="text-lg font-semibold text-white">
                  {selectedRegion === "IN"
                    ? "🇮🇳 Razorpay (India)"
                    : selectedRegion === "US"
                    ? "🇺🇸 Stripe (USA)"
                    : selectedRegion === "AE"
                    ? "🇦🇪 Telr (UAE)"
                    : "🇸🇦 Telr (Saudi Arabia)"}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Currency: {config.currency}
                </p>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-8 pb-8 border-b border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Service Price</span>
                  <span className="text-white">{formatPrice(amount)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total Amount</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {formatPrice(amount)}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <PaymentButton
                serviceId={serviceId}
                serviceName={serviceName}
                amount={amount}
                currency={config.currency}
                customerName={formData.name}
                customerEmail={formData.email}
                customerPhone={formData.phone}
                label={`Pay ${formatPrice(amount)}`}
                variant="primary"
                className="w-full justify-center"
              />

              {!isFormValid && (
                <p className="text-xs text-slate-400 mt-4 text-center">
                  Please fill in name and email to continue
                </p>
              )}

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-slate-700 space-y-2 text-xs text-slate-400">
                <p>✓ 256-bit SSL Encrypted</p>
                <p>✓ Global Payment Support</p>
                <p>✓ Instant Invoice & Receipt</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
