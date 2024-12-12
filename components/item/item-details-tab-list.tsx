import React from 'react';

import { AnimatedTabList, AnimatedTabTrigger } from '../ui/animated-tab';
import { P } from '../ui/typography';

/**
 * @description A React component that renders a list of tabs for switching between item details in different languages.
 * @returns {JSX.Element} The rendered item details tab list component.
 *
 * ```
 */
export const ItemDetailsTabList = () => {
  return (
    <AnimatedTabList className="web:md:justify-between web:md:pt-6">
      <AnimatedTabTrigger index={0} tabValue="en_US" className="flex-1">
        <P className="text-center text-sm font-semibold">English</P>
      </AnimatedTabTrigger>
      <AnimatedTabTrigger index={1} tabValue="ja_JP" className="flex-1">
        <P className="text-center font-semibold">日本語</P>
      </AnimatedTabTrigger>
      <AnimatedTabTrigger index={2} tabValue="ne_NP" className="flex-1">
        <P className="text-center font-semibold">नेपाली</P>
      </AnimatedTabTrigger>
      <AnimatedTabTrigger index={3} tabValue="vi_VN" className="flex-1">
        <P className="text-center font-semibold">Tiếng Việt</P>
      </AnimatedTabTrigger>
    </AnimatedTabList>
  );
};
