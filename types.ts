
export interface NetworkConfig {
  l1Units: number;
  gpusPerL1: number;
  stswRatio: number;
}

export interface NetworkStats {
  // Derived Topology (Per Unit)
  rtswPerL1: number;
  ftswPerL1: number;

  // Totals
  totalGpus: number;
  totalRtswChips: number;
  totalFtswChips: number;
  totalStswChips: number;
  grandTotalChips: number;
}

export const DEFAULT_CONFIG: NetworkConfig = {
  l1Units: 96,
  gpusPerL1: 216,
  stswRatio: 4.5,
};
