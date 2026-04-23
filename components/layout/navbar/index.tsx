import CartModal from 'components/cart/modal';
import Link from 'next/link';
import { Announce } from './announce';
import { NavLinks } from './nav-links';

function Logo() {
  return (
    <div className="nav__logo">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
        <circle cx="11" cy="11" r="10" fill="var(--cinnabar)" />
        <circle cx="11" cy="11" r="10" fill="none" stroke="var(--fg)" strokeOpacity=".12" />
      </svg>
      <span style={{ letterSpacing: '-0.01em' }}>KPCTY</span>
      <span className="zh">刻线</span>
    </div>
  );
}

export async function Navbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <Announce />
      <nav className="nav">
        <div className="kpcty-container nav__row">
          <NavLinks />
          <Link href="/" prefetch={true} style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <div className="nav__right">
            <a
              className="nav__link"
              href="/search"
              title="Search (⌘K)"
            >
              ⌕ <span style={{ opacity: 0.55 }}>⌘K</span>
            </a>
            <a className="nav__link" href="/account">Account</a>
            <CartModal />
          </div>
        </div>
      </nav>
    </header>
  );
}
