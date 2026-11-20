/** Reglas puras de cobertura de despacho por municipio. */

export interface DeliveryZone {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly eta: string;
  readonly detail: string;
  readonly perk: string;
}

export const deliveryZones: readonly DeliveryZone[] = [
  {
    id: 'mosquera',
    name: 'Mosquera',
    aliases: ['mosquera'],
    eta: '25-35 min',
    detail: 'Cobertura completa en avenidas principales, conjuntos y condominios cerrados.',
    perk: 'Envío bonificado sobre $25.000',
  },
  {
    id: 'funza',
    name: 'Funza',
    aliases: ['funza'],
    eta: '30-40 min',
    detail: 'Entregas en porterías, casas y oficinas con geolocalización.',
    perk: 'Rutas exclusivas en bicicleta eléctrica',
  },
  {
    id: 'madrid',
    name: 'Madrid',
    aliases: ['madrid'],
    eta: '35-45 min',
    detail: 'Despacho reforzado viernes a domingo con monitoreo térmico constante.',
    perk: 'Seguimiento por enlace en vivo',
  },
];

export const coverageMunicipalities = 'Mosquera, Funza y Madrid';

