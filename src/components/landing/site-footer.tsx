import { formatPhone, site, whatsappLink } from '@/shared/config/site';

export function SiteFooter() {
  const contactHref = whatsappLink('Hola, quiero consultar sobre un pedido') ?? '#pedir';
  const phone = site.whatsappNumber ? formatPhone(site.whatsappNumber) : null;

  return (
    <footer className="border-t border-outline-variant/50 bg-surface-container-low">
      <div className="mx-auto grid w-full max-w-page gap-xl px-margin py-xl md:grid-cols-3 md:px-margin-desktop">
        <div className="flex flex-col gap-sm">
          <p className="type-headline-sm text-on-surface">{site.name}</p>
          <p className="type-body-sm text-on-surface-variant">
            Taller culinario de pizza artesanal: masa madre de 48 horas y horneado en piedra
            volcánica.
          </p>
        </div>

        <div className="flex flex-col gap-xs">
          <p className="type-label-sm text-secondary">Contacto</p>
          <p className="type-body-md text-on-surface-variant">{site.address}</p>
          <p className="type-body-md text-on-surface-variant">Horario: {site.hours}</p>
          <p className="type-body-md text-on-surface-variant">
            Despacho: Mosquera, Funza y Madrid
          </p>
          {phone && (
            <a
              href={contactHref}
              className="inline-flex min-h-11 items-center type-label-md text-primary underline underline-offset-2"
            >
              WhatsApp {phone}
            </a>
          )}
        </div>

        <div className="flex flex-col gap-xs">
          <p className="type-label-sm text-secondary">Navegación</p>
          <a
            href="#especialidades"
            className="inline-flex min-h-11 items-center type-body-md text-on-surface-variant hover:text-primary"
          >
            Especialidades
          </a>
          <a
            href="#pedir"
            className="inline-flex min-h-11 items-center type-body-md text-on-surface-variant hover:text-primary"
          >
            Pedir ahora
          </a>
        </div>
      </div>

      <div className="border-t border-outline-variant/40">
        <p className="mx-auto w-full max-w-page px-margin py-md type-body-sm text-on-surface-variant md:px-margin-desktop">
          © {new Date().getFullYear()} {site.name}. Masa madre 100% natural sin levaduras químicas.
        </p>
      </div>
    </footer>
  );
}
