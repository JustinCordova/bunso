import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  return (
    <div className="relative w-80 mx-auto"> {/* width 20rem, centered */}
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-mixed-grey w-5 h-5 pointer-events-none" />
      <input
        type="text"
        placeholder="Search"
        className="font-(family-name:--font-f1) text-sm text-white pl-12 pr-4 py-2 rounded-full bg-[#1e1f2e] text-light-grey placeholder-mixed-grey focus:outline-none h-10 w-full"
      />
    </div>
  );
};

export default Searchbar;
