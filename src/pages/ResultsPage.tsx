import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, Building2, Shield, 
  AlertTriangle, CheckCircle2, MapPin, DollarSign,
  ArrowRight, Download, Eye, FileText
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useNavigate } from 'react-router-dom';
import { useSimulatorStore } from '@/store/simulatorStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#00ffff', '#00b894', '#fdcb6e', '#e17055'];

export default function ResultsPage() {
  const navigate = useNavigate();
  const { selectedArea, projectInput, simulationResults, userRole, runSimulation } = useSimulatorStore();

  // Run simulation if not already done
  if (!simulationResults && selectedArea) {
    runSimulation();
  }

  if (!selectedArea || !simulationResults) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No simulation data available</p>
          <GradientButton onClick={() => navigate('/area-select')}>
            Select Area
          </GradientButton>
        </GlassCard>
      </div>
    );
  }

  const propertyValueData = [
    { year: '2024', withProject: 100, withoutProject: 100 },
    { year: '2025', withProject: 98, withoutProject: 103 },
    { year: '2026', withProject: 105, withoutProject: 106 },
    { year: '2027', withProject: 115, withoutProject: 109 },
    { year: '2028', withProject: 128, withoutProject: 112 },
    { year: '2029', withProject: 140, withoutProject: 115 },
  ];

  const communityBenefitsData = [
    { name: 'Roads', value: simulationResults.communityBenefits.roads, color: COLORS[0] },
    { name: 'Parks', value: simulationResults.communityBenefits.parks, color: COLORS[1] },
    { name: 'Drainage', value: simulationResults.communityBenefits.drainage, color: COLORS[2] },
    { name: 'Schools', value: simulationResults.communityBenefits.schools, color: COLORS[3] },
  ];

  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success/20 border-success/50';
      case 'medium': return 'bg-warning/20 border-warning/50';
      case 'high': return 'bg-destructive/20 border-destructive/50';
      default: return 'bg-muted/20';
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{selectedArea.name}</span>
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Impact <span className="text-gradient">Analysis Results</span>
            </h1>
          </div>
          <div className="flex gap-3">
            {userRole === 'authority' && (
              <>
                <GradientButton variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                  Resident View
                </GradientButton>
                <GradientButton variant="outline" size="sm">
                  <FileText className="w-4 h-4" />
                  Public Meeting
                </GradientButton>
              </>
            )}
            <GradientButton size="sm">
              <Download className="w-4 h-4" />
              Export Report
            </GradientButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Population Increase', 
              value: `+${Math.round(simulationResults.populationIncrease).toLocaleString()}`,
              icon: Users,
              trend: 'up'
            },
            { 
              label: 'Density Change', 
              value: `+${simulationResults.densityChange.toFixed(1)}%`,
              icon: Building2,
              trend: simulationResults.densityChange > 10 ? 'warning' : 'up'
            },
            { 
              label: 'Annual Tax Revenue', 
              value: formatCurrency(simulationResults.taxRevenue),
              icon: DollarSign,
              trend: 'success'
            },
            { 
              label: 'Resistance Risk', 
              value: simulationResults.resistanceRisk.toUpperCase(),
              icon: AlertTriangle,
              trend: simulationResults.resistanceRisk
            },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <metric.icon className={`w-5 h-5 ${
                    metric.trend === 'success' ? 'text-success' :
                    metric.trend === 'warning' ? 'text-warning' :
                    metric.trend === 'low' ? 'text-success' :
                    metric.trend === 'medium' ? 'text-warning' :
                    metric.trend === 'high' ? 'text-destructive' :
                    'text-primary'
                  }`} />
                </div>
                <div className={`text-2xl font-bold ${
                  metric.trend === 'low' ? 'text-success' :
                  metric.trend === 'medium' ? 'text-warning' :
                  metric.trend === 'high' ? 'text-destructive' :
                  ''
                }`}>
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Property Value Protection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Property Value Protection</h3>
                  <p className="text-xs text-muted-foreground">Projected 5-year trend comparison</p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={propertyValueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 20%)" />
                    <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(222, 47%, 10%)',
                        border: '1px solid hsl(215, 28%, 20%)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="withProject" 
                      stroke="hsl(186, 100%, 50%)" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(186, 100%, 50%)' }}
                      name="With Project"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="withoutProject" 
                      stroke="hsl(215, 20%, 55%)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(215, 20%, 55%)' }}
                      name="Without Project"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm text-success">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Short-term stabilization, long-term protection through reinvestment.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Community Benefits (TIF) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Community Investment (TIF)</h3>
                  <p className="text-xs text-muted-foreground">Tax revenue reinvestment allocation</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={communityBenefitsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {communityBenefitsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex-1 space-y-3">
                  {communityBenefitsData.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-primary">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  {formatCurrency(simulationResults.taxRevenue)} annual investment into YOUR neighborhood.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Mitigation Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">Community Protection Measures</h3>
                <p className="text-xs text-muted-foreground">Recommended safeguards and mitigation strategies</p>
              </div>
              <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${getRiskBg(simulationResults.resistanceRisk)}`}>
                {simulationResults.resistanceRisk.toUpperCase()} RISK
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simulationResults.mitigationStrategies.map((strategy, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{strategy}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <h3 className="font-display text-lg font-bold mb-6">Before vs After Comparison</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                <h4 className="font-semibold mb-4 text-muted-foreground">Today</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    Limited facility upgrades
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    No dedicated funding source
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    Aging infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    Housing shortage pressure
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h4 className="font-semibold mb-4 text-primary">After Project</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Upgraded roads & parks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    {formatCurrency(simulationResults.taxRevenue)} annual local funding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Modern drainage & utilities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    {projectInput.newUnits} new housing units
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GradientButton variant="ghost" onClick={() => navigate('/project-input')}>
            Modify Parameters
          </GradientButton>
          <GradientButton size="lg" onClick={() => navigate('/')}>
            Start New Simulation
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
