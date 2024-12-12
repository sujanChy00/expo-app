import React from 'react';
import { View } from 'react-native';

import { Badge } from '../ui/badge';
import { CardFooter } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { IItemVaritions } from '@/types';

/**
 * @description A React component that renders a footer section for an item card, displaying available variations.
 *
 * @example
 * ```jsx
 * <ItemCardFooter
 *   variations={[
 *     { name: "Small", weight: "500g" },
 *     { name: "Medium", weight: "1kg" },
 *   ]}
 * />
 * ```
 * @typedef {Object} IItemVaritions
 * @property {string} name - The name of the variation.
 * @property {string} weight - The weight of the variation.
 *
 * @typedef {Object} ItemCardFooterProps
 * @property {IItemVaritions[]} variations? - An array of item variations.
 *
 *
 * @param {ItemCardFooterProps} props - The component props.
 * @returns {JSX.Element} The rendered item card footer component, or null if no variations exist.
 *
 */
export const ItemCardFooter = ({ variations }: { variations?: IItemVaritions[] }) => {
  if (!variations || variations.length === 0) return null;
  return (
    <View className="gap-2">
      <Separator />
      <CardFooter className="flex-row flex-wrap items-start gap-3 p-1.5">
        {variations.map((iv, i) => (
          <Badge key={iv.name + iv.weight + i} style={{ backgroundColor: '#095086' }}>
            <P className="font-semibold text-white">{iv.weight}</P>
          </Badge>
        ))}
      </CardFooter>
    </View>
  );
};
