import Marquee from "react-fast-marquee";

const logos = [
  "ACME", "NORDIC", "VERTEX", "LUMEN", "ORBITA", "PRISMA", "FLUX", "AURORA", "QUANTA", "STRATA",
];

const LogoMarquee = () => (
  <section className="py-16 border-y border-border/40 bg-card/30">
    <p className="text-center text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
      Trusted by ambitious teams worldwide
    </p>
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
