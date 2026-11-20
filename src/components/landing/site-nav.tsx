'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';

const links = [
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#ritual-artesanal', label: 'El Ritual' },
  { href: '#como-llega-la-magia', label: '¿Cómo llega la magia?' },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav aria-label="Navegación principal" className="hidden items-center gap-lg lg:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active === link.href ? 'location' : undefined}
            className={cn(
              'type-label-lg transition-colors duration-150 hover:text-primary',
              active === link.href ? 'text-primary' : 'text-on-surface-variant',
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-outline-variant text-on-surface lg:hidden"
      >
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 animate-fade-in bg-inverse-surface/60 backdrop-blur-sm lg:hidden"
          />,
          document.body,
        )}

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-16 z-50 border-b border-outline-variant/60 bg-surface p-margin shadow-e2 lg:hidden"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? 'location' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center type-title-md transition-colors duration-150',
                  active === link.href ? 'text-primary' : 'text-on-surface',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
