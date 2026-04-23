'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Home',     zh: '家', href: '/' },
  { label: 'Shop',     zh: '店', href: '/search' },
  { label: 'Object',   zh: '物', href: '/search?view=object' },
  { label: 'Lookbook', zh: '册', href: '/lookbook' },
  { label: 'Studio',   zh: '说', href: '/about' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="nav__links">
      {NAV.map((item, i) => {
        const active =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link key={item.href} href={item.href} className={`nav__link${active ? ' active' : ''}`}>
            <span style={{ opacity: 0.4, marginRight: 8 }}>0{i + 1}</span>
            {item.label}
            <span style={{ opacity: 0.55, marginLeft: 8, fontFamily: 'Noto Serif SC, serif', fontSize: 11 }}>
              {item.zh}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
