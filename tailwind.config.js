import pluginMantine from '@devoss/tailwind-plugin-mantine'

import { theme } from './src/theme'

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
export default config
