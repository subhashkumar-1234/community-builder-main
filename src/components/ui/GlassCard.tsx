import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  variant?: "default" | "hover" | "active" | "gradient";
  glow?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function GlassCard({ 
  className, 
  variant = "default", 
  glow = false,
  children,
  onClick,
}: GlassCardProps) {
  const variants = {
    default: "glass-card",
    hover: "glass-card-hover",
    active: "glass-card border-primary/50",
    gradient: "glass-card animated-border",
  };

  return (
    <motion.div
      className={cn(
        variants[variant],
        glow && "glow-primary",
        onClick && "cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
