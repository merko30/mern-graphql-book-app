interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
  <h1
    className={`text-foreground leading-6 ${className}`}
    style={{ fontFamily: "Calistoga, sans-serif" }}
  >
    Booker
  </h1>
);

export default Logo;
