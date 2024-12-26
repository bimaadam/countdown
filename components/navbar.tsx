// components/navbar.tsx
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <button className="text-white">Bima Adam 💖</button>
        </li>
        <li>
          <button className="text-white">Ririn Setiawati 💖</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;