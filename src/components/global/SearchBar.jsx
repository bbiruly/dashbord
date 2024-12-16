import { useState } from 'react';



const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  customStyles = '',
  icon,
  rounded = 'rounded-md',
  width = 'w-full',
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div
      className={`flex items-center border border-gray-300 bg-white ${rounded} ${width} ${customStyles}`}
    >
      {/* Icon Section */}
      {icon && <div className="px-3">{icon}</div>}

      {/* Input Section */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={`flex-grow px-2 py-1 lg:px-4 lg:py-2 focus:outline-none  ${rounded}`}
      />
    </div>
  );
};

export default SearchBar;
