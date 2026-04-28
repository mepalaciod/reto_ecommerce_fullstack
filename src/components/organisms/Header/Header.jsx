import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';
import logo from '../../../assets/Logo-posaTa-Full-color.png';

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function Header() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    joinClassNames(
      'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 relative',
      isActive(path) 
        ? 'bg-brand-green text-white shadow-dna' 
        : 'text-white hover:text-white/80 group'
    );

  return (
    <header className="sticky top-0 z-50 bg-brand-green shadow-dna">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex flex-shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-base font-black text-brand-dark shadow-md hover:shadow-lg transition-shadow">
            P
          </span>
          <div className="leading-tight flex flex-col items-start">
            <img src={logo} alt="POSATA" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            <span className="sr-only">Beauty Store</span>
          </div>
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden items-center gap-1 md:flex ml-auto">
          <Link to="/gallery" className={joinClassNames('nav-link', isActive('/gallery') ? 'active' : '')}>
            📚 Gallery
          </Link>
          <Link to="/cart" className={joinClassNames('nav-link relative', isActive('/cart') ? 'active' : '')}>
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-dark">
                {totalItems}
              </span>
            )}
          </Link>
          {loggedInUser ? (
            <Link to="/profile" className={joinClassNames('nav-link', isActive('/profile') ? 'active' : '')}>
              👤 Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className={joinClassNames('nav-link', isActive('/login') ? 'active' : '')}>
                🔓 Login
              </Link>
              <Link to="/register" className={joinClassNames('nav-link', isActive('/register') ? 'active' : '')}>
                ✍️ Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto flex items-center gap-3">
          <Link to="/cart" className="relative inline-flex items-center px-2 py-2 text-white hover:text-white/80 transition-colors">
            <span className="text-lg">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-brand-dark">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}