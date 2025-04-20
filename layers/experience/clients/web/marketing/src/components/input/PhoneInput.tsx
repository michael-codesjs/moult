import React from 'react';
import countriesData from './countries.json';
import { Input } from './Input';

export type Country = {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
};

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  country: Country;
  onCountryChange: (country: Country) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  country,
  onCountryChange,
  name,
  id,
  placeholder = 'Enter your phone number',
  className = '',
}: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const countries: Country[] = countriesData.countries || countriesData;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Filter countries by search query
  const filteredCountries = React.useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.replace('+', '').includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search, countries]);

  return (
    <div className={`flex w-full ${className}`}>
      <div className="relative">
        <button
          type="button"
          aria-label="Select country"
          className="flex items-center justify-center gap-2 min-w-[100px] max-x-[120px] h-12 border bg-white/10  border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mr-2"
          ref={buttonRef}
          onClick={() => setOpen((v) => !v)}
        >
          <img src={country.flag} alt={country.code} className="w-5 h-5 rounded-full" />
          <span className="text-sm">{country.dialCode}</span>
          <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div ref={popupRef} className="absolute z-50 left-0 mt-2 w-64 max-h-72 overflow-auto bg-white border border-purple-900/40 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search country..."
              className="w-full px-3 py-2 bg-white text-gray-900 border-b border-purple-900 focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            <ul className="max-h-56 overflow-auto">
              {filteredCountries.length === 0 ? (
                <li className="px-3 py-2 text-gray-500 text-sm">No countries found.</li>
              ) : (
                filteredCountries.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-purple-100 ${c.code === country.code ? 'bg-purple-100' : ''}`}
                      onClick={() => {
                        onCountryChange(c);
                        setOpen(false);
                        setSearch('');
                        inputRef.current?.focus();
                      }}
                    >
                      <img src={c.flag} alt={c.code} className="w-5 h-5 rounded-full" />
                      <span className="text-sm text-gray-900">{c.name}</span>
                      <span className="ml-auto text-xs text-gray-500">{c.dialCode}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      <Input
        ref={inputRef}
        type="tel"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="tel"
        aria-label="Phone number"
      />
    </div>
  );
} 