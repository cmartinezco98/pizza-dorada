# CLAUDE.md — Pizza Dorada

Guía de trabajo para agentes de código en este repositorio. Leerla completa antes de crear o modificar código.

---

## 1. Qué es este proyecto

Landing page de conversión para **Pizza Dorada**, pizzería artesanal a domicilio. El objetivo del producto es doble:

1. **Antojo inmediato**: transmitir pizza artesanal recién horneada (masa madre, horno de piedra a 450 °C).
2. **Conversión a domicilio**: llevar al usuario a verificar cobertura, abrir la carta y pedir por WhatsApp en pocos segundos.

Toda decisión de diseño o código se evalúa contra esos dos objetivos.

El diseño de referencia proviene de **Stitch** (proyecto `15935671358759461784`, pantalla `Pizza Dorada - Domicilios Artesanales`) y está guardado en:

- `docs/reference/pizza-dorada-landing.html` — landing completa de referencia (HTML + Tailwind CDN). Es **referencia visual**, no código a copiar.
- `src/shared/design-system/tokens.ts` — tokens canónicos del sistema.
- `src/app/globals.css` — tokens CSS (`@theme`) y utilidades tipográficas.

---

## 2. Stack

| Área | Decisión |
|---|---|
| Framework | Next.js 15 con App Router |
| Lenguaje | TypeScript en modo `strict` |
| Estilos | Tailwind CSS v4 (CSS-first, `@theme`) |
| Fuentes | `next/font/google` → Playfair Display + Plus Jakarta Sans |
| Iconos | Material Symbols Outlined (fuente) o SVG inline; nunca imágenes para iconos |
| Estado | Server Components por defecto; cliente solo donde hay interacción |
| Datos | Contenido estático en el repositorio; sin CMS en esta fase |
| Formularios | Server Actions si se requiere envío; sin librerías de estado global |
| Tests | Vitest + Testing Library para lógica y componentes con interacción |

No agregar dependencias nuevas sin justificar el peso en una landing de una sola página.

---

## 3. Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run start        # servir build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest
```

Antes de dar una tarea por terminada: `npm run typecheck` y `npm run lint` deben pasar sin errores nuevos.

---

## 4. Arquitectura — Clean Architecture + vertical slices

La regla de dependencia es unidireccional. Una capa interna **nunca** importa de una capa externa.

```
app (rutas) → modules/*/presentation → application → domain
                                            ↑
                              infrastructure ┘ (implementa puertos del dominio)
shared/ ← utilidades sin reglas de negocio, importables desde cualquier capa
```

```
src/
  app/                          # Solo rutas, layouts, metadata. Componentes finos.
    layout.tsx
    page.tsx
    globals.css
  modules/                      # Un directorio por capacidad de negocio
    menu/
      domain/
        pizza.ts                # Tipos y reglas puras (precio, categorías, validaciones)
      application/
        get-menu.ts             # Casos de uso; orquestan dominio y puertos
        ports.ts                # Interfaces que la infraestructura implementa
      infrastructure/
        menu.repository.ts      # Implementación concreta (JSON local, API futura)
      presentation/
        components/             # Solo UI de este módulo
        hooks/
    coverage/                   # Verificación de zona de despacho
    order/                      # Envío de pedido a WhatsApp y carrito temporal
  shared/
    design-system/              # tokens.ts, index.ts, primitivas visuales
    lib/                        # cn(), formatters, validadores genéricos
    config/                     # site.ts (metadata, teléfono, horarios, links)
  components/                   # Solo composición transversal sin lógica de negocio
```

Reglas concretas:

- `domain/` no importa React, Next, Tailwind ni fetch. Solo TypeScript puro.
- `application/` define puertos (interfaces); `infrastructure/` los implementa.
- `presentation/` puede importar `application` y `domain`, nunca `infrastructure` directamente.
- `app/` importa `presentation` y `shared`; mantiene las páginas como composición.
- Un módulo no importa `presentation` de otro módulo. Si necesita algo compartido, va a `shared/` o se expone un caso de uso.

### Cuándo un componente es Client Component

Usar `'use client'` solo si necesita:

- estado local o `useState`/`useReducer`,
- eventos del DOM,
- APIs del navegador,
- animaciones controladas por JS.

Todo lo demás permanece como Server Component. No marcar un layout completo como cliente por un botón: aislar el componente interactivo.

---

## 5. Sistema de diseño — "Artisanal Warmth & Golden Heritage"

### 5.1 Fuente de verdad

Los tokens viven en **dos archivos que deben mantenerse sincronizados**:

- `src/shared/design-system/tokens.ts` (TypeScript, para lógica y estilos dinámicos)
- `src/app/globals.css` (`@theme`, genera utilidades de Tailwind)

Cambiar un token = editar ambos. `tailwind.config.ts` es solo un puente para Tailwind v3 y deriva de `tokens.ts`.

### 5.2 Colores

Se usan **roles Material 3** del diseño, no hex sueltos:

| Rol | Token | Uso |
|---|---|---|
| `primary` | `#8f000d` | Texto/íconos sobre superficies claras, estados activos |
| `primary-container` | `#b22222` | Fondo del CTA principal ("Pedir Ahora") |
| `secondary-container` | `#fed65b` | Badges premium, destacados dorados |
| `tertiary` / `tertiary-container` | `#3d4a00` / `#546216` | Frescura, badges vegetarianos, éxito |
| `surface` | `#fff8f6` | Lienzo base de página |
| `surface-container` | `#ffe9e4` | Paneles de sección y tarjetas |
| `inverse-surface` | `#432a25` | Sección de pedido y footers de contraste |
| `outline-variant` | `#e2beba` | Bordes suaves de inputs |
| `error` | `#ba1a1a` | Errores de validación |

Paleta de marca (`brand.*`) para narrativa y detalles: `rosso #B22222`, `oro #D4AF37`, `oliva #5D6B1F`, `cafe #4E342E`, `crema #FDFBF7`, `cremaOscura #F5E9C6`.

**Prohibido**: hex literales en JSX, `rgb()` inline, colores fuera de los tokens, `#000`/`#fff` genéricos cuando existe rol equivalente.

### 5.3 Tipografía

| Utilidad | Token | Uso |
|---|---|---|
| `type-display-lg` / `type-display-lg-mobile` | display-lg | Hero, titulares de máximo impacto |
| `type-headline-lg` / `-mobile` | headline-lg | Títulos de sección |
| `type-headline-md`, `type-headline-sm` | headline-md/sm | Títulos de tarjeta |
| `type-title-lg`, `type-title-md` | title-lg/md | Subtítulos y nombres de producto |
| `type-body-lg`, `-md`, `-sm` | body-* | Párrafos y metadatos |
| `type-label-lg`, `-md`, `-sm` | label-* | Botones, chips, badges, etiquetas |

- **Playfair Display** (`.font-display`) solo para display y headlines.
- **Plus Jakarta Sans** (`.font-sans`) para todo lo demás, incluido UI y precios.
- No usar `text-[15px]`, `font-bold` suelto ni tracking manual cuando existe una utilidad `type-*`.
- Patrón responsive: `<h1 className="type-display-lg-mobile md:type-display-lg">`.

### 5.4 Espaciado y layout

- Ritmo de 8pt. Escala: `xs .25rem`, `sm .5rem`, `md 1rem`, `lg 1.5rem`, `xl 2.5rem`, `2xl 4rem`.
- Gutter: `1rem` móvil, `1.5rem` desktop.
- Margen de contenedor: `1rem` móvil, `2rem` tablet, `3rem` desktop.
- Contenedor máximo: `max-w-page` (1280px), centrado.
- Breakpoints: `md 768px`, `lg 1024px`, `xl 1280px`.
- Grid: 4 columnas móvil, 8 tablet, 12 desktop.
- No usar `p-[13px]` ni valores fuera de la escala. Si falta un valor, se propone como token nuevo y se documenta.

### 5.5 Radios y elevación

| Token | Valor | Uso |
|---|---|---|
| `rounded-chip` | `0.25rem` | Chips densos |
| `rounded-control` | `0.5rem` | Botones e inputs (radio por defecto) |
| `rounded-card` | `0.75rem` | Tarjetas de menú |
| `rounded-panel` | `1rem` | Paneles y overlays |
| `rounded-modal` | `1.5rem` | Modales y drawers |
| `rounded-full` | `9999px` | Badges, pills, botones circulares |

Sombras: `shadow-e1` (tarjetas), `shadow-e2` (hover/activo), `shadow-e3` (sticky bar, modales), `shadow-cta` (CTA principal), `shadow-gold-inset` (sello dorado), `shadow-gold-focus` (foco de input).

Nunca usar `shadow-md`, `shadow-lg` ni sombras negras/grises genéricas. La elevación siempre lleva tinte café cálido.

### 5.6 Movimiento

- Duraciones: `150ms` interacción, `200ms` transición base, `300ms` entrada de overlays.
- Easing: `ease-standard` para cambios de estado, `ease-enter` para aparición, `ease-exit` para salida.
- Respetar `prefers-reduced-motion` (ya manejado en `globals.css`).
- No animar propiedades de layout; animar `transform` y `opacity`.

---

## 6. Inventario de la landing (referencia Stitch)

Orden de secciones y responsabilidad:

| # | Sección | Contenido clave | Interacción |
|---|---|---|---|
| 1 | Header fijo | Logo, nav (`Especialidades`, `Ritual`, `Cómo funciona`, `Zonas`), CTA "Pedir" | Sticky con blur; nav activa por sección |
| 2 | Hero | Titular display, subtítulo, CTA principal, imagen de pizza | CTA lleva a `#pedir` o a la carta |
| 3 | Barra de confianza | 3–4 sellos ("Horno de leña", "Masa madre 48h", "Entrega 30 min") | Estática |
| 4 | Especialidades (`#especialidades`) | Grid de 4 pizzas: Dorada Suprema, Trufa & 4 Quesos, Rústica Huerta, Diávola Ahumada | "Pedir Esta" abre pedido con producto |
| 5 | Ritual artesanal (`#ritual-artesanal`) | Proceso en 3 pasos: amasado, pomodoro & fior di latte, fuego vivo 90 s a 450 °C | Scroll reveal opcional |
| 6 | Cómo funciona (`#como-funciona`) | Sistema de domicilio en pasos, carta externa, pedido en 1 clic | Link a carta |
| 7 | Garantía (`#garantia-caliente`) | Empaque térmico "Hot-Gold" + promesa de reposición | Estática |
| 8 | Zonas (`#zonas-de-reparto`) | Verificador de cobertura por comuna/dirección + horarios | Input + resultado condicional |
| 9 | Pedido (`#pedir`) | Sección inversa oscura, CTA final WhatsApp | Abre WhatsApp con mensaje prellenado |
| 10 | Footer | Contacto, horarios, redes, legales | Links |
| — | Toast de carrito | Confirmación flotante al añadir producto | Aparece 3.8 s y se oculta |

Los textos están en español de Colombia. Los precios se formatean con `Intl.NumberFormat('es-CO')` y moneda COP.

---

## 7. Convenciones de código

### Nombres

- Componentes: `PascalCase.tsx` (`SpecialtyCard.tsx`).
- Hooks: `useCamelCase.ts`.
- Utilidades y casos de uso: `kebab-case.ts` (`get-menu.ts`) o `camelCase` para funciones.
- Tipos e interfaces: `PascalCase`, sin prefijo `I`.
- Constantes: `SCREAMING_SNAKE_CASE` solo para primitivas globales; el resto en `camelCase` dentro de un objeto.

### Componentes

- Un componente por archivo, con su nombre como export por defecto.
- Props tipadas con `interface` local y `Readonly<Props>`.
- Sin `any`. Si el tipo es desconocido, usar `unknown` y estrechar.
- Composición sobre configuración: preferir `children` y variantes explícitas antes que 12 booleanos.
- Variantes con `clsx`/`cn` y mapas de clases, no concatenación de strings.
- `data-testid` solo cuando no hay rol o label accesible.

### Estilos

- Solo utilidades de Tailwind derivadas de tokens.
- Clases condicionales con `cn()` (`src/shared/lib/cn.ts`).
- Estilos compartidos repetidos → primitiva en `src/shared/design-system` o `components/ui`.
- Sin CSS modules, sin `style={{}}` salvo valores dinámicos que no existen como clase.

### Next.js

- Metadata con el `metadata` export por ruta; `generateMetadata` si es dinámico.
- Imágenes con `next/image`, `width`/`height` explícitos, `sizes` correcto, `priority` solo en el hero.
- Fuentes con `next/font/google`, variables CSS `--font-display` y `--font-sans`, sin `<link>` a Google Fonts.
- `loading.tsx` y `error.tsx` donde aporten; esta landing puede usar una sola página sin ellos.
- `use client` lo más abajo posible del árbol.

### Accesibilidad (obligatoria)

- Contraste mínimo AA (4.5:1 texto normal, 3:1 texto grande) usando los roles M3 ya validados.
- Todo control interactivo debe ser `<button>` o `<a>` con nombre accesible.
- Imágenes decorativas con `alt=""`; informativas con alt descriptivo en español.
- Navegación por teclado completa y foco visible (`:focus-visible` ya definido).
- No depender solo del color para estados (añadir texto o icono).
- Formularios con `<label>` asociado y mensajes de error anunciados con `aria-live`.

### Rendimiento

- Objetivo Lighthouse móvil ≥ 90 en Performance y ≥ 95 en Accessibility.
- Evitar librerías de animación si CSS basta.
- Imágenes en AVIF/WebP vía `next/image`; el hero es la única con `priority`.
- No cargar fuentes de iconos completas si se usan pocos iconos: preferir SVG inline.

### SEO

- `title` ≤ 60 caracteres, `description` ≤ 155, en español.
- Datos estructurados `Restaurant`/`LocalBusiness` en JSON-LD (nombre, teléfono, horario, zona servida).
- Un solo `<h1>` por página; jerarquía de encabezados sin saltos.
- URLs y anchors en español, sin mayúsculas.

---

## 8. Guardrails

- No inventar contenido de negocio (precios, horarios, teléfono). Usar `src/shared/config/site.ts`; si falta un dato, dejarlo como TODO visible y avisar.
- No añadir modo oscuro: el sistema es solo claro por decisión de marca.
- No reemplazar Playfair Display ni Plus Jakarta Sans.
- No introducir un segundo sistema de diseño ni componentes de UI externos sin aprobación.
- No modificar `docs/reference/pizza-dorada-landing.html`: es referencia inmutable.
- No desactivar TypeScript strict, ESLint ni el chequeo de tipos para "hacer pasar" el build.

---

## 9. Flujo de trabajo esperado

1. Leer la sección relevante de la referencia HTML y los tokens.
2. Identificar capa y módulo antes de escribir código.
3. Implementar respetando tokens; si falta un token, proponerlo y documentarlo.
4. Verificar responsive en 390 / 768 / 1024 / 1440 px.
5. Ejecutar `npm run typecheck` y `npm run lint`.
6. Reportar qué cambió, qué no se pudo verificar y qué supuestos se tomaron.
