import Image from 'next/image';
import type { Pizza } from '../../domain/pizza';
import { formatCOP } from '@/shared/lib/format';

interface SpecialtyCardProps {
  readonly pizza: Pizza;
  readonly orderHref: string;
}

export function SpecialtyCard({ pizza, orderHref }: SpecialtyCardProps) {
  return (
    <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-card border border-brand-oro/25 bg-surface-container-lowest shadow-e1 transition-shadow duration-200 hover:shadow-e2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
        <Image
          src={pizza.imageUrl}
          alt={`Pizza ${pizza.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-md top-md rounded-full bg-secondary-container px-md py-xs type-label-sm text-on-secondary-fixed shadow-e1">
          {pizza.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-sm p-lg">
        <div className="flex items-start justify-between gap-md">
          <h3 className="type-headline-sm text-on-surface">{pizza.name}</h3>
          <p className="type-title-lg whitespace-nowrap text-primary">{formatCOP(pizza.price)}</p>
        </div>
        <p className="type-body-md text-on-surface-variant">{pizza.description}</p>
        <div className="mt-auto flex items-center justify-between gap-md pt-md">
          <span className="type-label-sm text-tertiary">{pizza.note}</span>
          <a
            href={orderHref}
            aria-label={`Pedir ${pizza.name}`}
            className="inline-flex min-h-11 items-center rounded-control bg-primary-container px-md type-label-lg text-on-primary shadow-cta transition-transform duration-150 hover:-translate-y-0.5"
          >
            Pedir Esta
          </a>
        </div>
      </div>
    </article>
  );
}
