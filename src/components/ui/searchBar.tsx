import React, { useState, ChangeEvent } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onChange: (term: string) => void;
  placeholder: string | undefined;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedOnChange = debounce((term: string) => {
    onChange(term);
  }, 300);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedOnChange(term);
  };

  return (
    <div className='flex justify-between items-start self-stretch rounded-full border-[0.1px] border-solid border-black'>
      <input
        className='flex flex-1 pl-4 py-1 rounded-l-full focus:outline-none'
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button
        className='flex px-4 justify-center items-center gap-3 self-stretch bg-gray-200 rounded-r-full'
        onClick={(_) => debouncedOnChange(searchTerm)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
          <path d="M8.1254 4.5619C8.1254 5.45826 7.83437 6.28626 7.34411 6.95804L9.81689 9.43229C10.061 9.67639 10.061 10.0728 9.81689 10.3169C9.57273 10.561 9.17623 10.561 8.93208 10.3169L6.4593 7.84267C5.78739 8.33479 4.95923 8.62381 4.0627 8.62381C1.81845 8.62381 0 6.80572 0 4.5619C0 2.31809 1.81845 0.5 4.0627 0.5C6.30695 0.5 8.1254 2.31809 8.1254 4.5619ZM4.0627 7.37399C4.43206 7.37399 4.7978 7.30126 5.13905 7.15994C5.48029 7.01862 5.79036 6.81148 6.05153 6.55035C6.31271 6.28922 6.51989 5.97922 6.66124 5.63804C6.80259 5.29687 6.87534 4.93119 6.87534 4.5619C6.87534 4.19262 6.80259 3.82694 6.66124 3.48577C6.51989 3.14459 6.31271 2.83458 6.05153 2.57346C5.79036 2.31233 5.48029 2.1052 5.13905 1.96387C4.7978 1.82255 4.43206 1.74982 4.0627 1.74982C3.69334 1.74982 3.32759 1.82255 2.98635 1.96387C2.6451 2.1052 2.33504 2.31233 2.07386 2.57346C1.81269 2.83458 1.60551 3.14459 1.46416 3.48577C1.32281 3.82694 1.25006 4.19262 1.25006 4.5619C1.25006 4.93119 1.32281 5.29687 1.46416 5.63804C1.60551 5.97922 1.81269 6.28922 2.07386 6.55035C2.33504 6.81148 2.6451 7.01862 2.98635 7.15994C3.32759 7.30126 3.69334 7.37399 4.0627 7.37399Z" fill="black" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
