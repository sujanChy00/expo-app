import { Snowflake, ThermometerSnowflake } from 'lucide-react-native';
import React from 'react';

import { Badge } from './ui/badge';
import { P } from './ui/typography';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';
type Props = {
  className?: string;
  text?: string;
};

export const CoolBadge = ({ className, text }: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const darkBG = text == 'frozen' ? '#1d4ed8' : '#14b8a6';
  const lightBG = text == 'frozen' ? '#dbeafe' : '#ccfbf1';
  const darkText = text == 'frozen' ? '#bfdbfe' : '#fff';
  const lightText = text == 'frozen' ? '#2563eb' : '#0d9488';
  return (
    <Badge
      className={cn('native:p-2 flex-row items-center gap-x-0.5 px-1 py-0', className)}
      style={{
        backgroundColor: isDarkColorScheme ? darkBG : lightBG,
      }}>
      {text == 'cool' ? (
        <ThermometerSnowflake color={isDarkColorScheme ? darkText : lightText} size={16} />
      ) : (
        <Snowflake color={isDarkColorScheme ? darkText : lightText} size={16} />
      )}

      <P
        style={{
          color: isDarkColorScheme ? darkText : lightText,
        }}
        className="web:xs:text-sm font-semibold uppercase web:text-xs">
        {text}
      </P>
    </Badge>
  );
};
