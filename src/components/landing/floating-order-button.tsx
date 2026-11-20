'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

interface FloatingOrderButtonProps {
  readonly orderHref: string;
  readonly menuHref: string;
  readonly menuLabel: string;
}

export function FloatingOrderButton({ orderHref, menuHref, menuLabel }: FloatingOrderButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 animate-fade-in bg-inverse-surface/60 backdrop-blur-sm"
        />
      )}

      <div
        ref={containerRef}
        className="fixed bottom-md right-md z-50 flex flex-col items-end gap-sm"
      >
      {open && (
        <div
          id="floating-order-menu"
          className="w-64 animate-toast-in rounded-panel border border-outline-variant/60 bg-surface-container-lowest p-sm shadow-e3"
        >
          <p className="px-sm pb-xs type-label-sm text-secondary">¿Cómo quieres pedir?</p>

          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-sm rounded-control p-sm transition-colors duration-150 hover:bg-surface-container"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tertiary-container text-on-tertiary">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-1.3 4c-.2 0-.5 0-.7.3-.2.3-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.5 2.4 3.7 3.3 1.8.7 2.2.6 2.6.6.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .2-1.1-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.6Z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="type-label-lg text-on-surface">WhatsApp</span>
              <span className="type-body-sm text-on-surface-variant">Pedir ahora</span>
            </span>
          </a>

          <a
            href={menuHref}
            className="flex items-center gap-sm rounded-control p-sm transition-colors duration-150 hover:bg-surface-container"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 8h6M9 12h6M9 16h4" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="type-label-lg text-on-surface">{menuLabel}</span>
              <span className="type-body-sm text-on-surface-variant">Carta y precios</span>
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="floating-order-menu"
        aria-label={open ? 'Cerrar opciones de pedido' : 'Abrir opciones de pedido'}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'group relative grid size-14 cursor-pointer place-items-center rounded-full bg-primary-container text-on-primary shadow-cta [perspective:500px]',
          'animate-fab transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-fab-hover transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        {open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-fire-glow rounded-full"
          />
        )}
        <span
          className={cn(
            'relative block size-10 [transform-style:preserve-3d] transition-transform duration-500 ease-soft will-change-transform',
            open ? 'rotate-y-180' : 'rotate-y-0',
          )}
        >
          <span
            className={cn(
              'absolute inset-0 grid place-items-center transition-all duration-300 ease-soft',
              open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
            )}
          >
            <svg aria-hidden="true" viewBox="0 0 64 64" className="size-10" fill="none">
              <path
                d="M3 28H12M1 35H10M4 42H13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect x="13" y="23" width="12" height="11" rx="2" fill="currentColor" />
              <circle cx="33" cy="12" r="5" fill="currentColor" />
              <path
                d="M34.5 11H38.5V13.5H34.5C33.8 13.5 33.5 13 33.5 12.25C33.5 11.5 33.8 11 34.5 11Z"
                fill="var(--color-primary-container)"
              />
              <path
                d="M29 19C29 17.8 30 17 31.2 17H34.5C35.5 17 36.4 17.6 36.8 18.5L39.5 24.5H44.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M28 20L27 31H35L35.5 21" fill="currentColor" />
              <path
                d="M14 36H34L39 24H44L47 32C48.5 32 49.5 33 49.5 34.5C49.5 35.3 49.1 36 48.5 36.4L52 36C54.2 36 56 37.8 56 40V43H13V38C13 36.9 13.9 36 14 36Z"
                fill="currentColor"
              />
              <path
                d="M42 24L45 19H48"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="46" r="6.5" stroke="currentColor" strokeWidth="3.5" />
              <circle cx="20" cy="46" r="2" fill="currentColor" />
              <circle cx="48" cy="46" r="6.5" stroke="currentColor" strokeWidth="3.5" />
              <circle cx="48" cy="46" r="2" fill="currentColor" />
            </svg>
          </span>

          <span
            className={cn(
              'absolute inset-0 grid place-items-center transition-all duration-300 ease-soft',
              open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
            )}
          >
            <svg aria-hidden="true" viewBox="0 0 64 64" className="size-10" fill="none">
              <path d="M27 8H37V11H35V16H29V11H27V8Z" fill="currentColor" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 43C12 29.5 21 19 32 19C43 19 52 29.5 52 43H42V36C42 30.5 37.5 26 32 26C26.5 26 22 30.5 22 36V43H12ZM22 25.5C24.5 23.8 28 22.8 32 22.8C36 22.8 39.5 23.8 42 25.5"
                fill="currentColor"
              />
              <path
                className="animate-flame"
                d="M32 30C32 30 36 33.5 36 37.5C36 39.8 34.2 41.5 32 41.5C29.8 41.5 28 39.8 28 37.5C28 36 28.8 34.5 29.5 33.5C29.5 35 30.5 35.8 31.2 35.8C30.8 33.8 32 30 32 30Z"
                fill="var(--color-secondary-container)"
              />
              <rect x="8" y="45" width="48" height="4" rx="1.5" fill="currentColor" />
              <path d="M11 49H17V57H11V49ZM47 49H53V57H47V49Z" fill="currentColor" />
              <circle cx="25" cy="54" r="2.5" fill="currentColor" />
              <circle cx="32" cy="54" r="2.5" fill="currentColor" />
              <circle cx="39" cy="54" r="2.5" fill="currentColor" />
              <circle cx="28.5" cy="50.5" r="2.2" fill="currentColor" />
              <circle cx="35.5" cy="50.5" r="2.2" fill="currentColor" />
            </svg>
          </span>
        </span>
      </button>
      </div>
    </>
  );
}
