import type { Pizza } from '../domain/pizza';

/**
 * Catálogo de especialidades. Contenido validado contra la referencia de Stitch.
 * Cuando exista CMS o API, esta implementación se reemplaza sin tocar la UI.
 */
export const specialties: readonly Pizza[] = [
  {
    id: 'dorada-suprema',
    name: 'Dorada Suprema',
    description:
      'Salsa pomodoro rústica de San Marzano, mozzarella fior di latte fresco, finas lonchas de prosciutto di Parma, arúgula silvestre y reducción balsámica de higos macerados.',
    price: 18900,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqUWQvasJnB93deoC6E8GAQ1eJj0PxsrrZME9EnRbe8XfOM5OA95m-1MVDnfd6N037-Y87ug7jfOeW4GQpl1QcHA4UL5Rw7uHypgldJSGZMZslTXp8-f-aDAzzBGCTkfIZUkL8xuXApqAa7odi2Nl8ZgLFFWJ9gxx3yWGVBXgN2nMPENVD9i_BKJjFjYwko5L8P6e05zHbwA4GqEZrEkjk3_GGY6gOeeodNmwKtIiE',
    badge: 'Favorita de la Casa',
    note: 'Borde Dorado Inflado',
  },
  {
    id: 'trufa-4-quesos',
    name: 'Trufa & 4 Quesos',
    description:
      'Base bianca con crema de leche fresca, gorgonzola dulce de montaña, fontina curado, lluvia de Parmigiano Reggiano 24 meses y gotas aromáticas de aceite de trufa blanca pura.',
    price: 19500,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBy8IF4Gq0tFVmRHkJOFgD18ThphQH4H1SXz_J0_POHRW_tpLMnsFD7HIcuSqj5Srl2uNUtFH7WyeSylb_h-UWYNAqL04SH9P-W-u1qQZsBKyM9WUBmBQEFMVjYu2WSHjcHdGKpfGazjWgsBqOB3-GCfLd05DUZl1650esH7fg3qqaAup6TmDjPKjEEasyq73JQIJ1Dbq6Ikx4zLmRJTbeL3aSFbMZpYuyYv681v7wK',
    badge: 'Gourmet Selección',
    note: 'Edición de Autor',
  },
  {
    id: 'rustica-huerta',
    name: 'Rústica Huerta',
    description:
      'Verduras asadas al carbón de encina (berenjenas, calabacines y pimientos confitados), aceitunas Kalamata griegas, albahaca de corte fresco y aceite de oliva virgen extra temprano.',
    price: 16800,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhLdiTsPNdxxUuapT8Fc-qUsHuTyzSgt2MEHE2OQs8C37shAyD8zCP67WbdYNRwybRkqFFu-dvqyVcIcqCtI2O1MxCggEZp3XTuy-wFF8aW9MGpLfFkS9fgXPOtKpdkJy1QKmREznwttVIG7l4TRx8Cl3gta6uk4nVUKeuRJ97lzJreE5Joa08wDvxQiS8YBPAAF97tnN71DcxZRz9q9LvVZ_w3RRcy_gsFOnqGU0u',
    badge: '100% Veggie Fresca',
    note: 'Ingredientes Bio',
  },
  {
    id: 'diavola-ahumada',
    name: 'Diávola Ahumada',
    description:
      'Pepperoni curado artesanal en copas crujientes, salame picante calabrés, mozzarella fior di latte y nuestro adictivo glaseado final de miel picante caliente con peperoncino.',
    price: 17900,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDu_vn0gyEp9ElPC9A9eYOeA4_BwnIfYM81_HjPtVw0wgZfiOqcq5t60TuCH5Sb5tV7dReT59GaHh3Lk3G4bwnIXzcdkOdHklR2aqZB6VKDpnFCZEFuvgsNp8YmXheJsNAt02GdbsW7jLK6pRoGl_38OU9IqruF5uz581rsxwT3cHZ4aGpzKx-mvhMd-koF6fwGqYj0WPMAqRvmS8dXilnyTaExubZLu5AfZb5pI7fY',
    badge: 'Picante & Crujiente',
    note: 'Toque Picante',
  },
];
