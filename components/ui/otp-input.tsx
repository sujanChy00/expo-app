import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Input } from './input';

import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  onValueChange?: (otp: string) => void;
  type?: 'number' | 'text';
  className?: string;
  value?: string; // Expects a string representing the full OTP
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onValueChange,
  type = 'text',
  className,
  value = '',
}) => {
  const [otp, setOtp] = useState<string[]>(
    new Array(length).fill('').map((_, i) => value[i] || '')
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const updatedOtp = new Array(length).fill('').map((_, i) => value[i] || '');
    setOtp(updatedOtp);
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    const numericText = text.replace(/[^0-9]/g, '');

    if (type === 'number' && !numericText) return;

    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onValueChange?.(newOtp.join(''));
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '' && index > 0) {
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      } else {
        newOtp[index] = '';
      }
      setOtp(newOtp);
      onValueChange?.(newOtp.join(''));
    }
  };

  return (
    <View className={cn('flex-row justify-start gap-3', className)}>
      {otp.map((digit, index) => (
        <Input
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          key={index}
          style={{
            width: 50,
          }}
          className="native:h-14 text-center"
          keyboardType={type === 'number' ? 'numeric' : 'default'}
          maxLength={1}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          placeholder="•"
        />
      ))}
    </View>
  );
};
