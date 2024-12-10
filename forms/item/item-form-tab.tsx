import React from 'react';
import { View } from 'react-native';

import { useItemForm } from './use-item-form';

// import { ItemImagePicker } from '@/components/item/item-image-picker';
// import {
//   AnimatedTab,
//   AnimatedTabContent,
//   AnimatedTabContentWrapper,
//   AnimatedTabList,
//   AnimatedTabTrigger,
// } from '@/components/ui/animated-tab';
import { IItemDescriptionResponse } from '@/types';

/**
 * @description A React component that renders a form for creating or editing an item, 
 * including details in multiple languages, images, and additional properties like price, category, and stock. 
 * It uses various form components and hooks for managing data and submission.
 * @typedef {Object} IItemDescriptionResponse - This type is not defined or imported. Please provide the definition or a link to its documentation.
 * @typedef {Object} ILanguageCode - This type is not defined or imported. Please provide the definition or a link to its documentation.

 *
 * @param {Object} props - Component props.
 * @param {IItemDescriptionResponse} props.data - Optional initial data to populate the form if editing an existing item.
 * @returns {JSX.Element} The rendered `ItemFormTab` component.
 */
export const ItemFormTab = ({ editMode = false }: { editMode?: boolean }) => {
  const { form, handleSubmit, isLoading, categoryId, data, copy, itemType } = useItemForm();

  return (
    <View className="bg-background flex-1">
      {/* <AnimatedTab numberOfTabs={4}>
        <AnimatedTabList className="gap-4 md:gap-10">
          <AnimatedTabTrigger
            tabValue="en_US"
            index={0}
            className="native:flex-1 web:flex-1 web:md:flex-none">
            <P className="text-center font-semibold">English</P>
          </AnimatedTabTrigger>
          <AnimatedTabTrigger
            tabValue="ne_NP"
            index={1}
            className="native:flex-1 web:flex-1 web:md:flex-none">
            <P className="text-center font-semibold">नेपाली</P>
          </AnimatedTabTrigger>
          <AnimatedTabTrigger
            tabValue="ja_JP"
            index={2}
            className="native:flex-1 web:flex-1 web:md:flex-none">
            <P className="text-center font-semibold">日本語</P>
          </AnimatedTabTrigger>
          <AnimatedTabTrigger
            tabValue="vi_VN"
            index={3}
            className="native:flex-1 web:flex-1 web:md:flex-none">
            <P className="text-center font-semibold">Tiếng Việt</P>
          </AnimatedTabTrigger>
        </AnimatedTabList>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="on-drag">
          {!editMode && (
            <View className="py-4">
              <ItemImagePicker />
            </View>
          )}
          <AnimatedTabContentWrapper>
            <AnimatedTabContent tabValue="en_US">
              <ItemForm
                categoryId={categoryId}
                editMode={editMode}
                form={form}
                copy={copy}
                itemType={itemType}
                data={data}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                name="englishLanguageList"
              />
            </AnimatedTabContent>
            <AnimatedTabContent tabValue="ne_NP" className="xs:p-6 gap-4 p-3">
              <ItemForm
                itemType={itemType}
                editMode={editMode}
                categoryId={categoryId}
                form={form}
                copy={copy}
                data={data}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                name="nepaliLanguageList"
              />
            </AnimatedTabContent>
            <AnimatedTabContent tabValue="ja_JP" className="xs:p-6 gap-4 p-3">
              <ItemForm
                itemType={itemType}
                editMode={editMode}
                categoryId={categoryId}
                form={form}
                copy={copy}
                data={data}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                name="japaneseLanguageList"
              />
            </AnimatedTabContent>
            <AnimatedTabContent tabValue="vi_VN" className="xs:p-6 gap-4 p-3">
              <ItemForm
                itemType={itemType}
                editMode={editMode}
                categoryId={categoryId}
                form={form}
                copy={copy}
                data={data}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                name="vientameseLanguageList"
              />
            </AnimatedTabContent>
          </AnimatedTabContentWrapper>
        </ScrollView>
      </AnimatedTab> */}
    </View>
  );
};
