import { useState } from "react";

export default function Cart({ products = [], onUpdateCart }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleRemove = (id) => {
    const updated = products.filter((p) => p.id !== id);
    onUpdateCart?.(updated);
  };

  const updateQuantity = (id, delta) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
    );
    onUpdateCart?.(updated);
  };

  const totalPrice = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl w-full">
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">
        🛒 ตะกร้าสินค้า
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 p-4 rounded-lg shadow flex flex-col gap-2"
            >
              <h3 className="font-medium text-gray-500 truncate">
                {product.name}
              </h3>
              <div className="text-sm text-gray-600">
                ฿{product.price.toLocaleString()} x {product.quantity}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="ml-auto text-red-600 hover:underline text-sm"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-gray-500 font-semibold text-lg mt-4">
            รวมทั้งหมด: ฿{totalPrice.toLocaleString()}
          </div>

          {/* 🔹 ปุ่มจ่ายเงิน */}
          <div className="text-right">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              จ่ายเงิน
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Modal ชำระเงิน */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              ยืนยันการสั่งซื้อ
            </h3>
            <p className="text-gray-600 mb-4">
              รวมราคาสินค้า: ฿{totalPrice.toLocaleString()}
            </p>
            <button
              onClick={() => {
                alert("ดำเนินการชำระเงินเรียบร้อยแล้ว!");
                setIsCheckoutOpen(false);
                onUpdateCart?.([]);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
            >
              ยืนยันการจ่ายเงิน
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
