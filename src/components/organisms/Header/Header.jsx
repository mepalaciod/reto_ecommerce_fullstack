import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function Header() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    joinClassNames(
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive(path) ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white shadow-sm">
            R
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold text-slate-900">Reto Fullstack</p>
            <p className="text-xs text-slate-500">Atomic Design storefront</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/gallery" className={navLinkClass('/gallery')}>
            Gallery
          </Link>
          {loggedInUser ? (
            <Link to="/profile" className={navLinkClass('/profile')}>
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className={navLinkClass('/login')}>
                Login
              </Link>
              <Link to="/register" className={navLinkClass('/register')}>
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            Menu
          </span>
        </div>
      </div>
    </header>
  );
}