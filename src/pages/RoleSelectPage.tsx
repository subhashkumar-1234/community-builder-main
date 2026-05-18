import { motion } from 'framer-motion';
import { Building2, Shield, Users, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';
import { useSimulatorStore, UserRole } from '@/store/simulatorStore';

const roles = [
  {
    id: 'planner' as UserRole,
    icon: Building2,
    title: 'Urban Planner',
    emoji: '👨‍💼',
    description: 'Focus on technical feasibility: density, infrastructure capacity, zoning compliance.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    id: 'authority' as UserRole,
    icon: Shield,
    title: 'Authority / Policymaker',
    emoji: '👩‍💼',
    description: 'Focus on social acceptance: resistance risk, mitigation strategies, community benefits.',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'hover:border-amber-500/50',
  },
  {
    id: 'resident' as UserRole,
    icon: Users,
    title: 'Resident / Public',
    emoji: '👨',
    description: 'Focus on reassurance: property value outlook, neighborhood improvements, protections offered.',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/50',
  },
];

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { userRole, setUserRole, setStep } = useSimulatorStore();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const handleContinue = () => {
    if (userRole) {
      setStep(2);
      navigate('/area-select');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="text-sm text-primary font-medium">Step 1 of 4</span>
        </motion.div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Select Your <span className="text-gradient">Role</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose your perspective to see the simulation tailored to your needs and concerns.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <GlassCard
                variant="hover"
                className={`p-8 cursor-pointer transition-all duration-300 ${
                  userRole === role.id 
                    ? 'border-primary/50 shadow-[0_0_30px_hsl(186_100%_50%/0.2)]' 
                    : role.borderColor
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-4xl">{role.emoji}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
                
                {userRole === role.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Selected
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GradientButton variant="ghost" onClick={() => navigate('/')}>
            Back
          </GradientButton>
          <GradientButton 
            size="lg" 
            onClick={handleContinue}
            disabled={!userRole}
            className={!userRole ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
