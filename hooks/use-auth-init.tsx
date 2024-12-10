import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import { useUser } from './use-user';

import { getUser } from '@/api/user';
import { SELECTED_SHOP_KEY, useLoading, useSelectedShop } from '@/providers/auth-provider';

export const useAppInit = () => {
  const { setUser } = useUser();
  const { setSelectedShop } = useSelectedShop();
  const { setLoading } = useLoading();

  const initApp = () => {
    setLoading(true);
    getUser()
      .then((user) => {
        setUser(user);
        AsyncStorage.getItem(SELECTED_SHOP_KEY).then((shop) => {
          let shopId: number;
          try {
            shopId = JSON.parse(shop || '{}')?.shopId;
          } catch (error) {
            shopId = 0;
          }

          if (shop) {
            const shopFromUser = user.shopDetails.find((shop) => shop.shopId === shopId);
            if (shopFromUser) {
              setSelectedShop(shopFromUser);
            } else {
              setSelectedShop(user.shopDetails[0]);
            }
          } else {
            setSelectedShop(user.shopDetails[0]);
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { initApp };
};

const useAuthInit = () => {
  const { initApp } = useAppInit();
  useEffect(() => {
    initApp();
  }, []);
};

export default useAuthInit;
