import {useColorMode, useColorModeValue, useTheme} from 'native-base';
import {useMemo} from 'react';

export const THEME_MODE_LIGHT = 'light';
export const THEME_MODE_DARK = 'dark';
export const PANEL_MIDDLE_GRAY = '#e4e4e7'; //gray.200 coolGray.50 #f9fafb

export const PANEL_MIDDLE_DARK = '#3f3f46'; //dark.100
// export const PANEL_MIDDLE_DARK = '#27272a'; //dark.100

export const PANEL_DARK_GRAY = '#f3f3f3'; //gray.50 #e8e8e8 #f4f4f5
// export const PANEL_DARK_GRAY = '#e8e7e7'; //gray.50 #e8e8e8 #f4f4f5
// export const PANEL_DARK_GRAY = '#f4f4f5'; //gray.50 #e8e8e8
export const PANEL_DARK_DARK = '#18181b';

export function useDarkMode() {
  const {colorMode} = useColorMode();
  const themeMode = useColorModeValue(THEME_MODE_LIGHT, THEME_MODE_DARK);
  const {colors} = useTheme();
  // const secondaryLight = theme.colors.gray[700];
  // const secondaryLight = theme.colors.dark[600];
  const secondaryLight = colors.gray[300];
  // const primary = colorMode === 'dark'
  //#3f3f46

  const isDark = useMemo(() => colorMode === 'dark', [colorMode]);

  const primary600 = useMemo(() => {
    return colors.primary['600'];
  }, [colors.primary]);

  const textColor = useMemo(() => {
    return !isDark ? '#27272a' : '#f8fafc';
  }, [isDark]);

  const themeSecondary = useMemo(() => {
    return !isDark ? secondaryLight : PANEL_MIDDLE_DARK;
  }, [isDark, secondaryLight]);

  const invertedThemeSecondary = useMemo(() => {
    return isDark ? PANEL_MIDDLE_GRAY : PANEL_MIDDLE_DARK;
  }, [isDark]);

  const themePrimary = useMemo(() => {
    return !isDark ? PANEL_DARK_GRAY : PANEL_DARK_DARK;
  }, [isDark]);

  return {
    themePrimary,
    themeSecondary,
    themeMode,
    isDark,
    textColor,
    invertedThemeSecondary,
    primary600,
  };
}
