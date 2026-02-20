import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
  className = "" 
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
  className?: string; // <--- This line fixes the red squiggly in Hero.tsx
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${size === "small" ? "px-8 py-2" : "px-6 py-3"} 
        cursor-pointer 
        bg-orange-500 
        text-white 
        font-bold
        transition-all 
        flex items-center justify-center
        ${className} 
      `}
    >
      {children}
    </button>
  );
};