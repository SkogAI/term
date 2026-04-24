import type { PluginInstall } from '../../core/kernel.js';
import { aliasCat } from '../../core/shell.js';
import { asGuest, file } from '../../core/vfs.js';

const aboutText =
  'this is a placeholder bio. edit src/plugins/me/about.ts to make it yours.\n' +
  "a line or two about who you are, what you do, what you're into.";

const install: PluginInstall = kernel => {
  kernel.vfs.appendDir('/home/guest', {
    'about.txt': asGuest(file(aboutText)),
  });

  kernel.installExecutable('/bin/about', {
    describe: 'who is this',
    exec: aliasCat('~/about.txt'),
  });
};

export default install;
