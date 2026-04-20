export const system = {
  os: {
    name: 'Arch Linux',
    prettyName: 'Arch Linux',
    id: 'arch',
    homeUrl: 'https://archlinux.org/',
  },
  kernel: {
    version: '6.11.5-arch1-1',
    build: '#1 SMP PREEMPT_DYNAMIC',
    arch: 'x86_64',
    buildHost: 'linux@archlinux',
    compiler: 'gcc (GCC) 14.2.1',
  },
  hardware: {
    name: 'Framework Laptop 13 (AMD Ryzen AI 300 Series)',
    boardTag: 'FRANMDCP09',
    cpu: {
      vendor: 'AuthenticAMD',
      family: 26,
      modelId: 36,
      model: 'AMD Ryzen AI 9 HX 370 w/ Radeon 890M',
      mhz: 5100,
      cores: 12,
      threads: 24,
      cache: 'L1 768K, L2 12M, L3 24M',
      cacheKB: 1024,
    },
    memoryMB: 32768,
    storage: 'WD_BLACK SN770 1TB',
  },
  firmware: {
    vendor: 'InsydeH2O',
    version: '03.03',
    year: 2024,
    copyright: 'Insyde Software Corp.',
  },
} as const;
