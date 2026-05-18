import { motion } from 'framer-motion';
import { MapPin, Users, Home, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';
import { useSimulatorStore, areas } from '@/store/simulatorStore';

export default function AreaSelectPage() {
  const navigate = useNavigate();
  const { selectedArea, setSelectedArea, setStep, userRole } = useSimulatorStore();

  const handleContinue = () => {
    if (selectedArea) {
      setStep(3);
      if (userRole === 'resident') {
        navigate('/results');
      } else {
        navigate('/project-input');
      }
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="text-sm text-primary font-medium">Step 2 of 4</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Select <span className="text-gradient">Area</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a neighborhood in Gurugram to simulate the housing project impact.
          </p>
        </div>

        {/* Map placeholder with areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Map visualization */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 h-full min-h-[400px] relative overflow-hidden">
              {/* Simulated map grid */}
              <div className="absolute inset-6 grid grid-cols-4 grid-rows-4 gap-2 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-primary/30 rounded" />
                ))}
              </div>
              
              {/* Area markers */}
              <div className="relative h-full flex items-center justify-center">
                <svg className="w-full h-full max-w-md" viewBox="0 0 400 300">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Area markers */}
                  {areas.map((area, i) => {
                    const positions = [
                      { x: 100, y: 80 },
                      { x: 280, y: 100 },
                      { x: 150, y: 200 },
                      { x: 300, y: 220 },
                    ];
                    const pos = positions[i];
                    const isSelected = selectedArea?.id === area.id;
                    
                    return (
                      <g key={area.id} className="cursor-pointer" onClick={() => setSelectedArea(area)}>
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isSelected ? 24 : 18}
                          fill={isSelected ? 'hsl(186, 100%, 50%)' : 'hsl(215, 28%, 17%)'}
                          stroke="hsl(186, 100%, 50%)"
                          strokeWidth={isSelected ? 3 : 1}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          whileHover={{ scale: 1.2 }}
                        />
                        <motion.text
                          x={pos.x}
                          y={pos.y + 40}
                          textAnchor="middle"
                          fill="currentColor"
                          fontSize="11"
                          className="font-medium pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          {area.name}
                        </motion.text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Gurugram, Haryana</span>
              </div>
            </GlassCard>
          </div>

          {/* Area list */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold mb-4">Available Areas</h3>
            {areas.map((area, i) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <GlassCard
                  variant="hover"
                  className={`p-4 cursor-pointer transition-all ${
                    selectedArea?.id === area.id 
                      ? 'border-primary/50 shadow-[0_0_20px_hsl(186_100%_50%/0.15)]' 
                      : ''
                  }`}
                  onClick={() => setSelectedArea(area)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {area.name}
                        {selectedArea?.id === area.id && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </h4>
                      <span className="text-xs text-muted-foreground">Infrastructure Score: {area.infrastructureScore}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{(area.population / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Home className="w-3 h-3" />
                      <span>{(area.currentHousing / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      <span>{formatCurrency(area.avgPropertyValue)}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected area details */}
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {selectedArea.name} Overview
                  </h3>
                  <p className="text-muted-foreground">Selected area for housing impact simulation</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-primary">{selectedArea.population.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Population</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{selectedArea.currentHousing.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Housing Units</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{formatCurrency(selectedArea.avgPropertyValue)}</div>
                    <div className="text-xs text-muted-foreground">Avg. Property</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{selectedArea.infrastructureScore}%</div>
                    <div className="text-xs text-muted-foreground">Infrastructure</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GradientButton variant="ghost" onClick={() => navigate('/role-select')}>
            Back
          </GradientButton>
          <GradientButton 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedArea}
            className={!selectedArea ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {userRole === 'resident' ? 'View Results' : 'Propose Housing Plan'}
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
