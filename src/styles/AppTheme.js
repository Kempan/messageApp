import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const ColorTheme = {
  background: Colors.brightGrey,
  surface: Colors.white,
  error: Colors.red,

  primary: Colors.mintGreen,
  primaryVariant: Colors.mintGreenLight,

  secondary: Colors.pinkRed,
  secondaryVariant: Colors.pinkRedLight,

  onPrimary: Colors.white,
  onSecondary: Colors.black,

  onBackground: Colors.black,
  onSurface: Colors.black,
  onError: Colors.white,
}

export const Fonts = StyleSheet.create({
  h1: {
    fontSize: 27,
    fontWeight: '800',
    color: Colors.pinkRed
  },
  h2: {
    fontSize: 21,
    fontWeight: '700',
    color: Colors.pinkRed
  },
  h3: {
    fontSize: 19,
    fontWeight: '400',
    color: Colors.blackHighEmphasis,
  },
  h4: {
    fontSize: 19,
    fontWeight: '500',
    color: Colors.blackHighEmphasis,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackHighEmphasis,
  },
  body1: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.blackHighEmphasis,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.blackHighEmphasis,
  },  
  button: {
    fontSize: 16,
    fontWeight: '500',
  },  
  textField: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.blackMediumEmphasis,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.blackMediumEmphasis,
  },  
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.blackMediumEmphasis,
  },
});