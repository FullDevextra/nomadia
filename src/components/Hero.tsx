import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  height?: "small" | "medium" | "large";
}

const Hero = ({ title, subtitle, children, backgroundImage, height = "large" }: HeroProps) => {
  const heightClasses = {
    small: "h-[40vh] min-h-[300px]",
    medium: "h-[60vh] min-h-[400px]",
    large: "h-[80vh] min-h-[600px]",
  };

  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 overlay-dark" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            {subtitle}
          </p>
        )}
        {children && <div className="animate-slide-up">{children}</div>}
      </div>
    </section>
  );
};

export default Hero;
