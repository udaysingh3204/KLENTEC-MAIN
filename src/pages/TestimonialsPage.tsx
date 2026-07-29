import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsDisplay } from "@/components/ReviewsDisplay";

const TestimonialsPage = () => {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            Join 150+ brands that trust us with their digital transformation
          </p>
        </div>
      </section>

      {/* Reviews Display */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <ReviewsDisplay />
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Share Your Experience
            </h2>
            <p className="text-slate-400">
              Help other businesses discover our services. Your feedback matters!
            </p>
          </div>

          <ReviewForm onSuccess={() => {
            // Could show a toast here
            console.log("Review submitted!");
          }} />
        </div>
      </section>
    </main>
  );
};

export default TestimonialsPage;
