import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

import { SASTO_SULAV_iNDIA, SASTO_SULAV_NEPAL } from '@/constants/data';
import { ILanguageCode } from '@/types';
import { IProfile, ISellerShopDetail } from '@/types/IProfile';

export interface AppState {
  user: IProfile | null;
  deviceToken: string | null;
  language: ILanguageCode | null;
  selectedShop: ISellerShopDetail | null;
  setUser: (user: IProfile | null) => void;
  setDeviceToken: (deviceToken: string | null) => void;
  setLanguage: (language: ILanguageCode | null) => void;
  setSelectedShop: (selectedShop: ISellerShopDetail | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const DEVICE_TOKEN_KEY = 'deviceToken';
export const USER_KEY = 'user';
export const LANGUAGE_KEY = 'language';
export const SELECTED_SHOP_KEY = 'selectedShop';

export const AuthContext = createContext<AppState>({
  user: null,
  deviceToken: null,
  language: null,
  selectedShop: null,
  setUser: (user: IProfile | null) => {},
  setDeviceToken: (deviceToken: string | null) => {},
  setLanguage: (language: ILanguageCode | null) => {},
  setSelectedShop: (selectedShop: ISellerShopDetail | null) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IProfile | null>(null);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const [language, setLanguage] = useState<ILanguageCode | null>(null);
  const [selectedShop, setSelectedShop] = useState<ISellerShopDetail | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <AuthContext.Provider
      value={{
        user,
        deviceToken,
        language,
        selectedShop,
        setUser,
        setDeviceToken,
        setLanguage,
        setSelectedShop,
        loading,
        setLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useDeviceToken = () => {
  const { deviceToken, setDeviceToken: set } = useContext(AuthContext);

  const setDeviceToken = (deviceToken: string | null) => {
    if (deviceToken) AsyncStorage.setItem(DEVICE_TOKEN_KEY, deviceToken);
    else AsyncStorage.removeItem(DEVICE_TOKEN_KEY);
    set(deviceToken);
  };

  return { deviceToken, setDeviceToken };
};

export const useLanguage = () => {
  const { language, setLanguage: set } = useContext(AuthContext);
  const setLanguage = (language: ILanguageCode | null) => {
    if (language) AsyncStorage.setItem(LANGUAGE_KEY, language);
    else AsyncStorage.removeItem(LANGUAGE_KEY);
    set(language);
  };
  return { language, setLanguage };
};

export const useSelectedShop = () => {
  const { selectedShop, setSelectedShop: set } = useContext(AuthContext);
  const setSelectedShop = (selectedShop: ISellerShopDetail | null) => {
    if (selectedShop) AsyncStorage.setItem(SELECTED_SHOP_KEY, JSON.stringify(selectedShop));
    else AsyncStorage.removeItem(SELECTED_SHOP_KEY);
    set(selectedShop);
  };

  const isIndianShop = selectedShop?.shopId == SASTO_SULAV_iNDIA;
  const isNepaliShop = selectedShop?.shopId == SASTO_SULAV_NEPAL;
  const isSastoSulavSelected =
    selectedShop?.shopId == SASTO_SULAV_NEPAL || selectedShop?.shopId == SASTO_SULAV_iNDIA;

  return {
    selectedShop,
    setSelectedShop,
    isIndianShop,
    isNepaliShop,
    isSastoSulavSelected,
  };
};

export const useLoading = () => {
  const { loading, setLoading: set } = useContext(AuthContext);
  const setLoading = (loading: boolean) => {
    set(loading);
  };
  return { loading, setLoading };
};
