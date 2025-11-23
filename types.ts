export interface NetworkConfig {
  l1Units: number;
  gpusPerL1: number;
  rtswPerL1: number;
  ftswPerL1: number;
  stswRatio: number;
}

export interface NetworkStats {
  totalGpus: number;
  totalRtswChips: number;
  totalFtswChips: number;
  totalStswChips: number;
  grandTotalChips: number;
}

export const DEFAULT_CONFIG: NetworkConfig = {
  l1Units: 96,
  gpusPerL1: 216,
  rtswPerL1: 9,
  ftswPerL1: 8,
  stswRatio: 4.5,
};