const Spinner = ({ size = "md", color = "indigo-600", classSpinner }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={
        classSpinner
          ? classSpinner
          : "fixed inset-0 flex justify-center items-center"
      }
    >
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 border-${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
