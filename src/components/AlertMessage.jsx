import { useState, useEffect } from "react";

const AlertMessage = ({ message, type = "info", onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!onClose && duration) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  if (!visible || !message) {
    return null;
  }

  const baseClasses = "p-4 mb-4 text-sm rounded-lg shadow";
  const typeClasses = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300",
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}
      role="alert"
    >
      <span className="font-medium">{message}</span>
      {onClose && (
        <button
          type="button"
          className="absolute bg-transparent top-0 right-2 w-13 h-6 flex items-center justify-center rounded hover:bg-opacity-10 text-inherit transition"
          onClick={handleClose}
          aria-label="Close"
        >
          <span>X</span>
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
