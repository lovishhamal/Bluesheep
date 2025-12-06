import { supabase } from "./supabase";

// Type definitions
export interface StorageImage {
  name: string;
  url: string;
  alt: string;
}

export interface UploadResult {
  path: string;
  url: string;
}

// Function to get public URL for images from Supabase storage
export const getImageUrl = (
  bucket: string,
  folder: string,
  fileName: string
) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`${folder}/${fileName}`);
  return data.publicUrl;
};

// Function to list all images from a specific folder in a bucket
export const getImagesFromFolder = async (
  bucket: string,
  folder: string
): Promise<StorageImage[]> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder);
    console.log("data -> ,data", data);
    console.log("err", error);

    if (error) {
      console.error("Supabase storage error:", error);
      return [];
    }

    console.log(`Raw data from Supabase:`, data);
    console.log(`Number of files found:`, data?.length || 0);

    if (!data || data.length === 0) {
      console.warn(`No files found in bucket "${bucket}" folder "${folder}"`);
      return [];
    }

    // Filter for image files and create full URLs
    const imageFiles: StorageImage[] =
      data
        ?.filter((file: { name: string }) => {
          const extension = file.name.toLowerCase().split(".").pop();
          const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(
            extension || ""
          );
          if (!isImage) {
            console.log(`Skipping non-image file: ${file.name}`);
          }
          return isImage;
        })
        .map((file: { name: string }): StorageImage => {
          const url = getImageUrl(bucket, folder, file.name);
          console.log(`Image: ${file.name} -> URL: ${url}`);
          return {
            name: file.name,
            url: url,
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          };
        }) || [];

    console.log(`Filtered image files:`, imageFiles);
    console.log(`Total images found: ${imageFiles.length}`);
    return imageFiles;
  } catch (error) {
    console.error("Error in getImagesFromFolder:", error);
    return [];
  }
};

// Function to upload an image to Supabase storage
export const uploadImage = async (
  bucket: string,
  folder: string,
  file: File,
  fileName?: string
) => {
  try {
    const finalFileName = fileName || `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${finalFileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      return null;
    }

    return {
      path: data.path,
      url: getImageUrl(bucket, folder, finalFileName),
    };
  } catch {
    return null;
  }
};

// Function to delete an image from Supabase storage
export const deleteImage = async (bucket: string, filePath: string) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

// Function to get all buckets
export const getBuckets = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
};

// Type definition for reviews
export interface Review {
  name: string;
  review: string;
  rating: number;
  country: string;
}

// Function to fetch reviews from Supabase database table
export const getReviews = async (): Promise<Review[]> => {
  try {
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
