// Theme configuration for TuneZone
// Based on logo colors: Blue gradient from cyan-blue to deep blue

export const theme = {
  // Primary colors (based on logo)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa', // Main primary color
    500: '#3b82f6',
    600: '#2563eb', // Main primary dark
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary colors (complementary blue tones)
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8', // Main secondary color
    500: '#0ea5e9',
    600: '#0284c7', // Main secondary dark
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Accent colors (for highlights and CTAs)
  accent: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee', // Main accent color
    500: '#06b6d4',
    600: '#0891b2', // Main accent dark
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  // Gradient combinations
  gradients: {
    primary: 'from-blue-500 to-blue-600',
    primaryHover: 'from-blue-600 to-blue-700',
    secondary: 'from-sky-400 to-blue-500',
    secondaryHover: 'from-sky-500 to-blue-600',
    accent: 'from-cyan-400 to-blue-500',
    accentHover: 'from-cyan-500 to-blue-600',
    background: 'from-gray-900 via-gray-800 to-gray-900',
    card: 'from-gray-800/70 to-gray-700/70',
  },

  // Text colors
  text: {
    primary: 'text-blue-400',
    primaryHover: 'text-blue-300',
    secondary: 'text-sky-400',
    secondaryHover: 'text-sky-300',
    accent: 'text-cyan-400',
    accentHover: 'text-cyan-300',
    gradient: 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent',
  },

  // Border colors
  border: {
    primary: 'border-blue-500',
    primaryHover: 'border-blue-400',
    secondary: 'border-sky-500',
    secondaryHover: 'border-sky-400',
    accent: 'border-cyan-500',
    accentHover: 'border-cyan-400',
  },

  // Background colors
  background: {
    primary: 'bg-blue-500',
    primaryHover: 'bg-blue-600',
    secondary: 'bg-sky-500',
    secondaryHover: 'bg-sky-600',
    accent: 'bg-cyan-500',
    accentHover: 'bg-cyan-600',
  },

  // Button styles
  button: {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    secondary: 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600',
    accent: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600',
    outline: 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white',
  },

  // Logo path
  logo: {
    main: '/images/logo-4t.png',
    fallback: '/images/logo.png',
    alt: 'TuneZone Logo',
  }
};

// Helper function to get theme colors
export const getThemeColor = (category: keyof typeof theme, variant: string): string => {
  const colorCategory = theme[category] as Record<string, unknown>;
  return (colorCategory?.[variant] as string) || '';
};

// CSS custom properties for dynamic theming
export const cssVariables = `
  :root {
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    
    --secondary-400: #38bdf8;
    --secondary-600: #0284c7;
    
    --accent-400: #22d3ee;
    --accent-600: #0891b2;
  }
`;
