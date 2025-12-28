"use client";

import { createContext, useContext, useMemo } from "react";

type AppDetailContextValue = {
  bannerText?: string | null;
  adminPhone?: string | null;
};

const AppDetailContext = createContext<AppDetailContextValue>({});

export function AppDetailProvider({
  bannerText,
  adminPhone,
  children,
}: AppDetailContextValue & { children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      bannerText,
      adminPhone,
    }),
    [adminPhone, bannerText]
  );

  return (
    <AppDetailContext.Provider value={value}>
      {children}
    </AppDetailContext.Provider>
  );
}

export function useAppDetail() {
  return useContext(AppDetailContext);
}

