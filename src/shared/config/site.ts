/**
 * Datos de negocio del sitio.
 * TODO: confirmar dirección exacta con el cliente. El resto de datos ya está validado.
 */
export const site = {
  name: 'Pizza Dorada',
  tagline: 'Pizza artesanal al horno de piedra',
  description:
    'Pizza artesanal de masa madre fermentada 48 horas, horneada a 450 °C en piedra volcánica y entregada caliente en Mosquera, Funza y Madrid.',
  locale: 'es-CO',
  /** Número en formato internacional sin espacios (Colombia: 57 + 10 dígitos). */
  whatsappNumber: '573144353273' as string | null,
  /** TODO: agregar la URL de la carta digital cuando exista. */
  menuUrl: null as string | null,
  address: 'Calle Los Canteros #420',
  hours: '18:00 - 23:30',
} as const;

/** Devuelve el link de WhatsApp o `null` si el número aún no está configurado. */
export function whatsappLink(message: string): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Teléfono en formato legible para mostrar en pantalla. */
export function formatPhone(number: string): string {
  const digits = number.replace(/\D/g, '');
  if (digits.startsWith('57') && digits.length === 12) {
    return `+57 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  return `+${digits}`;
}
