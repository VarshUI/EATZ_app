const Shimmer = () => {
  return (
    <>
      {/* Shimmer Buttons */}
      <div className="flex gap-4 mb-6">
        <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-24 h-8 bg-gray-300 animate-pulse rounded"></div>
      </div>

      {/* Shimmer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(9).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-300 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
};

export default Shimmer;
