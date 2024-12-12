import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

import useI18n from '@/hooks/useI81n';

type Props = {
  catid: string;
  setCategoryId: (catId: string) => void;
  options: { label: string; value: string | number }[];
};

/**
 * @fileoverview A React component that provides a category selection dropdown.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.catid - The current category ID.
 * @param {function} props.setCategoryId - Function to set the selected category ID.
 * @param {Array<{ label: string, value: string | number }>} props.options - Array of category options.
 *
 * @returns {JSX.Element} The rendered SortByCategory component.
 */
export const SortItemByCategory = ({ catid, setCategoryId, options }: Props) => {
  const [opened, setOpened] = useState(false);
  const { getText } = useI18n();
  const router = useRouter();

  const children = useMemo(
    () => (
      <Select
        onOpenChange={setOpened}
        value={{ label: '', value: catid }}
        onValueChange={(value) => {
          if (value?.value === 'all') {
            setCategoryId('');
            router.setParams({
              catId: 'all',
            });
          } else {
            setCategoryId(value?.value || '');
            router.setParams({ catId: value?.value || '' });
          }
          setOpened(false);
        }}>
        <SelectTrigger className="h-auto w-fit justify-start gap-2 border-none p-1 py-0.5 shadow-none hover:bg-transparent web:focus:ring-0 web:focus:ring-transparent">
          <SelectValue placeholder={getText('category')} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((cat) => (
            <SelectItem label={cat.label} key={cat.value} value={cat.value.toString()} />
          ))}
        </SelectContent>
      </Select>
    ),
    [opened]
  );
  return children;
};
