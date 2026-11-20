/** Entidad de producto del menú. Sin dependencias de framework. */
export interface Pizza {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrl: string;
  readonly badge: string;
  readonly note: string;
}

export type PizzaId =
  | 'dorada-suprema'
  | 'trufa-4-quesos'
  | 'rustica-huerta'
  | 'diavola-ahumada';
