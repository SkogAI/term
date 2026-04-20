import type { PluginInstall } from '../core/kernel.js';
import { dir, file, treeMount } from '../core/vfs.js';
import { system } from '../system.js';

const install: PluginInstall = kernel => {
  const buildProc = () =>
    dir({
      version: file(
        `Linux version ${system.kernel.version} (${system.kernel.buildHost}) (${system.kernel.compiler}) ${system.kernel.build}`
      ),
      cpuinfo: file(
        'processor\t: 0\n' +
          `vendor_id\t: ${system.hardware.cpu.vendor}\n` +
          `cpu family\t: ${system.hardware.cpu.family}\n` +
          `model\t\t: ${system.hardware.cpu.modelId}\n` +
          `model name\t: ${system.hardware.cpu.model}\n` +
          `cpu MHz\t\t: ${system.hardware.cpu.mhz.toFixed(3)}\n` +
          `cache size\t: ${system.hardware.cpu.cacheKB} KB\n` +
          `cpu cores\t: ${system.hardware.cpu.cores}\n` +
          `siblings\t: ${system.hardware.cpu.threads}`
      ),
      uptime: file(() => {
        const seconds = Math.floor((Date.now() - kernel.getBootTime()) / 1000);
        return seconds + ' seconds';
      }),
    });

  kernel.registerMount(treeMount('/proc', buildProc));
};

export default install;
