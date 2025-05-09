'use client';

import { useState } from 'react';
import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';

// Filter Type Definitions
type Brand = {
  id: string;
  name: string;
};

type Color = {
  name: string;
  value: string;
};

type FilterModalProps = {
  brands: Brand[];
  colors: Color[];
};

// Define categories used in the filter
const categories = [
  'All',
  'New Drops',
  'Trending',
  'Clothing',
  'Footwear',
  'Accessories',
];

export function FilterModal({ brands, colors }: FilterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Toggle selection for brands
  const handleBrandToggle = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
  };

  // Apply filters and close modal
  const applyFilters = () => {
    // In a real app, this would update the URL or trigger a data fetch
    closeModal();
  };

  // Modal footer with action buttons
  const modalFooter = (
    <div className="flex justify-between">
      <Button variant="ghost" onClick={resetFilters}>
        Reset
      </Button>
      <Button variant="primary" onClick={applyFilters}>
        Apply
      </Button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 text-sm font-medium flex items-center space-x-2"
      >
        {/* Sliders Icon (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        <span>Filters</span>
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title="Filters"
        footer={modalFooter}
        backdrop="dark"
        background="dark"
        rounded="xl"
      >
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-white mb-4">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-medium text-white mb-4">Brand</h4>
            <div className="flex flex-wrap gap-2">
              {brands.slice(0, 6).map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedBrands.includes(brand.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleBrandToggle(brand.id)}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
} 