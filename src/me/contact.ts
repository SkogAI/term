import { dim } from '../core/color.js';
import type { PluginInstall } from '../core/kernel.js';
import { asGuest, file } from '../core/vfs.js';

const contactText =
  `${dim('email    ')}[hello@jpinillos.dev](mailto:hello@jpinillos.dev)\n` +
  `${dim('github   ')}[github.com/jazho76](https://github.com/jazho76)\n` +
  `${dim('linkedin ')}[linkedin.com/in/joaquin-pinillos](https://www.linkedin.com/in/joaquin-pinillos-31b8a0158/)`;

const install: PluginInstall = kernel => {
  kernel.vfs.appendDir('/home/guest', {
    'contact.txt': asGuest(file(contactText)),
  });
};

export default install;
