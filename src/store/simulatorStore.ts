import { create } from 'zustand';

export type UserRole = 'planner' | 'authority' | 'resident' | null;

export interface AreaData {
  id: string;
  name: string;
  population: number;
  currentHousing: number;
  avgPropertyValue: number;
  infrastructureScore: number;
}

export interface ProjectInput {
  newUnits: number;
  heightIncrease: number;
  affordablePercentage: number;
  infrastructureInvestment: number;
}

export interface SimulationResults {
  populationIncrease: number;
  densityChange: number;
  infrastructureLoad: number;
  propertyValueTrend: number;
  taxRevenue: number;
  communityBenefits: {
    roads: number;
    parks: number;
    drainage: number;
    schools: number;
  };
  resistanceRisk: 'low' | 'medium' | 'high';
  mitigationStrategies: string[];
}

interface SimulatorState {
  currentStep: number;
  userRole: UserRole;
  selectedArea: AreaData | null;
  projectInput: ProjectInput;
  simulationResults: SimulationResults | null;
  setStep: (step: number) => void;
  setUserRole: (role: UserRole) => void;
  setSelectedArea: (area: AreaData) => void;
  setProjectInput: (input: Partial<ProjectInput>) => void;
  runSimulation: () => void;
  reset: () => void;
}

const defaultProjectInput: ProjectInput = {
  newUnits: 300,
  heightIncrease: 2,
  affordablePercentage: 30,
  infrastructureInvestment: 50,
};

const areas: AreaData[] = [
  { id: 'sector-37d', name: 'Sector 37D', population: 45000, currentHousing: 12000, avgPropertyValue: 8500000, infrastructureScore: 65 },
  { id: 'sector-56', name: 'Sector 56', population: 62000, currentHousing: 18000, avgPropertyValue: 12000000, infrastructureScore: 78 },
  { id: 'sector-82', name: 'Sector 82', population: 28000, currentHousing: 7500, avgPropertyValue: 6500000, infrastructureScore: 55 },
  { id: 'dlf-phase-4', name: 'DLF Phase 4', population: 38000, currentHousing: 10500, avgPropertyValue: 15000000, infrastructureScore: 82 },
];

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  currentStep: 0,
  userRole: null,
  selectedArea: null,
  projectInput: defaultProjectInput,
  simulationResults: null,
  
  setStep: (step) => set({ currentStep: step }),
  setUserRole: (role) => set({ userRole: role }),
  setSelectedArea: (area) => set({ selectedArea: area }),
  setProjectInput: (input) => set((state) => ({ 
    projectInput: { ...state.projectInput, ...input } 
  })),
  
  runSimulation: () => {
    const { selectedArea, projectInput } = get();
    if (!selectedArea) return;

    const populationIncrease = projectInput.newUnits * 3.2;
    const densityChange = (populationIncrease / selectedArea.population) * 100;
    const infrastructureLoad = Math.min(100, selectedArea.infrastructureScore + (densityChange * 0.5) - (projectInput.infrastructureInvestment * 0.3));
    
    const baseValueGrowth = 5;
    const affordableImpact = projectInput.affordablePercentage > 40 ? -2 : 1;
    const infrastructureBonus = projectInput.infrastructureInvestment > 60 ? 3 : 1;
    const propertyValueTrend = baseValueGrowth + affordableImpact + infrastructureBonus;
    
    const taxRevenue = projectInput.newUnits * 25000;
    
    const resistanceRisk = 
      densityChange > 15 || projectInput.affordablePercentage > 50 
        ? 'high' 
        : densityChange > 8 || projectInput.affordablePercentage > 35 
          ? 'medium' 
          : 'low';

    const mitigationStrategies = [
      'Property tax rebate for existing residents (first 3 years)',
      'Green buffer zones around new construction',
      'Traffic management improvements',
      'Community facility upgrades',
    ];

    if (resistanceRisk === 'high') {
      mitigationStrategies.push('Height restrictions on boundary plots');
      mitigationStrategies.push('Enhanced parking provisions');
    }

    set({
      simulationResults: {
        populationIncrease,
        densityChange,
        infrastructureLoad,
        propertyValueTrend,
        taxRevenue,
        communityBenefits: {
          roads: taxRevenue * 0.35,
          parks: taxRevenue * 0.25,
          drainage: taxRevenue * 0.25,
          schools: taxRevenue * 0.15,
        },
        resistanceRisk,
        mitigationStrategies,
      },
    });
  },
  
  reset: () => set({
    currentStep: 0,
    userRole: null,
    selectedArea: null,
    projectInput: defaultProjectInput,
    simulationResults: null,
  }),
}));

export { areas };
