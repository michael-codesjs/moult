import * as React from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover } from "@/components/ui/popover"
import { countries } from "./countries.json"

export type Country = {
  name: string
  code: string
  flag: string
  dialCode: string
}

interface CountrySelectorProps {
  selectedCountry: Country
  onSelect: (country: Country) => void
  className?: string
}

function useCountrySearch(countries: Country[], onSelect: (country: Country) => void) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCountries = React.useMemo(() => 
    countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
    ),
    [searchQuery]
  )

  return {
    searchQuery,
    setSearchQuery,
    filteredCountries
  }
}

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="px-2 py-2 border-b-2 border-gray-200">
    <input
      type="text"
      role="searchbox"
      aria-label="Search countries"
      placeholder="Search country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)

interface CountryItemProps {
  country: Country
  isSelected: boolean
  onSelect: () => void
}

const CountryItem: React.FC<CountryItemProps> = ({
  country,
  isSelected,
  onSelect,
}) => (
  <button
    onClick={onSelect}
    className={cn(
      "w-full flex items-center gap-2 px-2 py-1.5 text-sm transition-colors",
      "hover:bg-accent focus:bg-accent focus:outline-none",
      isSelected && "bg-accent"
    )}
    role="option"
    aria-selected={isSelected}
  >
    <Image
      src={country.flag}
      alt={`${country.name} flag`}
      width={16}
      height={16}
      className="rounded-full min-w-[16px] min-h-[16px]"
    />
    <span>{country.name}</span>
    <span className="ml-auto text-sm text-muted-foreground">
      {country.dialCode}
    </span>
  </button>
)

export function CountrySelector({ selectedCountry, onSelect, className }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const {
    searchQuery,
    setSearchQuery,
    filteredCountries,
  } = useCountrySearch(countries, (country) => {
    onSelect(country)
    setIsOpen(false)
    setSearchQuery("")
  })

  const trigger = (
    <button
      type="button"
      aria-label="Select country"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className={cn(
        "flex items-center justify-between h-12 space-x-2 w-28 px-3 border rounded-md",
        "bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
    >
      <Image
        src={selectedCountry.flag}
        alt={`${selectedCountry.name} flag`}
        width={20}
        height={20}
        className="rounded-full min-w-[20px] min-h-[20px]"
      />
      <span className="">{selectedCountry.dialCode}</span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )

  const content = (
    <div 
      role="listbox" 
      aria-label="Countries list"
      className="focus:outline-none"
    >
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <div className="max-h-[300px] overflow-auto">
        {filteredCountries.length === 0 ? (
          <div className="px-2 py-1 text-sm text-muted-foreground">
            No country found.
          </div>
        ) : (
          filteredCountries.map((country) => (
            <CountryItem
              key={country.code}
              country={country}
              isSelected={selectedCountry.code === country.code}
              onSelect={() => {
                onSelect(country)
                setIsOpen(false)
                setSearchQuery("")
              }}
            />
          ))
        )}
      </div>
    </div>
  )

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      content={content}
    >
      {trigger}
    </Popover>
  )
} 