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

const buildUsr = () =>
  dir({
    share: dir({
      fortune: dir({
        cookies: file('chop wood, carry water.'),
      }),
    }),
  });

const buildVar = () =>
  dir({
    log: dir({
      syslog: file(
        '[  0.000000] Linux version 6.11.5-arch1-1\n' +
          '[  0.123456] Booting jpinillos.dev ...\n' +
          '[  1.234567] nvme0n1p2: mounted successfully\n' +
          '[  1.345678] nvme0n1p3: mounted successfully\n' +
          '[  2.456789] All systems nominal'
      ),
      'auth.log': file(
        'Apr 16 03:14:07 jpinillos sshd[1337]: Failed password for root from 192.168.1.42 port 22 ssh2\n' +
          'Apr 16 03:14:12 jpinillos sshd[1337]: Failed password for root from 192.168.1.42 port 22 ssh2\n' +
          'Apr 16 03:14:15 jpinillos sudo: guest : user NOT in sudoers ; TTY=pts/0 ; PWD=/home/guest ; COMMAND=/bin/bash\n' +
          'Apr 16 03:14:20 jpinillos sshd[1337]: Accepted publickey for guest from 10.0.0.1 port 22 ssh2'
      ),
    }),
  });

const install: PluginInstall = kernel => {
  kernel.registerMount(treeMount('/home', buildHome));
  kernel.registerMount(treeMount('/root', buildRoot));
  kernel.registerMount(treeMount('/usr', buildUsr));
  kernel.registerMount(treeMount('/var', buildVar));
};

export default install;
