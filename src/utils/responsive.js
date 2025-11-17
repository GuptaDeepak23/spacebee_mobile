import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design reference - typically iPhone X or similar)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale factor based on screen width
const scale = SCREEN_WIDTH / BASE_WIDTH;
const verticalScale = SCREEN_HEIGHT / BASE_HEIGHT;

// Moderate scale - less aggressive scaling for font sizes
const moderateScale = (size, factor = 0.5) => {
  return size + (scale - 1) * size * factor;
};

// Responsive width
export const rw = (size) => {
  return size * scale;
};

// Responsive height
export const rh = (size) => {
  return size * verticalScale;
};

// Responsive font size (moderate scaling)
export const rf = (size) => {
  return moderateScale(size);
};

// Get screen dimensions
export const getScreenWidth = () => SCREEN_WIDTH;
export const getScreenHeight = () => SCREEN_HEIGHT;

// Check if device is small screen
export const isSmallScreen = () => SCREEN_WIDTH < 375;

// Check if device is tablet
export const isTablet = () => SCREEN_WIDTH >= 768;

// Responsive padding/margin
export const rp = (size) => {
  return size * scale;
};

