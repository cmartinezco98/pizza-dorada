import { deliveryZones } from '../../domain/coverage';

export function CoverageZones() {
  return (
    <div className="grid gap-md md:grid-cols-3">
      {deliveryZones.map((zone) => (
        <article
          key={zone.id}
          className="flex h-full flex-col gap-sm rounded-card border border-outline-variant/60 bg-surface-container-lowest p-lg shadow-e1"
        >
          <div className="flex items-baseline justify-between gap-sm">
            <h3 className="type-title-md text-on-surface">{zone.name}</h3>
            <span className="type-label-sm whitespace-nowrap rounded-full bg-secondary-container px-sm py-xs text-on-secondary-fixed">
              {zone.eta}
            </span>
          </div>
          <p className="type-body-md text-on-surface-variant">{zone.detail}</p>
          <p className="mt-auto type-label-md text-tertiary">{zone.perk}</p>
        </article>
      ))}
    </div>
  );
}
