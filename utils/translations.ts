
export type Language = 'en' | 'zh';

export const TRANSLATIONS = {
  en: {
    appTitle: 'HPC.NetArchitect',
    appSubtitle: 'AI CLUSTER TOPOLOGY SIMULATOR',
    status: 'ONLINE',
    configPanel: 'Config Panel',
    export: 'Export',
    reset: 'Reset',
    copied: 'Configuration and Stats copied to clipboard!',
    
    // Inputs
    l1Units: 'L1 Units (Racks)',
    l1UnitsDesc: 'Number of compute racks/pods in the cluster.',
    gpusPerL1: 'GPUs per L1 Unit',
    gpusPerL1Desc: 'Compute density per L1 unit.',
    rtswPerL1: 'RTSW per L1',
    rtswPerL1Desc: 'Leaf switches within the rack.',
    ftswPerL1: 'FTSW per L1',
    ftswPerL1Desc: 'Fabric tier switches aggregating RTSWs.',
    stswRatio: 'STSW Ratio',
    stswRatioDesc: 'Ratio of spine switches to L1 units.',

    // Stats
    totalGpus: 'Total GPUs',
    totalRtsw: 'RTSW Chips (L1)',
    totalFtsw: 'FTSW Chips (L2)',
    totalStsw: 'STSW Chips (Spine)',
    totalChips: 'Total Network Chips',

    // Visualizer
    repView: 'Representative Logical View',
    spineLayer: 'STSW Group', // Changed to Group
    l1Unit: 'L1 Unit',
    ftswLayer: 'FTSW Layer',
    rtswLayer: 'RTSW Layer',
    compute: 'Compute',
    gpus: 'GPUs',
    spineSwitchSubtitle: 'Switch Aggregate', // Changed subtitle
    contains: 'Contains',
    chips: 'Chips',
    approx: '~'
  },
  zh: {
    appTitle: 'HPC.网络架构师',
    appSubtitle: 'AI 集群拓扑模拟器',
    status: '在线',
    configPanel: '配置面板',
    export: '导出配置',
    reset: '重置',
    copied: '配置和统计数据已复制到剪贴板！',

    // Inputs
    l1Units: 'L1 单元 (机柜)',
    l1UnitsDesc: '集群中的计算机柜/Pod数量。',
    gpusPerL1: '单单元 GPU 数',
    gpusPerL1Desc: '每个 L1 单元的计算密度。',
    rtswPerL1: 'L1 交换机 (RTSW)',
    rtswPerL1Desc: '机柜内的叶交换机数量。',
    ftswPerL1: 'L2 交换机 (FTSW)',
    ftswPerL1Desc: '聚合 RTSW 的 Fabric 层交换机。',
    stswRatio: '脊交换机比率 (STSW)',
    stswRatioDesc: '脊交换机与 L1 单元的比率。',

    // Stats
    totalGpus: 'GPU 总数',
    totalRtsw: 'RTSW 芯片 (L1)',
    totalFtsw: 'FTSW 芯片 (L2)',
    totalStsw: 'STSW 芯片 (脊层)',
    totalChips: '网络芯片总数',

    // Visualizer
    repView: '逻辑拓扑概览',
    spineLayer: 'STSW 交换平面',
    l1Unit: 'L1 单元',
    ftswLayer: 'FTSW 层',
    rtswLayer: 'RTSW 层',
    compute: '计算节点',
    gpus: 'GPU',
    spineSwitchSubtitle: '交换机聚合组',
    contains: '包含',
    chips: '芯片',
    approx: '约'
  }
};
