import { Button, Input, createTheme } from '@mantine/core'
import buttonClass from './components/button/Button.module.css'
import inputClass from './components/input/Input.module.css'
export const theme = createTheme({
  colors: {
    blue: [
      '#f0f1fa',
      '#dcdfee',
      '#b6bcde',
      '#8e96cf',
      '#6d78c4',
      '#5863bc',
      '#4d59ba',
      '#3e4aa4',
      '#354193',
      '#2b3882',
    ],
  },
  primaryColor: 'blue',
  primaryShade: 9,
  defaultRadius: 'md',
  components: {
    Button: Button.extend({
      classNames: {
        root: buttonClass.root,
      },
    }),
    Input: Input.extend({
      classNames: {
        // input: inputClass.input,
        wrapper: inputClass.wrapper,
      },
    }),
  },
})
