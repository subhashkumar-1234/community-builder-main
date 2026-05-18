import { motion } from 'framer-motion';
import { Building2, Users, Shield, TrendingUp, ArrowRight, ChevronDown, MapPin, BarChart3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: BarChart3,
    title: 'Impact Simulation',
    description: 'Calculate population increase, density, infrastructure load, and property value trends in real-time.',
  },
  {
    icon: Shield,
    title: 'Community Protection',
    description: 'Automatic safeguards like tax rebates, height limits, green buffers, and traffic improvements.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Reassurance',
    description: 'Show how new housing generates tax revenue reinvested into roads, parks, and schools.',
  },
  {
    icon: Users,
    title: 'Stakeholder Views',
    description: 'Tailored dashboards for planners, authorities, and residents with role-specific insights.',
  },
];

const stats = [
  { value: '85%', label: 'Resistance Reduction' },
  { value: '₹2.4Cr', label: 'Avg. Community Investment' },
  { value: '12', label: 'Successful Projects' },
  { value: '3.2M', label: 'Residents Protected' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">AI-Powered Urban Planning</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Planning Housing Growth</span>
            <br />
            <span className="text-foreground">Without Community Conflict</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Cities need more homes, but residents fear property loss and overcrowding. 
            Our platform helps governments design housing projects that{' '}
            <span className="text-primary">protect existing communities</span> while enabling growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton 
              size="lg" 
              onClick={() => navigate('/role-select')}
            >
              Start Simulation
              <ArrowRight className="w-5 h-5" />
            </GradientButton>
            <GradientButton variant="outline" size="lg">
              Watch Demo
            </GradientButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary/50 animate-bounce" />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-gradient-accent">NIMBY Problem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Urban housing projects fail not because of engineering problems, but because of social resistance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard variant="hover" className="p-8">
              <h3 className="text-2xl font-display font-bold text-destructive mb-4">
                What Residents Fear
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                {['Property value loss', 'Traffic congestion', 'Overcrowding', 'Infrastructure strain', 'Decline in neighborhood quality'].map((fear, i) => (
                  <motion.li 
                    key={fear}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    {fear}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard variant="hover" className="p-8">
              <h3 className="text-2xl font-display font-bold text-warning mb-4">
                Current Authority Challenges
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                {[
                  'Cannot prove property values will be safe',
                  'Cannot show infrastructure improvements',
                  'React only after protests begin',
                  'Delayed projects and court cases',
                  'Political pressure and public backlash'
                ].map((challenge, i) => (
                  <motion.li 
                    key={challenge}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Solution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Shift planning from reactive to predictive and persuasive with our AI-powered platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard variant="hover" className="p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <GlassCard className="max-w-5xl mx-auto p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Stakeholders Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Built for <span className="text-gradient">Every Stakeholder</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, role: 'Urban Planners', focus: 'Technical feasibility: density, infrastructure capacity, zoning compliance.' },
              { icon: Shield, role: 'Authorities', focus: 'Social acceptance: resistance risk, mitigation strategies, community benefits.' },
              { icon: Users, role: 'Residents', focus: 'Reassurance: property value outlook, neighborhood improvements, protections offered.' },
            ].map((stakeholder, i) => (
              <motion.div
                key={stakeholder.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard variant="hover" className="p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                    <stakeholder.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{stakeholder.role}</h3>
                  <p className="text-muted-foreground">{stakeholder.focus}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <GlassCard variant="gradient" glow className="p-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Urban Planning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join cities that are moving from conflict-driven to evidence-driven housing development.
            </p>
            <GradientButton size="lg" onClick={() => navigate('/role-select')}>
              <MapPin className="w-5 h-5" />
              Start Your Simulation
            </GradientButton>
          </GlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="font-display font-bold">Urban Stability Simulator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Community Stability & Zoning Impact Simulator
          </p>
        </div>
      </footer>
    </div>
  );
}
