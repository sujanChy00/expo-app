import { View } from 'react-native';

import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ILanguageTexts } from '@/types/ILanguageTexts';

export const OrderDataLayout = ({
  title,
  caption,
  children,
  className,
}: {
  title: ILanguageTexts;
  caption?: string | number;
  children?: React.ReactNode;
  className?: string;
}) => {
  const { getText } = useI18n();

  return (
    <View className={cn('flex-row items-center justify-between', className)}>
      <P className="font-semibold">{getText(title)}</P>
      {caption && <P className="text-sm font-semibold">{caption}</P>}
      {children && children}
    </View>
  );
};
