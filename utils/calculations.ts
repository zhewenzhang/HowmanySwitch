
import { NetworkConfig, NetworkStats } from '../types';

export const calculateStats = (config: NetworkConfig): NetworkStats => {
  // Constants
  const GPU_PORTS_PER_RTSW = 24;
  
  // 1. Calculate RTSW (Bottom Layer) based on GPU density
  // Each RTSW connects to 24 GPUs.
  const rtswPerL1 = Math.ceil(config.gpusPerL1 / GPU_PORTS_PER_RTSW);

  // 2. Calculate FTSW (Middle Layer) based on RTSW count
  // Target ratio is roughly 8 FTSW for every 9 RTSW (0.88) to maintain bandwidth.
  const ftswPerL1 = Math.ceil(rtswPerL1 * (8 / 9));

  // 3. Calculate Totals
  const totalGpus = config.l1Units * config.gpusPerL1;
  const totalRtswChips = config.l1Units * rtswPerL1;
  const totalFtswChips = config.l1Units * ftswPerL1;
  
  // STSW calculation based on ratio
  const totalStswChips = Math.ceil(config.l1Units * config.stswRatio);
  
  const grandTotalChips = totalRtswChips + totalFtswChips + totalStswChips;

  return {
    rtswPerL1,
    ftswPerL1,
    totalGpus,
    totalRtswChips,
    totalFtswChips,
    totalStswChips,
    grandTotalChips,
  };
};
