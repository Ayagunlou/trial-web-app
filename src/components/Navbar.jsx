import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, username } = useAuth(); // เพิ่ม user ถ้าต้องการแสดงชื่อ

  return (
    <header className="bg-white shadow px-6 py-4">
      <div className="w-full flex justify-between items-center px-4">
        {/* ซ้าย: ลิงก์เมนู */}
        <nav className="flex space-x-4">
          <Link to="/" className="text-gray-800 hover:text-indigo-600">
            Home
          </Link>
        </nav>

        {/* ขวา: Login/Logout + User */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">{username || "User"}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
