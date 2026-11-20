import type { Pizza } from '../domain/pizza';
import { specialties } from '../infrastructure/menu.data';

/** Caso de uso: obtiene las especialidades publicadas del menú. */
export function getSpecialties(): readonly Pizza[] {
  return specialties;
}
