"use client";

import { supabase } from "./supabase";

type CachedAppDetail = {
  bannerText?: string;
  adminPhone?: string;
};

let cachedAppDetail: CachedAppDetail | null = null;
let cachedAppDetailPromise: Promise<CachedAppDetail | null> | null = null;

const normalizeString = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

export const getCachedLatestAppDetail = async (): Promise<CachedAppDetail | null> => {
  if (cachedAppDetail) return cachedAppDetail;
  if (cachedAppDetailPromise) return cachedAppDetailPromise;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  cachedAppDetailPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from("app_detail")
        .select("banner_text,admin_phone,created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) return null;

      const nextValue: CachedAppDetail = {
        bannerText: normalizeString(data?.banner_text),
        adminPhone: normalizeString(data?.admin_phone),
      };

      cachedAppDetail = nextValue;
      return cachedAppDetail;
    } catch {
      return null;
    } finally {
      cachedAppDetailPromise = null;
    }
  })();

  return cachedAppDetailPromise;
};
