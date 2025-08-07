"use client";

import React, { useState } from "react";

const Combobox = ({
  options = ["hello", "jidjod", "jsjs"],
}: {
  options?: string[];
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-64">
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                  selected === option
                    ? "text-white bg-indigo-600"
                    : "text-gray-900"
                }`}
                onMouseDown={() => {
                  setSelected(option);
                  setQuery(option);
                  setIsOpen(false);
                }}
              >
                <span
                  className={`block truncate ${
                    selected === option ? "font-semibold" : "font-normal"
                  }`}
                >
                  {option}
                </span>
              </li>
            ))
          ) : (
            <li className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-700">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
