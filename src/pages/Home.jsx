import { useEffect, useState } from "react";
//import axios from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const listProductMock = [
          {
            id: 1,
            name: "Cool T-Shirt",
            description: "100% Cotton, Comfortable fit.",
            price: 19.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 2,
            name: "Stylish Jeans",
            description: "Slim fit, stretchy denim.",
            price: 49.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 3,
            name: "Running Shoes",
            description: "Lightweight with breathable mesh.",
            price: 89.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 4,
            name: "Baseball Cap",
            description: "Adjustable fit, 100% cotton.",
            price: 14.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 5,
            name: "Leather Jacket",
            description: "Genuine leather, modern cut.",
            price: 199.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 6,
            name: "Casual Shorts",
            description: "Breathable and comfortable.",
            price: 24.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 7,
            name: "Hoodie",
            description: "Fleece-lined, great for cold weather.",
            price: 39.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 8,
            name: "Sunglasses",
            description: "UV protection, polarized lenses.",
            price: 29.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 9,
            name: "Backpack",
            description: "Water-resistant, multiple compartments.",
            price: 59.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
          {
            id: 10,
            name: "Wristwatch",
            description: "Analog display, leather strap.",
            price: 89.99,
            imageUrl: "https://via.placeholder.com/300x200",
          },
        ];
        setProducts(listProductMock);
        // const res = await axios.get('/products');
        // setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Product Section */}
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6">✨ Featured Products</h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 bg-white">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description?.slice(0, 60)}...</p>
                <p className="text-lg font-bold text-green-600 mb-2">${product.price}</p>
                <Link to={`/product/${product.id}`} className="text-indigo-600 hover:underline text-sm">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
