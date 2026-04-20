import type { PluginInstall } from '../core/kernel.js';
import { asGuest, dir, file, treeMount } from '../core/vfs.js';

const buildHome = () =>
  dir({
    guest: asGuest(
      dir({
        '.bashrc': file(
          "# this shell doesn't read me yet. but nice of you to check.\n"
        ),
        '.bash_history': file(
          'ls -la\ncat /etc/passwd\ncd /tmp\nls -a\n/tmp/.pwn\nwhoami\nclear\nsudo su\nrm -rf /\ntheme crt\nexit'
        ),
      })
    ),
  });

const install: PluginInstall = kernel => {
  kernel.registerMount(treeMount('/home', buildHome));
};

export default install;
