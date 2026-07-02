import { motion } from "framer-motion";

const TermsPage = () => {
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
            Terms & Conditions
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by and comply with the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on klentec.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• Modifying or copying the materials</li>
                  <li>• Using the materials for any commercial purpose or for any public display</li>
                  <li>• Attempting to reverse engineer any software contained on the website</li>
                  <li>• Removing any copyright or other proprietary notations</li>
                  <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                <p>
                  The materials on klentec.com are provided on an 'as is' basis. KLENTEC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                <p>
                  In no event shall KLENTEC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on klentec.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on klentec.com could include technical, typographical, or photographic errors. KLENTEC does not warrant that any of the materials on the website are accurate, complete, or current. KLENTEC may make changes to the materials contained on the website at any time without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
                <p>
                  KLENTEC has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by KLENTEC of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">7. Modifications</h2>
                <p>
                  KLENTEC may revise these Terms & Conditions for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms & Conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                <p>
                  These Terms & Conditions and any separate agreements we may enter into to provide you with Services are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">9. User Obligations</h2>
                <p>When using our website, you agree to:</p>
                <ul className="mt-4 space-y-2 ml-4">
                  <li>• Provide accurate and truthful information in all forms</li>
                  <li>• Not engage in any form of harassment or abuse</li>
                  <li>• Not attempt to gain unauthorized access to our systems</li>
                  <li>• Not violate any applicable laws or regulations</li>
                  <li>• Respect the intellectual property rights of others</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                <p>
                  Except as prohibited by law, KLENTEC will not be liable to you in relation to the contents of or use of, or otherwise in connection with, this website for any indirect, special, or consequential loss, or for any business losses, loss of revenue, income, profits, or anticipated savings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
                <div className="mt-4 text-slate-300">
                  <p><strong>Email:</strong> legal@klentec.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> KLENTEC, India</p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mt-8">
                <p className="text-sm">
                  These Terms & Conditions constitute the entire agreement between you and KLENTEC regarding the use of this website, and supersede and replace any prior negotiations, representations or agreements, whether written or oral.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
