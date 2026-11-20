import type { Config } from 'tailwindcss';
import {
  colors,
  typography,
  spacing,
  radius,
  elevation,
  type TypeStyle,
} from './src/shared/design-system/tokens';

/**
 * Puente Tailwind v3 → tokens de Pizza Dorada.
 *
 * Tailwind v4 (baseline del proyecto) ya consume los tokens desde
 * `src/app/globals.css` (@theme). Este archivo existe para herramientas o
 * entornos que aún resuelvan `tailwind.config`.
 *
 * No añadir valores nuevos aquí: editar primero tokens.ts y globals.css.
 */
export default {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/modules/**/*.{ts,tsx,mdx}',
    './src/shared/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        display: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: Object.fromEntries(
        Object.entries(typography as Record<string, TypeStyle>).map(([name, style]) => [
          name,
          [
            style.size,
            {
              lineHeight: style.lineHeight,
              fontWeight: String(style.weight),
              ...(style.letterSpacing ? { letterSpacing: style.letterSpacing } : {}),
            },
          ],
        ]),
      ),
      spacing,
      borderRadius: {
        chip: radius.chip,
        control: radius.control,
        card: radius.card,
        panel: radius.panel,
        modal: radius.modal,
        DEFAULT: radius.control,
      },
      boxShadow: {
        e1: elevation.e1,
        e2: elevation.e2,
        e3: elevation.e3,
        cta: elevation.cta,
        'gold-inset': elevation.insetGold,
        'gold-focus': elevation.focusGold,
      },
      maxWidth: {
        page: '1280px',
      },
      screens: {
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
