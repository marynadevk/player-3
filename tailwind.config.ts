import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      maxWidth: {
        layout: '1440px',
      },
      spacing: {
        '52': '13.1875rem', // width 211px
        '53': '13.375rem', // height 214px
      },
      borderRadius: {
        lg: '8px',
      },
    },
  },
};
export default config;
