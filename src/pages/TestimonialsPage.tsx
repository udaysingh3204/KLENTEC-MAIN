import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsDisplay } from "@/components/ReviewsDisplay";
import { SEO } from "@/components/SEO";

const TestimonialsPage = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Testimonials"
        description="Real client reviews and feedback on working with KLENTEC."
        path="/testimonials"
      />
      {/* Hero Section */}
      <section className="gradient-bg-hero pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <span className="badge-dreamy mb-6 inline-block">Testimonials</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-foreground mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-muted-foreground">
            Real feedback from businesses we've worked with.
          </p>
        </div>
      </section>

      {/* Reviews Display */}
      <section className="section-padding gradient-bg-subtle">
        <div className="container mx-auto">
          <ReviewsDisplay />
        </div>
      </section>

      {/* Review Form Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground">
              Help other businesses discover our services. Your feedback matters!
            </p>
          </div>

          <ReviewForm />
        </div>
      </section>
    </main>
  );
};

export default TestimonialsPage;
