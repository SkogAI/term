import type { PluginInstall } from '../core/kernel.js';
import { dir, file, treeMount } from '../core/vfs.js';

const buildUsr = () =>
  dir({
    share: dir({
      fortune: dir({
        cookies: file('chop wood, carry water.'),
      }),
    }),
  });

const install: PluginInstall = kernel => {
  kernel.registerMount(treeMount('/usr', buildUsr));
};

export default install;
