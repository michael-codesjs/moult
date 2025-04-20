import React from 'react';
import { PhoneInput, Country } from './PhoneInput';
import { PasswordInput } from './PasswordInput';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  country?: Country;
  onCountryChange?: (country: Country) => void;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      value,
      onChange,
      country,
      onCountryChange,
      className = '',
      ...props
    },
    ref
  ) => {
    if (type === 'phone') {
      if (!country || !onCountryChange) {
        throw new Error('country and onCountryChange are required for type="phone"');
      }
      return (
        <PhoneInput
          value={value}
          onChange={onChange}
          country={country}
          onCountryChange={onCountryChange}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          className={className}
        />
      );
    }
    if (type === 'password') {
      return (
        <PasswordInput
          value={value}
          onChange={onChange}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          className={className}
          autoComplete={props.autoComplete}
          ref={ref}
        />
      );
    }
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-4 h-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input'; 