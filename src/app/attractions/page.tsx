import AttractionsClient from "./AttractionsClient";
import { createPublicClient } from "../util/supabase-server";

export const revalidate = 86400;

export default async function AttractionsPage() {
  let initialAttractionsData: unknown[] | null = null;
  let initialAttractionsError: string | null = null;

  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      initialAttractionsError = "Supabase environment variables are missing";
    } else {
      const supabase = createPublicClient();
      const { data, error } = await supabase.rpc("get_all_attractions");
      if (error) {
        initialAttractionsError = error.message;
      } else if (Array.isArray(data)) {
        initialAttractionsData = data;
      } else {
        initialAttractionsError = "Unexpected attractions response";
      }
    }
  } catch (err) {
    initialAttractionsError =
      err instanceof Error ? err.message : "Failed to load attractions";
  }

  return (
    <AttractionsClient
      initialAttractionsData={initialAttractionsData}
      initialAttractionsError={initialAttractionsError}
    />
  );
}
