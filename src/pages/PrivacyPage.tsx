import { motion } from "framer-motion";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-lg text-slate-300">Last updated: July 2, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-slate-300"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  KLENTEC ("we", "us", "our", or "Company") operates the klentec.com website (hereinafter referred to as "Service").
                </p>
                <p className="mt-4">
                  Our Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• <strong>Contact Form Data:</strong> Name, email, phone, company, message</li>
                  <li>• <strong>Analytics Data:</strong> Browser type, IP address, pages visited, time on site</li>
                  <li>• <strong>Cookies:</strong> To improve user experience and track website usage</li>
                  <li>• <strong>Communication Data:</strong> If you contact us via email or phone</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Use of Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• Respond to your inquiries and requests</li>
                  <li>• Improve our website and services</li>
                  <li>• Analyze website usage and trends</li>
                  <li>• Send marketing communications (with your consent)</li>
                  <li>• Provide customer support</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p>We may use third-party services including:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• <strong>Google Analytics:</strong> For website analytics</li>
                  <li>• <strong>Netlify:</strong> For website hosting</li>
                  <li>• <strong>Supabase:</strong> For data storage</li>
                  <li>• <strong>EmailJS:</strong> For email communications</li>
                </ul>
                <p className="mt-4">
                  These third parties have their own privacy policies governing their collection and use of data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                <p>
                  We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Data portability</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 text-slate-300">
                  <p><strong>Email:</strong> privacy@klentec.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> KLENTEC, India</p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mt-8">
                <p className="text-sm">
                  This Privacy Policy is effective as of July 2, 2026, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately upon posting on the website.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
