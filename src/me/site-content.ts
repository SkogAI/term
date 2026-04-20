import { dim } from '../core/color.js';
import type { ExecOpts, PluginInstall } from '../core/kernel.js';
import type { Ctx } from '../core/shell.js';
import { asGuest, file } from '../core/vfs.js';

const aboutText =
  'software engineer since 2004, experience in c/c++, x86 assembly, .net, java, nodejs, go and rust.\n' +
  'interests: systems, low-level, security, binary exploitation, infrastructure, tool development.';

const contactText =
  `${dim('email    ')}[hello@jpinillos.dev](mailto:hello@jpinillos.dev)\n` +
  `${dim('github   ')}[github.com/jazho76](https://github.com/jazho76)\n` +
  `${dim('linkedin ')}[linkedin.com/in/joaquin-pinillos](https://www.linkedin.com/in/joaquin-pinillos-31b8a0158/)`;

const aliasCat =
  (target: string): ExecOpts['exec'] =>
  (ctx: Ctx) => {
    const r = ctx.fs.read(target);
    if (!r.ok) {
      const msg: Record<string, string> = {
        ENOENT: `cat: ${target}: no such file or directory`,
        EACCES: `cat: ${target}: Permission denied`,
        EISDIR: `cat: ${target}: is a directory`,
      };
      ctx.out((msg[r.error] ?? `cat: ${target}: ${r.error}`) + '\n');
      return 1;
    }
    ctx.out(r.content + '\n');
    return 0;
  };

const install: PluginInstall = kernel => {
  kernel.vfs.appendDir('/home/guest', {
    'about.txt': asGuest(file(aboutText)),
    'contact.txt': asGuest(file(contactText)),
  });
  kernel.vfs.appendDir('/root', {
    'flag.txt': file(
      '[pwn.college/hacker/123598](https://pwn.college/hacker/123598)\n',
      undefined,
      { owner: 'root', group: 'root', mode: 0o600 }
    ),
  });

  kernel.installExecutable('/bin/about', {
    describe: 'who is this',
    exec: aliasCat('~/about.txt'),
  });
};

export default install;
