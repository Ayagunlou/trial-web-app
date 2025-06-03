import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ModalComponent } from "../components/ModalComponent";
import { TypeAlert } from "../constants/constants";
import { AlertMessage } from "../components/AlertMessage";
import Cart from "../components/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const tempImage = "../src/assets/Earn Star Rail Passes and Star Rail Special Passes in Honkai Star Rail.jpg";
  const tempImage2 = "../src/assets/Java-Emblem.jpg";
  const tempImage3 = "../src/assets/486957113_1793738588075778_7917203237798573927_n.jpg";
  const categories = ["All", "Clothing", "Accessories", "Shoes"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const listProductMock = [
          {
            id: 1,
            name: "Cool T-Shirtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
            description:
              "100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit100% Cotton, Comfortable fit. 100% Cotton, Comfortable fit 100% Cotton, Comfortable fit  100% Cotton, Comfortable fit 100% Cotton, Comfortable fit",
            price: 19.99,
            imageUrl: tempImage,
            category: "Clothing",
          },
          {
            id: 2,
            name: "Stylish Jeans",
            description: "Slim fit, stretchy denim.",
            price: 49.99,
            imageUrl: tempImage2,
            category: "Clothing",
          },
          {
            id: 3,
            name: "Running Shoes",
            description: "Lightweight with breathable mesh.",
            price: 89.99,
            imageUrl: tempImage,
            category: "Clothing",
          },
          {
            id: 4,
            name: "Baseball Cap",
            description: "Adjustable fit, 100% cotton.",
            price: 14.99,
            imageUrl: tempImage3,
            category: "Clothing",
          },
          {
            id: 5,
            name: "Leather Jacket",
            description: "Genuine leather, modern cut.",
            price: 199.99,
            imageUrl: tempImage2,
            category: "Shoes",
          },
          {
            id: 6,
            name: "Casual Shorts",
            description: "Breathable and comfortable.",
            price: 24.99,
            imageUrl: tempImage,
            category: "Shoes",
          },
          {
            id: 7,
            name: "Hoodie",
            description: "Fleece-lined, great for cold weather.",
            price: 39.99,
            imageUrl: tempImage3,
            category: "Shoes",
          },
          {
            id: 8,
            name: "Sunglasses",
            description: "UV protection, polarized lenses.",
            price: 29.99,
            imageUrl: tempImage2,
            category: "Shoes",
          },
          {
            id: 9,
            name: "Backpack",
            description: "Water-resistant, multiple compartments.",
            price: 59.99,
            imageUrl: tempImage,
            category: "Accessories",
          },
          {
            id: 10,
            name: "Wristwatch",
            description: "Analog display, leather strap.",
            price: 89.99,
            imageUrl: tempImage2,
            category: "Accessories",
          },
        ];
        setProducts(listProductMock);
        // const res = await axios.get('/products');
        // setProducts(res.data);
      } catch (err) {
        setAlertMsg({ typeAlert: TypeAlert.ERROR, message: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Detect screen size for responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsCartOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setAlertMsg(null);
  };

  const closeProductDetailsModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  const onAcceptProductDetailsModal = () => {
    console.log("Accepted product:", selectedProduct.name);
    handleAddToCart(selectedProduct);
  };
  const onDeclineProductDetailsModal = () => {
    console.log("Declined product:", selectedProduct.name);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {alertMsg && (
        <AlertMessage type={alertMsg.typeAlert} msg={alertMsg.message} />
      )}

      <main className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product List */}
          <div className={`flex-1 ${!isMobile ? "lg:mr-[350px]" : ""}`}>
            <div className="flex flex-row w-full mb-6 items-center">
              <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold flex-1">
                ✨ Featured Products
              </h2>

              {/* ปุ่มเปิด Cart เฉพาะ Mobile */}
              {isMobile && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base py-2 px-4 rounded-full ms-4"
                >
                  View Cart ({cart.reduce((sum, p) => sum + p.quantity, 0)})
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6 flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center text-gray-500">
                Loading products...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 bg-white"
                  >
                    <img
                      src={
                        product.imageUrl ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl mb-3"
                    />
                    <h3 className="text-xl text-gray-600 font-semibold mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-green-600 mb-2">
                      ฿{product.price}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => openProductDetailsModal(product)}
                        className="text-indigo-600 hover:underline text-sm self-center"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: show Cart fixed right */}
          {!isMobile && (
            <div className="fixed top-24 right-4 h-[calc(100vh-6rem)] w-[350px] p-6 bg-white shadow-xl rounded-l-2xl overflow-auto z-50">
              <Cart products={cart} onUpdateCart={setCart} isMobile={false} />
            </div>
          )}
        </div>

        {/* Mobile: Cart modal */}
        {isMobile && isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full h-full rounded-2xl relative overflow-auto p-6">
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 right-4 text-gray-700 font-bold text-3xl"
                aria-label="Close Cart"
              >
                ×
              </button>
              <Cart
                products={cart}
                onUpdateCart={setCart}
                onClose={() => setIsCartOpen(false)}
                isMobile={true}
              />
            </div>
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
            ฿{selectedProduct.price}
          </p>
        </ModalComponent>
      )}
    </div>
  );
};

export default Home;
