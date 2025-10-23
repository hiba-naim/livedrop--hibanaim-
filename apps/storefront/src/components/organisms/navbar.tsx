import { Link } from "react-router-dom";
import { useCart } from "../../lib/store";

export default function Navbar() {
  const items = useCart((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="bg-card shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      {/* 🏬 Logo / Home */}
      <Link to="/" className="text-2xl font-bold text-accent">
        Storefront
      </Link>

      <nav className="flex items-center gap-6">
        {/* 🧭 Admin Dashboard link */}
        <Link
          to="/admin"
          className="text-gray-800 hover:text-accent text-sm font-medium transition-transform hover:scale-105"
        >
          Admin Dashboard
        </Link>

        {/* 🛒 Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center gap-1 text-gray-800 hover:text-accent transition-transform hover:scale-110"
        >
          <img
            src="/shopping-cart.png" // 🖼️ Replace with your actual icon path if needed
            alt="Cart"
            className="w-7 h-7 object-contain"
          />

          {/* 🔢 Item count badge */}
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
