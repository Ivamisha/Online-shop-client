import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      blue: React.CSSProperties['color']
      lightBlue: React.CSSProperties['color']
      red: React.CSSProperties['color']
      danger: React.CSSProperties['color']
      white: React.CSSProperties['color']
      green: React.CSSProperties['color']
      purple: React.CSSProperties['color']
      gray: React.CSSProperties['color']
    }
  }
  interface PaletteColor {
    darker?: string
    blue?: string
    lightBlue?: string
    red?: string
    danger?: string
    white?: string
    green?: string
    purple?: string
    gray?: string
  }
}

export const palette = {
  white: '#fafafa',
  blue: '#98cbed',
  lightBlue: '#bbdefb',
  red: '#fc1202',
  black: '#232323',
  green: '#b9e303',
  purple: '#a88ed4',
  gray: '#efefef',
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions['primary']
  }
}

export let theme = createTheme()
theme = createTheme(theme, {
  palette: {
    primary: {
      main: palette.white,
      lightBlue: palette.lightBlue,
      red: palette.red,
      white: palette.white,
    },
    secondary: {
      main: palette.black,
      green: palette.green,
      purple: palette.purple,
      gray: palette.gray,
    },
  },

  typography: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
    fontFamily: 'Roboto',
    fontSize: 10,
    body2: {
      fontFamily: 'Roboto',
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: palette.white,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          background: palette.white,
          borderRadius: '0.7rem',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: palette.white,
          borderRadius: '0.7rem',
        },
      },
    },
  },
})
