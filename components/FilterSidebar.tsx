'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

interface FilterSidebarProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  defaultExpandedOption: string;
  onClose?: () => void; // For mobile modal
}

export function FilterSidebar({
  filters,
  setFilters,
  defaultExpandedOption,
  onClose
}: FilterSidebarProps) {
  // State for which filter sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [defaultExpandedOption]: true
  });

  // Filter data
  const categoryOptions: FilterOption[] = [
    { id: 'rings', label: 'Rings', count: 156 },
    { id: 'necklaces', label: 'Necklaces', count: 89 },
    { id: 'earrings', label: 'Earrings', count: 124 },
    { id: 'bracelets', label: 'Bracelets', count: 67 },
    { id: 'pendants', label: 'Pendants', count: 43 },
    { id: 'brooches', label: 'Brooches', count: 12 }
  ];

  const materialOptions: FilterOption[] = [
    { id: 'gold', label: 'Gold', count: 245 },
    { id: 'silver', label: 'Silver', count: 189 },
    { id: 'platinum', label: 'Platinum', count: 67 },
    { id: 'rose-gold', label: 'Rose Gold', count: 98 },
    { id: 'white-gold', label: 'White Gold', count: 134 }
  ];

  const gemstoneOptions: FilterOption[] = [
    { id: 'diamond', label: 'Diamond', count: 312 },
    { id: 'ruby', label: 'Ruby', count: 45 },
    { id: 'sapphire', label: 'Sapphire', count: 67 },
    { id: 'emerald', label: 'Emerald', count: 34 },
    { id: 'pearl', label: 'Pearl', count: 89 },
    { id: 'opal', label: 'Opal', count: 23 },
    { id: 'amethyst', label: 'Amethyst', count: 56 },
    { id: 'topaz', label: 'Topaz', count: 29 }
  ];

  const priceRanges: PriceRange[] = [
    { min: 0, max: 500, label: 'Under $500' },
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 2000, label: '$1,000 - $2,000' },
    { min: 2000, max: 5000, label: '$2,000 - $5,000' },
    { min: 5000, max: 10000, label: '$5,000 - $10,000' },
    { min: 10000, max: Infinity, label: 'Over $10,000' }
  ];

  const occasionOptions: FilterOption[] = [
    { id: 'engagement', label: 'Engagement', count: 78 },
    { id: 'wedding', label: 'Wedding', count: 92 },
    { id: 'anniversary', label: 'Anniversary', count: 56 },
    { id: 'birthday', label: 'Birthday', count: 134 },
    { id: 'graduation', label: 'Graduation', count: 23 },
    { id: 'everyday', label: 'Everyday Wear', count: 201 }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (filterType: string, value: any, isMultiple = true) => {
    if (isMultiple) {
      const currentValues = filters[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: any) => v !== value)
        : [...currentValues, value];
      
      setFilters({
        ...filters,
        [filterType]: newValues.length > 0 ? newValues : undefined
      });
    } else {
      setFilters({
        ...filters,
        [filterType]: filters[filterType] === value ? undefined : value
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => 
      value !== undefined && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  const renderFilterSection = (
    title: string,
    key: string,
    options: FilterOption[],
    isMultiple = true
  ) => (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => toggleSection(key)}
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {expandedSections[key] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections[key] && (
        <div className="mt-3 space-y-2">
          {options.map(option => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input
                type={isMultiple ? "checkbox" : "radio"}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                checked={isMultiple 
                  ? (filters[key] || []).includes(option.id)
                  : filters[key] === option.id
                }
                onChange={() => updateFilter(key, option.id, isMultiple)}
              />
              <span className="ml-2 text-sm text-gray-700 flex-1">
                {option.label}
              </span>
              {option.count && (
                <span className="text-xs text-gray-500">({option.count})</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const renderPriceFilter = () => (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => toggleSection('price')}
      >
        <h3 className="font-medium text-gray-900">Price Range</h3>
        {expandedSections['price'] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections['price'] && (
        <div className="mt-3 space-y-2">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                checked={filters.priceMin === range.min && filters.priceMax === range.max}
                onChange={() => {
                  if (filters.priceMin === range.min && filters.priceMax === range.max) {
                    setFilters({
                      ...filters,
                      priceMin: undefined,
                      priceMax: undefined
                    });
                  } else {
                    setFilters({
                      ...filters,
                      priceMin: range.min,
                      priceMax: range.max
                    });
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-700">
                {range.label}
              </span>
            </label>
          ))}
          
          {/* Custom price range inputs */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Custom Range</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                value={filters.customPriceMin || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  customPriceMin: e.target.value ? Number(e.target.value) : undefined
                })}
              />
              <span className="text-gray-500 self-center">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                value={filters.customPriceMax || ''}
                onChange={(e) => setFilters({
                  ...filters,
                  customPriceMax: e.target.value ? Number(e.target.value) : undefined
                })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDiscountFilter = () => (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => toggleSection('discount')}
      >
        <h3 className="font-medium text-gray-900">Discount</h3>
        {expandedSections['discount'] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections['discount'] && (
        <div className="mt-3 space-y-2">
          {[10, 20, 30, 40, 50].map(discount => (
            <label key={discount} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                checked={(filters.discount || []).includes(discount)}
                onChange={() => updateFilter('discount', discount)}
              />
              <span className="ml-2 text-sm text-gray-700">
                {discount}% or more
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white h-full overflow-y-auto">
      {/* Mobile header */}
      {onClose && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="p-4">
        {/* Clear all filters */}
        {getActiveFilterCount() > 0 && (
          <div className="mb-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
            >
              Clear all filters ({getActiveFilterCount()})
            </button>
          </div>
        )}

        {/* Filter sections */}
        <div className="space-y-0">
          {renderFilterSection('Category', 'category', categoryOptions)}
          {renderPriceFilter()}
          {renderFilterSection('Material', 'material', materialOptions)}
          {renderFilterSection('Gemstone', 'gemstone', gemstoneOptions)}
          {renderFilterSection('Occasion', 'occasion', occasionOptions)}
          {renderDiscountFilter()}
          
          {/* Additional filters */}
          <div className="border-b border-gray-200 py-4">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => toggleSection('additional')}
            >
              <h3 className="font-medium text-gray-900">Additional</h3>
              {expandedSections['additional'] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections['additional'] && (
              <div className="mt-3 space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={filters.inStock || false}
                    onChange={() => updateFilter('inStock', !filters.inStock, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={filters.newArrivals || false}
                    onChange={() => updateFilter('newArrivals', !filters.newArrivals, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">New Arrivals</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={filters.certified || false}
                    onChange={() => updateFilter('certified', !filters.certified, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Certified Diamonds</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={filters.customizable || false}
                    onChange={() => updateFilter('customizable', !filters.customizable, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Customizable</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile apply button */}
      {onClose && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <button
            onClick={onClose}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
