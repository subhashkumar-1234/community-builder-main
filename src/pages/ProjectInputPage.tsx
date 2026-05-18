import { motion } from 'framer-motion';
import { Building2, ArrowRight, TrendingUp, Users, DollarSign, Layers } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';
import { useSimulatorStore } from '@/store/simulatorStore';
import { Slider } from '@/components/ui/slider';

export default function ProjectInputPage() {
  const navigate = useNavigate();
  const { selectedArea, projectInput, setProjectInput, runSimulation, setStep } = useSimulatorStore();

  const handleRunSimulation = () => {
    runSimulation();
    setStep(4);
    navigate('/results');
  };

  if (!selectedArea) {
    navigate('/area-select');
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="text-sm text-primary font-medium">Step 3 of 4</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Define <span className="text-gradient">Housing Project</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Configure the proposed housing development for {selectedArea.name}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Input Controls */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">New Housing Units</h3>
                  <p className="text-sm text-muted-foreground">Number of new units to add</p>
                </div>
              </div>
              <Slider
                value={[projectInput.newUnits]}
                onValueChange={([value]) => setProjectInput({ newUnits: value })}
                min={100}
                max={1000}
                step={50}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">100</span>
                <span className="text-primary font-bold">{projectInput.newUnits} units</span>
                <span className="text-muted-foreground">1000</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Height Increase</h3>
                  <p className="text-sm text-muted-foreground">Additional floors allowed</p>
                </div>
              </div>
              <Slider
                value={[projectInput.heightIncrease]}
                onValueChange={([value]) => setProjectInput({ heightIncrease: value })}
                min={0}
                max={10}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">0</span>
                <span className="text-primary font-bold">+{projectInput.heightIncrease} floors</span>
                <span className="text-muted-foreground">10</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Affordable Housing</h3>
                  <p className="text-sm text-muted-foreground">Percentage of affordable units</p>
                </div>
              </div>
              <Slider
                value={[projectInput.affordablePercentage]}
                onValueChange={([value]) => setProjectInput({ affordablePercentage: value })}
                min={10}
                max={70}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">10%</span>
                <span className="text-primary font-bold">{projectInput.affordablePercentage}%</span>
                <span className="text-muted-foreground">70%</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Infrastructure Investment</h3>
                  <p className="text-sm text-muted-foreground">% of revenue for local upgrades</p>
                </div>
              </div>
              <Slider
                value={[projectInput.infrastructureInvestment]}
                onValueChange={([value]) => setProjectInput({ infrastructureInvestment: value })}
                min={20}
                max={80}
                step={5}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">20%</span>
                <span className="text-primary font-bold">{projectInput.infrastructureInvestment}%</span>
                <span className="text-muted-foreground">80%</span>
              </div>
            </GlassCard>
          </div>

          {/* Live Preview */}
          <div>
            <GlassCard className="p-6 h-full">
              <h3 className="font-display text-xl font-bold mb-6">Live Preview</h3>
              
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Estimated Population Increase</span>
                    <span className="font-bold text-primary">+{Math.round(projectInput.newUnits * 3.2).toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (projectInput.newUnits / 1000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Density Change</span>
                    <span className="font-bold text-warning">
                      +{((projectInput.newUnits * 3.2 / selectedArea.population) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-warning to-destructive"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (projectInput.newUnits * 3.2 / selectedArea.population) * 100 * 5)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Est. Annual Tax Revenue</span>
                    <span className="font-bold text-success">
                      ₹{((projectInput.newUnits * 25000) / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <h4 className="text-sm font-semibold mb-3">Resistance Risk Indicator</h4>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map((level, i) => {
                      const densityChange = (projectInput.newUnits * 3.2 / selectedArea.population) * 100;
                      const isActive = 
                        (level === 'Low' && densityChange < 8) ||
                        (level === 'Medium' && densityChange >= 8 && densityChange < 15) ||
                        (level === 'High' && densityChange >= 15);
                      
                      return (
                        <div
                          key={level}
                          className={`flex-1 p-2 rounded text-center text-xs font-medium transition-all ${
                            isActive
                              ? level === 'Low'
                                ? 'bg-success/20 text-success border border-success/50'
                                : level === 'Medium'
                                  ? 'bg-warning/20 text-warning border border-warning/50'
                                  : 'bg-destructive/20 text-destructive border border-destructive/50'
                              : 'bg-muted/20 text-muted-foreground'
                          }`}
                        >
                          {level}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Community Investment Allocation</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Roads</span>
                      <span className="text-primary">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parks</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Drainage</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schools</span>
                      <span className="text-primary">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GradientButton variant="ghost" onClick={() => navigate('/area-select')}>
            Back
          </GradientButton>
          <GradientButton size="lg" onClick={handleRunSimulation}>
            Run Impact Simulation
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
