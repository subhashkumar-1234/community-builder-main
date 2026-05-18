import { motion } from "framer-motion";
import { Building2, ArrowLeft, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <GlassCard className="p-12 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="font-display text-6xl font-bold text-gradient mb-4">404</h1>
          <h2 className="font-display text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The area you're looking for doesn't exist in our simulation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GradientButton variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </GradientButton>
            <GradientButton onClick={() => navigate("/")}>
              <Home className="w-4 h-4" />
              Return Home
            </GradientButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NotFound;
