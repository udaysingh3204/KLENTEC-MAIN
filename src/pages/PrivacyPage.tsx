import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="How KLENTEC collects, uses, and protects your data."
        path="/privacy"
      />
      {/* Hero */}
      <section className="gradient-bg-hero pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-6"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-lg text-muted-foreground">Last updated: July 2, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-muted-foreground"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  KLENTEC ("we", "us", "our", or "Company") operates the klentec.com website (hereinafter referred to as "Service").
                </p>
                <p className="mt-4">
                  Our Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• <strong>Contact Form Data:</strong> Name, email, phone, company, message</li>
                  <li>• <strong>Analytics Data:</strong> Browser type, IP address, pages visited, time on site</li>
                  <li>• <strong>Cookies:</strong> To improve user experience and track website usage</li>
                  <li>• <strong>Communication Data:</strong> If you contact us via email or phone</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Use of Information</h2>
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

              <div id="security" className="scroll-mt-28">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Third-Party Services</h2>
                <p>We may use third-party services including:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• <strong>Vercel:</strong> For website hosting and privacy-friendly analytics</li>
                  <li>• <strong>Supabase:</strong> For data storage</li>
                  <li>• <strong>Resend:</strong> For email communications</li>
                </ul>
                <p className="mt-4">
                  These third parties have their own privacy policies governing their collection and use of data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Cookies</h2>
                <p>
                  We use Vercel Analytics to understand how visitors use this site. It's designed to be privacy-friendly and does not use tracking cookies. We use a small amount of local browser storage to remember your cookie consent choice. You can clear this at any time through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Your Rights</h2>
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
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 text-muted-foreground">
                  <p><strong>Email:</strong> info@klentec.com</p>
                  <p><strong>Phone:</strong> +91 9557 630336</p>
                  <p><strong>Address:</strong> KLENTEC, India</p>
                </div>
              </div>

              <div className="card-dreamy p-6 mt-8">
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
