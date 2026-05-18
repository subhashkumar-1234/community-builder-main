import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function GradientButton({ 
  className, 
  variant = "primary", 
  size = "md",
  children,
  disabled,
  onClick,
}: GradientButtonProps) {
  const baseStyles = "relative font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_30px_hsl(186_100%_50%/0.4)] hover:scale-105",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={!disabled ? { scale: variant === "primary" ? 1.05 : 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      )}
      {children}
    </motion.button>
  );
}
