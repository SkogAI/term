import { dim } from '../../core/color.js';
import type { PluginInstall } from '../../core/kernel.js';
import { asGuest, file } from '../../core/vfs.js';

const contactText =
  `${dim('email    ')}[hello@skogai.dev](mailto:hello@skogai.dev)\n` +
  `${dim('github   ')}[github.com/SkogAI](https://github.com/SkogAI)\n` +
  `${dim('linkedin ')}[linkedin.com/in/SkogAI](https://www.linkedin.com/in/SkogAI)`;

const install: PluginInstall = kernel => {
  kernel.vfs.appendDir('/home/skogix', {
    'contact.txt': asGuest(file(contactText)),
  });
};

export default install;
