import { Button, Input, createTheme } from '@mantine/core'
import buttonClass from './components/button/Button.module.css'
import inputClass from './components/input/Input.module.css'
export const theme = createTheme({
  colors: {
    blue: [
      '#FCFDFF',
      '#F6F9FF',
      '#ECF1FF',
      '#E1E9FF',
      '#D2DEFF',
      '#BED0FF',
      '#A7BCFF',
      '#87A1FF',
      '#2B3882',
      '#3A4A96',
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
