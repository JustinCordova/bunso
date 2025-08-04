export const GRADIENT = ['#C4A7FF', '#B28DFF', '#9F6BFF'] as const // Light Lavender to Vibrant Lavender
export const PRIMARY = '#B28DFF' // Light Lavender (main primary)
export const SECONDARY = '#E0C3FF' // Very Light Plum (complementary secondary)
export const ACCENT = '#9F6BFF' // Medium Lavender Accent (strong CTA)
export const BACKGROUND = '#181A1B' // Main Background
export const DARK = '#181A1B' // Dark Background
export const MUTED = '#A49D91' // Navbar Icon Color
export const SUCCESS = '#55EFC4' // Mint Green
export const WARNING = '#FFBA08' // Golden Yellow
export const DANGER = '#D63031' // Crimson Red

// Type for gradient array
export type GradientColors = typeof GRADIENT

// Theme object for easy access
export const THEME = {
  gradient: GRADIENT,
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: ACCENT,
  dark: DARK,
  muted: MUTED,
  background: BACKGROUND,
  success: SUCCESS,
  warning: WARNING,
  danger: DANGER,
} as const
