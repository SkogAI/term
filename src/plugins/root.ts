import type { PluginInstall } from '../core/kernel.js';
import { dir, file, treeMount } from '../core/vfs.js';

const buildRoot = () =>
  dir(
    {
      '.journal': file(
        '--- root journal ---\n' +
          "day 1: deployed the site. it's just a terminal. they'll either love it or bounce.\n" +
          "day 42: someone actually typed 'hack'. respect.\n" +
          'day 99: the flag hunters found /tmp/.secret. note to self: hide things better.'
      ),
    },
    { mode: 0o700 }
  );

const install: PluginInstall = kernel => {
  kernel.registerMount(treeMount('/root', buildRoot));
};

export default install;
