import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#F2F4F8' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
}

export default preview
