'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'الرئيسية' },
    { href: '/categories', label: 'الفئات' },
    { href: '/courses', label: 'الدروس' },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>📚</span>
            <div>
              <span className={styles.logoMain}>السند في النصوص والنقد </span>
            </div>
          </Link>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/admin" className="btn btn-primary btn-sm">
              لوحة الإدارة
            </Link>
            <button
              className={styles.burger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
