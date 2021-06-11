import { ITheme } from '@/interfaces';

const ColorPalette = {
  purple: {
    bg: '#e2e2e2',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: '#381f74',
    primaryLight: '#5b3da2',
    primaryBright: 'lighten(#5b3da2, 25%)',
    primaryContrast: '#fff',
    primaryDark: '#210d4f',
    shadow: '#ddd',
    // bg: '#e2e2e2',
    // default: '#535353',
    // defaultDark: '#111',
    // editorBg: '#fff',
    // editorBgHover: '#f6f6f6',
    // muted: '#999',
    // pickerBg: '#fff,
    // pickerBgHover: '#f6f6f6',
    // primary: '#5b3da2',
    // shadow: '#ddd',
    // toolbarBg: '#5b3da2',
    // toolbarBgHover: '#381f74',
    // toolbarFg: '#fff',
    // toolbarIcon: '#5b3da2'
  },
  dark: {
    bg: '#333',
    bgLight: '#555',
    bgLightHover: '#444',
    default: '#eee',
    defaultLight: '#eee',
    light: '#fff',
    muted: '#c2c2c2',
    primary: '#222',
    primaryLight: '#333',
    primaryBright: 'lighten(#333, 25%)',
    primaryContrast: '#eee',
    primaryDark: '#000',
    shadow: '#000'
  },
  candy: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(148, 41, 91)',
    primaryLight: 'rgb(204, 63, 108)',
    primaryBright: 'lighten(rrgb(204, 63, 108), 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(84, 30, 69)',
    shadow: '#ddd'
  },
  coper: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(249, 159, 53)',
    primaryLight: 'rgb(253, 189, 94)',
    primaryBright: 'lighten(rgb(253, 189, 94), 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(215, 121, 28)',
    shadow: '#ddd'
  },
  desert: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(152, 109, 92)',
    primaryLight: 'rgb(197, 158, 137)',
    primaryBright: 'lighten(rgb(197, 158, 137), 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(84, 45, 36)',
    shadow: '#ddd'
  },
  fire: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(178, 32, 37)',
    primaryLight: 'rgb(236, 52, 54)',
    primaryBright: 'lighten(rgb(236, 52, 54), 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(118, 13, 22)',
    shadow: '#ddd'
  },
  forest: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(91, 108, 48)',
    primaryLight: 'rgb(124, 144, 42)',
    primaryBright: 'lighten(#5b3da2, 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(66, 79, 35)',
    shadow: '#ddd'
  },
  sea: {
    bg: '#e2e2e2',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: '#106083',
    primaryLight: '#0185ab',
    primaryBright: 'lighten(#0185ab, 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(0, 56, 86)',
    shadow: '#ddd'
  },
  snowwhite: {
    bg: '#e2e2e2',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#535353',
    muted: '#999',
    primary: '#f2f2f2',
    primaryLight: '#f6f6f6',
    primaryBright: 'lighten(#0185ab, 25%)',
    primaryContrast: '#999',
    primaryDark: '#e9e9e9',
    shadow: '#ddd'
  },
  steel: {
    bg: '#e9e9e9',
    bgLight: '#fff',
    bgLightHover: '#f6f6f6',
    default: '#111',
    defaultLight: '#535353',
    light: '#fff',
    muted: '#999',
    primary: 'rgb(99, 110, 123)',
    primaryLight: 'rgb(157, 164, 167)',
    primaryBright: 'lighten($primary-light, 25%)',
    primaryContrast: '#fff',
    primaryDark: 'rgb(72, 82, 90)',
    shadow: '#ddd'
  }
};

export default ColorPalette;

// @TODO
// ITheme & any type is here because the codebase is still in transition from old theme
// object to the new one.
export const Themes: Record<string, ITheme & any> = {
  purple: {
    ...ColorPalette.purple,
    card: {
      bg: '#fff',
      bgHover: '#f6f6f6',
      fgCard: '#222'
    }
  }
};
