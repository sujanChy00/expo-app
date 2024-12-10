import { useWindowDimensions, ViewStyle } from 'react-native';

/**
 * Custom hook to get the current window dimensions and determine the responsive breakpoint.
 *
 * Breakpoints:
 * - `lg`: Width >= 1024px
 * - `md`: 992px <= Width < 1024px
 * - `sm`: 768px <= Width < 992px
 * - `xs`: 576px <= Width < 768px
 * - `base`: Width < 576px
 *
 * @returns {object} An object containing the current width and boolean values for each breakpoint:
 *   - `width` (number): The current width of the window.
 *   - `isLg` (boolean): True if the window width is 1024px or greater.
 *   - `isMd` (boolean): True if the window width is between 992px and 1024px.
 *   - `isSm` (boolean): True if the window width is between 768px and 992px.
 *   - `isXs` (boolean): True if the window width is between 576px and 768px.
 *   - `isBase` (boolean): True if the window width is less than 576px.
 */

export const useWindow = () => {
  const { width, ...rest } = useWindowDimensions();

  const isLg = width >= 1024;
  const isMd = width <= 992;
  const isSm = width >= 768;
  const isXs = width >= 576;
  const isBase = width < 576;

  const cardSkeletonStyle: ViewStyle = { width: isBase ? '100%' : '48%' };
  const dataCardStyle: ViewStyle = { width: isXs ? '96%' : '100%' };

  return {
    width,
    isLg,
    isMd,
    isSm,
    isXs,
    isBase,
    cardSkeletonStyle,
    dataCardStyle,
    ...rest,
  };
};
