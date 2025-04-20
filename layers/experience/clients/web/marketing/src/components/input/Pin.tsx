import React, { useRef } from 'react';

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({ value, onChange, length = 6, disabled }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const newValue = value.substring(0, idx) + val[0] + value.substring(idx + 1);
    onChange(newValue);
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (value[idx]) {
        const newValue = value.substring(0, idx) + '' + value.substring(idx + 1);
        onChange(newValue);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="w-full max-w-lg flex gap-4 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => { inputsRef.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-full h-[56px] text-3xl text-center rounded-lg border border-gray-700 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          value={value[idx] || ''}
          onChange={e => handleChange(e, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          disabled={disabled}
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );
};

export default PinInput; 