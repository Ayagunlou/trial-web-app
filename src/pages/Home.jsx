import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { ModalComponent } from "../components/ModalComponent";
import { TypeAlert } from "../constants/constants";
import { AlertMessage } from "../components/AlertMessage.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const tempImage = "../src/assets/image.png";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const listProductMock = [
          {
            id: 1,
            name: "Cool T-Shirt",
            description:
              "100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit",
            price: 19.99,
            imageUrl: tempImage,
          },
          {
            id: 2,
            name: "Stylish Jeans",
            description: "Slim fit, stretchy denim.",
            price: 49.99,
            imageUrl: tempImage,
          },
          {
            id: 3,
            name: "Running Shoes",
            description: "Lightweight with breathable mesh.",
            price: 89.99,
            imageUrl: tempImage,
          },
          {
            id: 4,
            name: "Baseball Cap",
            description: "Adjustable fit, 100% cotton.",
            price: 14.99,
            imageUrl: tempImage,
          },
          {
            id: 5,
            name: "Leather Jacket",
            description: "Genuine leather, modern cut.",
            price: 199.99,
            imageUrl: tempImage,
          },
          {
            id: 6,
            name: "Casual Shorts",
            description: "Breathable and comfortable.",
            price: 24.99,
            imageUrl: tempImage,
          },
          {
            id: 7,
            name: "Hoodie",
            description: "Fleece-lined, great for cold weather.",
            price: 39.99,
            imageUrl: tempImage,
          },
          {
            id: 8,
            name: "Sunglasses",
            description: "UV protection, polarized lenses.",
            price: 29.99,
            imageUrl: tempImage,
          },
          {
            id: 9,
            name: "Backpack",
            description: "Water-resistant, multiple compartments.",
            price: 59.99,
            imageUrl: tempImage,
          },
          {
            id: 10,
            name: "Wristwatch",
            description: "Analog display, leather strap.",
            price: 89.99,
            imageUrl: tempImage,
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

  const handleButtonClick = async () => {
    try {
      const res = await axios.post("/test/hello", {});
      setAlertMsg({
        typeAlert: TypeAlert.SUCCESS,
        message: res.data,
      });
    } catch (error) {
      setAlertMsg({
        typeAlert: TypeAlert.WARNING,
        message: error.response?.data.error,
      });
    }
  };

  const openProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log("Modal open");
    setAlertMsg(null);
  };

  const closeProductDetailsModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    console.log("Modal closed");
  };
  const onAcceptProductDetailsModal = () => {
    console.log("Accepted product:", selectedProduct.name);
  };
  const onDeclineProductDetailsModal = () => {
    console.log("Declined product:", selectedProduct.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar */}
      <Navbar />
      {alertMsg && (
        <AlertMessage type={alertMsg.typeAlert} msg={alertMsg.message} />
      )}
      {/* 🔹 Product Section */}
      <main className="p-6">
        <div className="flex flex-row w-full mb-6">
          <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold">
            ✨ Featured Products
          </h2>

          <button
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base py-2 px-4 rounded-full ms-4"
          >
            Button
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 bg-white"
              >
                <img
                  src={
                    product.imageUrl || "https://via.placeholder.com/300x200"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3 className="text-xl text-gray-600 font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-green-600 mb-2">
                  ${product.price}
                </p>
                <button
                  onClick={() => openProductDetailsModal(product)}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ModalComponent: แสดงรายละเอียดสินค้า */}
      {selectedProduct && (
        <ModalComponent
          show={isModalOpen}
          onClose={closeProductDetailsModal}
          onAccept={onAcceptProductDetailsModal}
          onDecline={onDeclineProductDetailsModal}
          textHeader={selectedProduct.name}
        >
          <img
            src={selectedProduct.imageUrl || tempImage}
            alt={selectedProduct.name}
            className="w-full h-60 object-cover rounded-xl mb-4"
          />
          <p className="text-text-white text-sm mb-2">
            {selectedProduct.description}
          </p>
          <p className="text-lg font-bold text-green-300">
            ${selectedProduct.price}
          </p>
        </ModalComponent>
      )}
    </div>
  );
};

export default Home;
