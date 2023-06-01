import React from "react";
import Maps from "./Maps";

const MapsSection = ({ actionText, description }) => {
  return (
    <div
      id="map"
      className="flex flex-col items-center justify-start font-sans min-h-96 bg-gray-50 lg:pt-10 lg:pb-20 "
    >
      <div>
        <p className="p-3 pt-12 text-lg font-bold text-gray-500 lg:text-gray-300">
          {description}
        </p>
      </div>

      <Maps />
    </div>
  );
};

export default MapsSection;
