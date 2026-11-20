import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { FloatingOrderButton } from '@/components/landing/floating-order-button';
import { AutoVideo } from '@/components/landing/auto-video';
import { Reveal } from '@/components/landing/reveal';
import { getSpecialties } from '@/modules/menu/application/get-menu';
import { SpecialtyCard } from '@/modules/menu/presentation/components/specialty-card';
import { CoverageZones } from '@/modules/coverage/presentation/components/coverage-zones';
import { site, whatsappLink } from '@/shared/config/site';
import { heroVideoSrc, ritualVideoSrcs } from '@/shared/config/media';

const ritualSteps = [
  {
    phase: 'Fase 01',
    title: 'Amasado y Estirado Manual',
    body: 'Estirado suave sobre lluvia de sémola rimacinata para empujar el aire hacia el borde, preservando la estructura alveolar que garantiza un crocante ligero y digestivo.',
    note: 'Alvéolos intactos',
    video: ritualVideoSrcs.amasado,
  },
  {
    phase: 'Fase 02',
    title: 'Espiral de Pomodoro & Fior di Latte',
    body: 'Salsa rústica triturada a mano esparcida en espiral armónica, desgarre de mozzarella fresca bien escurrida y hojas enteras de albahaca fresca del día.',
    note: 'Montaje al minuto',
    video: ritualVideoSrcs.montaje,
  },
  {
    phase: 'Fase 03',
    title: 'Fuego Vivo: 90 s a 450 °C',
    body: 'Entrada a la cúpula de fuego donde la llama dora la cornisa en segundos, logrando el característico moteado “leopard spots” sin resecar la masa ni quemar el queso.',
    note: 'Corteza leopard',
    video: ritualVideoSrcs.fuego,
  },
] as const;

const howItWorksBase = [
  {
    step: '01',
    title: 'Mira nuestra Carta Externa',
    body: 'Catálogo digital con fotos reales de cada ingrediente, promociones activas y selector de mitades personalizadas.',
    link: 'Carta digital',
  },
  {
    step: '02',
    title: 'Haz tu Pedido en 1 Clic',
    body: 'Envía tu pedido por WhatsApp oficial o por la pasarela express, sin registros molestos ni contraseñas.',
    link: 'Confirmación instantánea',
  },
  {
    step: '03',
    title: 'Empaque Térmico “Hot-Gold”',
    body: 'Caja alveolar con ranuras de evacuación de humedad y sello de seguridad: masa crocante, queso elástico y pizza caliente.',
    link: 'Garantía térmica a la puerta',
  },
] as const;

export default function HomePage() {
  const specialties = getSpecialties();
  const orderHref = whatsappLink('Hola, quiero pedir una pizza a domicilio') ?? '#especialidades';
  const menuHref = site.menuUrl;
  const secondaryHref = menuHref ?? '#especialidades';
  const secondaryLabel = menuHref ? 'Ver carta completa' : 'Ver especialidades';
  const howItWorks = [
    menuHref
      ? howItWorksBase[0]
      : {
          step: '01',
          title: 'Explora nuestras especialidades',
          body: 'Cuatro especialidades de autor con fotos, ingredientes y precios a la vista.',
          link: 'Disponible en esta página',
        },
    howItWorksBase[1],
    howItWorksBase[2],
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.description,
    servesCuisine: 'Pizza artesanal',
    ...(site.whatsappNumber ? { telephone: `+${site.whatsappNumber}` } : {}),
    areaServed: ['Mosquera', 'Funza', 'Madrid'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressCountry: 'CO',
    },
    openingHours: site.hours,
  };

  return (
    <>
      <SiteHeader />

      <main id="inicio" className="pt-16">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <AutoVideo src={heroVideoSrc} className="absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-inverse-surface/70 via-inverse-surface/55 to-inverse-surface/40 md:bg-gradient-to-r md:from-inverse-surface/85 md:via-inverse-surface/60 md:to-inverse-surface/35"
          />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-page flex-col justify-center gap-xl px-margin py-xl md:px-margin-desktop">
            <div className="flex max-w-content flex-col gap-md">
              <p className="flex items-center gap-sm type-label-sm text-secondary-fixed-dim">
                <span className="inline-block size-1.5 rounded-full bg-brand-oro" aria-hidden="true" />
                Naturaleza, tradición y calidad · 100% domicilios
              </p>
              <h1 className="type-hero text-surface-bright">
                La verdadera pizza artesanal{' '}
                <span className="text-secondary-fixed-dim">crujiente, dorada</span> y caliente en tu puerta.
              </h1>
              <p className="max-w-prose type-body-md text-inverse-on-surface/85">
                Masa madre natural fermentada 48 horas, salsa rústica de tomates San Marzano D.O.P. y
                queso fior di latte fundido sobre piso de piedra volcánica.
              </p>
              <div className="flex flex-col gap-sm sm:flex-row">
                <a
                  href={orderHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary-container px-lg py-md type-label-lg text-on-primary shadow-cta transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Pedir a Domicilio Ahora
                </a>
                <a
                  href={secondaryHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-control border border-brand-oro bg-surface-bright/10 px-lg py-md type-label-lg text-surface-bright backdrop-blur-sm transition-colors duration-150 hover:bg-surface-bright/20"
                >
                  {secondaryLabel}
                </a>
              </div>
              <p className="type-body-sm text-inverse-on-surface/70">
                Horno de piedra a 450 °C · Reparto en 25–45 min según municipio · Masa madre 48 h
              </p>
            </div>

            <CoverageZones />
          </div>
        </section>

        {/* Especialidades */}
        <section id="especialidades" className="w-full bg-surface py-xl lg:py-2xl">
          <div className="mx-auto w-full max-w-page px-margin md:px-margin-desktop">
            <Reveal className="mx-auto mb-xl flex max-w-content flex-col items-center gap-sm text-center">
              <p className="type-label-sm text-secondary">Selección maestra</p>
              <h2 className="type-headline-lg-mobile text-on-surface md:type-headline-lg">
                Nuestras 4 especialidades de autor
              </h2>
              <p className="type-body-md text-on-surface-variant">
                Cada receta se hornea en 90 segundos sobre piedra viva para conservar la elasticidad
                interior y el crocante dorado exterior.
              </p>
            </Reveal>

            <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
              {specialties.map((pizza, index) => (
                <Reveal key={pizza.id} delay={index * 80} className="h-full">
                  <SpecialtyCard
                    pizza={pizza}
                    orderHref={
                      whatsappLink(`Hola, quiero pedir la ${pizza.name}`) ?? '#especialidades'
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ritual artesanal */}
        <section
          id="ritual-artesanal"
          className="scroll-mt-20 border-y border-outline-variant/50 bg-gradient-to-b from-surface-container via-surface-container-high to-surface-container py-xl lg:py-2xl"
        >
          <div className="mx-auto w-full max-w-page px-margin md:px-margin-desktop">
            <Reveal className="mb-xl flex max-w-content flex-col gap-sm">
              <p className="type-label-sm text-secondary">El ritual artesanal en vivo</p>
              <h2 className="type-headline-lg-mobile text-on-surface md:type-headline-lg">
                De nuestras manos a tu mesa: el proceso en vivo
              </h2>
            </Reveal>

            <div className="grid gap-lg lg:grid-cols-3">
              {ritualSteps.map((step, index) => (
                <Reveal key={step.phase} delay={index * 80} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-card border border-brand-oro/25 bg-surface-container-lowest shadow-e1">
                    <div className="relative aspect-square w-full overflow-hidden bg-surface-container">
                      <AutoVideo src={step.video} className="absolute inset-0" />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-b from-inverse-surface/55 via-inverse-surface/40 to-inverse-surface/25"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-sm p-lg">
                      <span className="type-label-sm text-secondary">{step.phase}</span>
                      <h3 className="type-headline-sm text-on-surface">{step.title}</h3>
                      <p className="type-body-md text-on-surface-variant">{step.body}</p>
                      <span className="mt-auto type-label-md text-tertiary">{step.note}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section
          id="como-llega-la-magia"
          className="scroll-mt-20 border-b border-outline-variant/50 bg-surface py-xl lg:py-2xl"
        >
          <Reveal className="mx-auto flex w-full max-w-page flex-col gap-xl px-margin md:px-margin-desktop">
            <div className="flex max-w-content flex-col gap-sm">
              <p className="type-label-sm text-secondary">Cero esperas innecesarias</p>
              <h2 className="type-headline-lg-mobile text-on-surface md:type-headline-lg">
                ¿Cómo llega la magia?
              </h2>
            </div>

            <ol className="grid gap-lg lg:grid-cols-3">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className="flex h-full flex-col gap-sm rounded-card bg-surface-container-lowest p-lg shadow-e1"
                >
                  <span className="type-display-lg-mobile font-display text-brand-oro">
                    {item.step}
                  </span>
                  <h3 className="type-title-lg text-on-surface">{item.title}</h3>
                  <p className="type-body-md text-on-surface-variant">{item.body}</p>
                  <span className="mt-auto type-label-md text-tertiary">{item.link}</span>
                </li>
              ))}
            </ol>

            <div
              id="garantia-caliente"
              className="grid scroll-mt-20 items-center gap-xl rounded-panel bg-inverse-surface p-xl text-inverse-on-surface shadow-e3 lg:grid-cols-2 lg:p-2xl"
            >
              <div className="flex flex-col gap-sm">
                <p className="type-title-lg text-secondary-fixed-dim">Sello de oro</p>
                <h2 className="type-headline-lg-mobile md:type-headline-lg">
                  Así llega nuestro sabor a tu mesa
                </h2>
                <p className="type-body-md text-inverse-on-surface/80">
                  Caja de triple canal con válvulas anticondensación, bolsas térmicas y sello
                  numerado: el vapor sale, el calor y el sabor se quedan.
                </p>

                <ul className="mt-md flex flex-wrap gap-xl">
                  {[
                    {
                      label: 'Calidad',
                      icon: (
                        <>
                          <circle cx="12" cy="9" r="5" />
                          <path d="M9 13.5 7 21l5-3 5 3-2-7.5" />
                        </>
                      ),
                    },
                    {
                      label: 'Frescura',
                      icon: (
                        <>
                          <path d="M20 4c-8 0-14 5-14 12 7 0 12-4 14-12Z" />
                          <path d="M6 20c2-5 6-8 10-9" />
                        </>
                      ),
                    },
                    {
                      label: 'Sabor',
                      icon: (
                        <path d="M12 3c.5 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.8 2.6-5.4.4 1.6 1.3 2.2 2.4 2.2 0-2.3 0-4.6 0-6.8Z" />
                      ),
                    },
                  ].map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-sm type-title-md text-secondary-fixed-dim"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </svg>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-sm sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['Cajas con válvula', 'Eliminan el vapor para que la masa nunca se ablande.'],
                  ['Bolsas a 75 °C', 'Mochilas con placas térmicas activas en cada trayecto.'],
                  ['Sello inviolable', 'Sticker de seguridad numerado que solo tú rompes.'],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-card bg-surface-bright/5 p-md shadow-dark">
                    <p className="type-label-lg">{title}</p>
                    <p className="type-body-sm text-inverse-on-surface/75">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Pedido */}
        <section
          id="pedir"
          className="relative overflow-hidden bg-inverse-surface py-xl text-surface-bright lg:py-2xl"
        >
          <Reveal className="mx-auto flex w-full max-w-page flex-col items-start gap-lg px-margin md:px-margin-desktop">
            <h2 className="max-w-content type-display-lg-mobile md:type-display-lg">
              Hoy no se cocina: se disfruta una auténtica{' '}
              <span className="text-secondary-fixed-dim">Pizza Dorada</span>.
            </h2>
            <p className="max-w-content type-body-lg text-inverse-on-surface/80">
              Elige entre pedir en un minuto con asistencia directa o explorar nuestras especialidades
              con fotos e ingredientes.
            </p>
            <div className="flex flex-col gap-sm sm:flex-row">
              <a
                href={orderHref}
                className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary-container px-lg py-md type-label-lg text-on-primary shadow-cta transition-transform duration-150 hover:-translate-y-0.5"
              >
                Pedir por WhatsApp
              </a>
              <a
                href={secondaryHref}
                className="inline-flex min-h-11 items-center justify-center rounded-control border border-brand-oro px-lg py-md type-label-lg text-surface-bright transition-colors duration-150 hover:bg-surface-bright/10"
              >
                {secondaryLabel}
              </a>
            </div>
            <p className="type-body-sm text-inverse-on-surface/60">
              Efectivo, tarjetas o transferencia · Masa madre 100% natural sin levaduras químicas
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />

      <FloatingOrderButton
        orderHref={orderHref}
        menuHref={secondaryHref}
        menuLabel={menuHref ? 'Ver menú' : 'Ver especialidades'}
      />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
