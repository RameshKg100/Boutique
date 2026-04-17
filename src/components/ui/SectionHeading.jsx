export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2 ${
          light ? "text-white" : "text-dark"
        }`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-text-light"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-[2px] w-16 ${centered ? "mx-auto" : ""}`}
        style={{
          background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
        }}
      />
    </div>
  );
}
