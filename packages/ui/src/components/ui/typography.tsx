import React from "react";

type TypographyProps = {
  children: React.ReactNode;
  variant: string;
  color: string;
  className: string;
};
function Typography({ children, variant, color, className }: TypographyProps) {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={`text-[4vw] font-extrabold text-[${color}] ${className}`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`text-[3vw] font-bold text-[${color}] ${className}`}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={`text-[2vw] font-semibold text-[${color}] ${className}`}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={`text-[1rem] font-medium text-[${color}] ${className}`}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={`text-3xl font-medium text-[${color}] ${className}`}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={`text-2xl font-normal text-[${color}] ${className}`}>
          {children}
        </h6>
      );
    case "p":
      return (
        <p className={`text-lg font-normal text-[${color}] ${className}`}>
          {children}
        </p>
      );
    default:
      return (
        <span className={`text-md font-normal ${className}`}>{children}</span>
      );
  }
}

export { Typography };
