import { lightTheme, createTheme, Theme } from 'bold-ui';
interface ThemeExtra {
  sizes: Theme['typography']['sizes'] & Record<string, any>;
}
const orginalTheme = createTheme({
  typography: {
    ...lightTheme.typography,
  },
});

export const theme: Theme & ThemeExtra = {
  ...orginalTheme,
  sizes: {
    ...lightTheme.typography.sizes,
    ...{ text: '1rem', button: '1rem' },
  },
};
