import { createClient } from "./supabase-server";
import { StorageImage, Review } from "./storage";

// Function to get public URL for images from Supabase storage (server-side)
export const getImageUrl = (
  supabaseUrl: string,
  bucket: string,
  folder: string,
  fileName: string
) => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${folder}/${fileName}`;
};

// Function to list all images from a specific folder in a bucket (server-side)
export const getImagesFromFolder = async (
  bucket: string,
  folder: string
): Promise<StorageImage[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from(bucket).list(folder);

    if (error) {
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    // Filter for image files and create full URLs
    const imageFiles: StorageImage[] =
      data
        ?.filter((file: { name: string }) => {
          const extension = file.name.toLowerCase().split(".").pop();
          const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(
            extension || ""
          );

          return isImage;
        })
        .map((file: { name: string }): StorageImage => {
          const url = getImageUrl(supabaseUrl, bucket, folder, file.name);

          return {
            name: file.name,
            url: url,
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          };
        }) || [];

    return imageFiles;
  } catch (error) {
    return [];
  }
};

// Function to fetch reviews from Supabase database table (server-side)
export const getReviews = async (): Promise<Review[]> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
};

