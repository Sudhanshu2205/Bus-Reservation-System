import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="layout-root">
      <header className="site-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">QubicleBus</Link>
          </div>
          <nav className="main-nav">
            <Link
              to="/"
              className={pathname === '/' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/booking"
                className={
                  pathname === '/booking' ? 'nav-link active' : 'nav-link'
                }
              >
                My Bookings
              </Link>
            )}
          </nav>
          <div className="auth-nav">
            {user ? (
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={
                    pathname === '/login' ? 'nav-link active' : 'nav-link'
                  }
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={
                    pathname === '/register' ? 'nav-link active' : 'nav-link'
                  }
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="content-container">{children}</main>
    </div>
  );
}
