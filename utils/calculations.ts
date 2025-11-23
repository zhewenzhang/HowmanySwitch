import { NetworkConfig, NetworkStats } from '../types';

export const calculateStats = (config: NetworkConfig): NetworkStats => {
  const totalGpus = config.l1Units * config.gpusPerL1;
  const totalRtswChips = config.l1Units * config.rtswPerL1;
  const totalFtswChips = config.l1Units * config.ftswPerL1;
  
  // STSW calculation based on ratio, usually ceiling rounded as you can't have partial switches
  const totalStswChips = Math.ceil(config.l1Units * config.stswRatio);
  
  const grandTotalChips = totalRtswChips + totalFtswChips + totalStswChips;

  return {
    totalGpus,
    totalRtswChips,
    totalFtswChips,
    totalStswChips,
    grandTotalChips,
  };
};