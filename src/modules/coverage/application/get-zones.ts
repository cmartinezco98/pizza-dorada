import { coverageMunicipalities, deliveryZones } from '../domain/coverage';

/** Caso de uso: municipios con cobertura activa. */
export function getCoverageSummary(): string {
  return coverageMunicipalities;
}

/** Caso de uso: zonas de despacho publicadas. */
export function getDeliveryZones() {
  return deliveryZones;
}
