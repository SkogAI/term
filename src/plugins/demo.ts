import type { PluginInstall } from '../core/kernel.js';

type Step = { cmd: string; after: number };

const STEPS: Step[] = [
  { cmd: 'clear', after: 1000 },
  { cmd: 'welcome', after: 6000 },
  { cmd: 'about', after: 2200 },
  { cmd: 'projects', after: 3500 },
  { cmd: 'ls -l ~', after: 2000 },
  { cmd: 'cat ~/contact.txt', after: 2200 },
  { cmd: 'theme crt', after: 1200 },
  { cmd: 'theme tokyo-night', after: 1200 },
  { cmd: 'restart', after: 1500 },
];

const TYPE_DELAY = 100;

const install: PluginInstall = kernel => {
  kernel.installExecutable('/bin/demo', {
    describe: 'run a scripted walkthrough',
    async exec(ctx) {
      for (const step of STEPS) {
        await kernel.term.fakeType(step.cmd, TYPE_DELAY);
        await ctx.sleep(step.after);
      }
      return 0;
    },
  });
};

export default install;
