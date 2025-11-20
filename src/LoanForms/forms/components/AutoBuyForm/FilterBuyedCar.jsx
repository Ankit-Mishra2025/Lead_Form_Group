import React, { useEffect, useState } from "react";

const FilterBuyedCar = () => {
  const [BuyCarData, setBuyCarData] = useState(null);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
  });

  // Fetch Data
  useEffect(() => {
    const carFetchData = async () => {
      try {
        const res = await fetch("/AutoBuyData.json");
        const carResult = await res.json();
        setBuyCarData(carResult[0]);
      } catch (error) {
        console.log("Data not fetched", error);
      }
    };
    carFetchData();
  }, []);

  // Handle input change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Dynamically get models
  const selectedBrandObj = BuyCarData?.brands.find(
    (b) => b.name === filters.brand
  );
  const availableModels = selectedBrandObj?.models || [];

  return (
    <div className="w-full min-h-screen flex gap-2 relative top-10">
      <div className="w-80 bg-gray-100 py-3 px-3 rounded-md space-y-4">
        <h2 className="text-gray-900 font-semibold">Filters</h2>

        {/* Brand Select */}
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Brand</option>
          {BuyCarData?.brands.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </select>

        {/* Model Select */}
        <select
          value={filters.model}
          onChange={(e) => handleFilterChange("model", e.target.value)}
          disabled={!filters.brand}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Model</option>
          {availableModels.map((model, i) => (
            <option key={i}>{model}</option>
          ))}
        </select>

        {/* Year Select */}
        <select
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Year</option>
          {[2025, 2024, 2023, 2022, 2021].map((yr) => (
            <option key={yr}>{yr}</option>
          ))}
        </select>
      </div>

      <div className="w-full p-4">
        <h3 className="font-semibold text-lg mb-2">Filtered Cars</h3>
      
      </div>
    </div>
  );
};

export default FilterBuyedCar;
