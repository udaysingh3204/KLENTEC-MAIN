import { useEffect, useRef, useState } from "react";
import ShowcaseScene from "@/components/three/ShowcaseScene";
import SectionHeading from "@/components/SectionHeading";

const slides = [
  {
    shape: "torus" as const,
    color: "#7c4dff",
    title: "Performance Marketing",
    desc: "Data-driven ad systems engineered to compound returns — not just spend.",
    stat: "4.2× avg ROAS",
  },
  {
    shape: "icosahedron" as const,
    color: "#b794ff",
    title: "Conversion Design",
    desc: "Interfaces crafted around buyer psychology, tested against real revenue.",
    stat: "+68% conv. lift",
  },
  {
    shape: "knot" as const,
    color: "#9d6bff",
    title: "AI & Automation",
    desc: "Operational systems that remove human bottlenecks from your growth engine.",
    stat: "10× output",
  },
];

const ShowcaseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
      setActive(Math.min(slides.length - 1, Math.floor(p * slides.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = slides[active];

  return (
    <section ref={ref} className="relative" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden gradient-bg-soft">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
          <div className="order-2 lg:order-1">
            <SectionHeading badge="Capabilities" title="Built to scale, designed to convert" align="left" />
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`transition-all duration-500 ${
                  i === active ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2"
                }`}
              >
                {i === active && (
                  <>
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{s.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-md">{s.desc}</p>
                    <div className="badge-dreamy">{s.stat}</div>
                  </>
                )}
              </div>
            ))}

            {/* Progress dots */}
            <div className="flex gap-2 mt-10">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-12 bg-primary" : "w-6 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px]">
            <ShowcaseScene scrollProgress={progress} shape={slide.shape} color={slide.color} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
