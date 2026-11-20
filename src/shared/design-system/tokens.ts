/**
 * Pizza Dorada — Design Tokens
 * Design system: "Artisanal Warmth & Golden Heritage"
 *
 * FUENTE DE VERDAD en TypeScript. Los mismos valores viven en
 * `src/app/globals.css` dentro del bloque `@theme` (CSS variables) y en
 * `tailwind.config.ts` (puente para Tailwind v3).
 *
 * Regla: ningún componente usa hex, px de color ni sombras ad-hoc.
 * Todo se consume mediante token o utilidad derivada de token.
 */

/* -------------------------------------------------------------------------- */
/* Color — roles Material 3 del diseño Stitch                                  */
/* -------------------------------------------------------------------------- */

export const colors = {
  // Primary — motor de conversión (rojo tomate)
  primary: '#8f000d',
  'on-primary': '#ffffff',
  'primary-container': '#b22222',
  'on-primary-container': '#ffc8c2',
  'primary-fixed': '#ffdad6',
  'primary-fixed-dim': '#ffb4ac',
  'on-primary-fixed': '#410003',
  'on-primary-fixed-variant': '#92030f',
  'inverse-primary': '#ffb4ac',

  // Secondary — dorado premium
  secondary: '#735c00',
  'on-secondary': '#ffffff',
  'secondary-container': '#fed65b',
  'on-secondary-container': '#745c00',
  'secondary-fixed': '#ffe088',
  'secondary-fixed-dim': '#e9c349',
  'on-secondary-fixed': '#241a00',
  'on-secondary-fixed-variant': '#574500',

  // Tertiary — verde oliva
  tertiary: '#3d4a00',
  'on-tertiary': '#ffffff',
  'tertiary-container': '#546216',
  'on-tertiary-container': '#ccdd84',
  'tertiary-fixed': '#daeb90',
  'tertiary-fixed-dim': '#becf77',
  'on-tertiary-fixed': '#181e00',
  'on-tertiary-fixed-variant': '#3f4c00',

  // Error
  error: '#ba1a1a',
  'on-error': '#ffffff',
  'error-container': '#ffdad6',
  'on-error-container': '#93000a',

  // Surface / background — crema cálida
  background: '#fff8f6',
  'on-background': '#2b1611',
  surface: '#fff8f6',
  'on-surface': '#2b1611',
  'on-surface-variant': '#5a403e',
  'surface-dim': '#f9d1c8',
  'surface-bright': '#fff8f6',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#fff0ed',
  'surface-container': '#ffe9e4',
  'surface-container-high': '#ffe2db',
  'surface-container-highest': '#ffdad2',
  'surface-variant': '#ffdad2',
  'surface-tint': '#b52424',
  'inverse-surface': '#432a25',
  'inverse-on-surface': '#ffede9',

  // Outline
  outline: '#8e706d',
  'outline-variant': '#e2beba',
} as const;

/**
 * Paleta de marca documentada (Design.md de Stitch).
 * Usar para narrativa de marca, ilustraciones y badges; para UI de producto
 * preferir los roles M3 de `colors` (ya resuelven contraste).
 */
export const brand = {
  /** Rojo tomate — CTA principal */
  rosso: '#B22222',
  /** Dorado premium — medallas, bordes, acentos */
  oro: '#D4AF37',
  /** Verde oliva — frescura, badges vegetarianos */
  oliva: '#5D6B1F',
  /** Café artesanal — tipografía de máximo contraste, footers */
  cafe: '#4E342E',
  /** Crema natural — lienzo base */
  crema: '#FDFBF7',
  /** Crema oscura — paneles de sección */
  cremaOscura: '#F5E9C6',
} as const;

/* -------------------------------------------------------------------------- */
/* Tipografía                                                                  */
/* -------------------------------------------------------------------------- */

export const fontFamily = {
  display: 'var(--font-playfair), ui-serif, Georgia, serif',
  sans: 'var(--font-jakarta), ui-sans-serif, system-ui, sans-serif',
} as const;

type FontKey = keyof typeof fontFamily;

export interface TypeStyle {
  font: FontKey;
  size: string;
  lineHeight: string;
  weight: number;
  letterSpacing?: string;
}

export const typography = {
  'display-lg': { font: 'display', size: '48px', lineHeight: '56px', weight: 700, letterSpacing: '-0.02em' },
  'display-lg-mobile': { font: 'display', size: '32px', lineHeight: '40px', weight: 700, letterSpacing: '-0.01em' },
  'headline-lg': { font: 'display', size: '32px', lineHeight: '40px', weight: 600 },
  'headline-lg-mobile': { font: 'display', size: '26px', lineHeight: '34px', weight: 600 },
  'headline-md': { font: 'display', size: '24px', lineHeight: '32px', weight: 600 },
  'headline-sm': { font: 'display', size: '20px', lineHeight: '28px', weight: 600 },
  'title-lg': { font: 'sans', size: '18px', lineHeight: '26px', weight: 700 },
  'title-md': { font: 'sans', size: '16px', lineHeight: '24px', weight: 600 },
  'body-lg': { font: 'sans', size: '16px', lineHeight: '26px', weight: 400 },
  'body-md': { font: 'sans', size: '14px', lineHeight: '22px', weight: 400 },
  'body-sm': { font: 'sans', size: '12px', lineHeight: '18px', weight: 400 },
  'label-lg': { font: 'sans', size: '14px', lineHeight: '20px', weight: 600, letterSpacing: '0.01em' },
  'label-md': { font: 'sans', size: '12px', lineHeight: '16px', weight: 600, letterSpacing: '0.02em' },
  'label-sm': { font: 'sans', size: '11px', lineHeight: '14px', weight: 700, letterSpacing: '0.04em' },
} as const satisfies Record<string, TypeStyle>;

export type TypeToken = keyof typeof typography;

/* -------------------------------------------------------------------------- */
/* Espaciado — ritmo de 8pt                                                    */
/* -------------------------------------------------------------------------- */

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2.5rem',
  '2xl': '4rem',
  /** Padding lateral interno de columnas */
  gutter: '1rem',
  'gutter-desktop': '1.5rem',
  /** Margen del contenedor de página */
  margin: '1rem',
  'margin-tablet': '2rem',
  'margin-desktop': '3rem',
} as const;

/* -------------------------------------------------------------------------- */
/* Radios                                                                      */
/* -------------------------------------------------------------------------- */

export const radius = {
  chip: '0.25rem',
  /** Radio por defecto de controles: botones, inputs */
  control: '0.5rem',
  card: '0.75rem',
  panel: '1rem',
  modal: '1.5rem',
  pill: '9999px',
} as const;

/* -------------------------------------------------------------------------- */
/* Elevación — sombras cálidas con tinte café                                  */
/* -------------------------------------------------------------------------- */

export const elevation = {
  /** Tarjetas de menú y controles */
  e1: '0 2px 8px -2px rgba(78, 52, 46, 0.08)',
  /** Elementos flotantes y tarjetas activas */
  e2: '0 6px 16px -4px rgba(78, 52, 46, 0.12)',
  /** Barra inferior sticky, modales, carrito */
  e3: '0 12px 32px -6px rgba(78, 52, 46, 0.20)',
  /** Halo del CTA primario */
  cta: '0 4px 12px rgba(178, 34, 34, 0.30)',
  /** Borde interior dorado tipo sello de certificación */
  insetGold: 'inset 0 0 0 1px #D4AF37',
  /** Foco accesible sobre inputs */
  focusGold: '0 0 0 3px rgba(212, 175, 55, 0.30)',
  /** Halo al pasar el cursor sobre el botón flotante */
  fabHover: '0 0 0 6px rgba(212, 175, 55, 0.25), 0 0 28px 10px rgba(212, 175, 55, 0.55)',
  /** Elevación sobre superficies oscuras (inverse-surface) */
  dark: '0 6px 16px -4px rgba(0, 0, 0, 0.45)',
} as const;

/* -------------------------------------------------------------------------- */
/* Layout                                                                      */
/* -------------------------------------------------------------------------- */

export const layout = {
  maxWidth: '1280px',
  breakpoints: {
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  grid: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Movimiento                                                                  */
/* -------------------------------------------------------------------------- */

export const motion = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    toast: '3800ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Export agregado                                                             */
/* -------------------------------------------------------------------------- */

export const tokens = {
  colors,
  brand,
  fontFamily,
  typography,
  spacing,
  radius,
  elevation,
  layout,
  motion,
} as const;

export type Tokens = typeof tokens;
