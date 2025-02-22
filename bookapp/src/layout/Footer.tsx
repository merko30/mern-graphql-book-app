const Footer = () => {
  return (
    <div className="bg-background text-center pb-4">
      <h3
        className="text-md ml-1 text-foreground"
        style={{ fontFamily: "Calistoga, sans-serif" }}
      >
        Merim @ {new Date().getFullYear()}
      </h3>
    </div>
  );
};

export default Footer;
