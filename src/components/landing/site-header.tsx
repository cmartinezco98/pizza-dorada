import Image from 'next/image';
import { site } from '@/shared/config/site';
import { SiteNav } from './site-nav';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant/40 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-md px-margin md:px-margin-desktop">
        <a href="#inicio" className="flex min-h-11 items-center gap-sm">
          <Image
            src="/logo-header-trim.png"
            alt=""
            width={171}
            height={148}
            priority
            className="h-11 w-auto shrink-0"
          />
          <span className="flex flex-col leading-none">
            <span className="type-headline-sm text-on-surface">{site.name}</span>
            <span className="type-label-sm text-secondary">Pizza Artesanal</span>
          </span>
        </a>

        <SiteNav />
      </div>
    </header>
  );
}
