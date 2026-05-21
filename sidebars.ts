import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: { type: 'generated-index' },
      items: [
        'getting-started/system-requirements',
        'getting-started/installation-windows',
        'getting-started/installation-macos',
        'getting-started/installation-linux',
        'getting-started/first-launch',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      link: { type: 'generated-index' },
      items: [
        'user-guide/connecting-to-sunbrick',
        'user-guide/network-setup',
        'user-guide/running-a-measurement',
        'user-guide/spectral-reports',
        'user-guide/calibration',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: { type: 'generated-index' },
      items: ['troubleshooting/index'],
    },
    {
      type: 'category',
      label: 'Release Notes',
      link: { type: 'generated-index' },
      items: ['release-notes/index'],
    },
  ],
};

export default sidebars;
