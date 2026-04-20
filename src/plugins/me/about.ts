import type { ExecOpts, PluginInstall } from '../../core/kernel.js';
import type { Ctx } from '../../core/shell.js';
import { asGuest, file } from '../../core/vfs.js';

const aboutText =
  'software engineer since 2004, experience in c/c++, x86 assembly, .net, java, nodejs, go and rust.\n' +
  'interests: systems, low-level, security, binary exploitation, infrastructure, tool development.';

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
  });

  kernel.installExecutable('/bin/about', {
    describe: 'who is this',
    exec: aliasCat('~/about.txt'),
  });
};

export default install;
