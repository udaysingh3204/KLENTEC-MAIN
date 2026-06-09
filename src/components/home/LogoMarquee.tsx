import Marquee from "react-fast-marquee";

const logos = [
  "TechNova", "RetailMax", "ConsultPro", "FreshStart", "HealthPlus", "FinFlow", "EduSmart", "PropFlow",
];

const LogoMarquee = () => (
  <section className="py-16 border-y border-border/40 bg-card/30">
    <div className="text-center mb-8">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
        Trusted by ambitious brands across industries
      </p>
      <p className="text-[10px] text-muted-foreground/60 mt-2">Real clients. Real results. Real growth.</p>
    </div>
    <Marquee gradient gradientColor="hsl(var(--background))" gradientWidth={120} speed={40} pauseOnHover>
      {logos.map((l) => (
        <span
          key={l}
          className="mx-12 text-3xl md:text-4xl font-display font-bold text-embossed tracking-tight"
        >
          {l}
        </span>
      ))}
    </Marquee>
  </section>
);

export default LogoMarquee;
