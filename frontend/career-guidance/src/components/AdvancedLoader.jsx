const AdvancedLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>

      <p className="mt-4 text-lg font-semibold text-indigo-600 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default AdvancedLoader;
