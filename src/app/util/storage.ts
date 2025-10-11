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
    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      limit: 100,
      offset: 0,
    });

    if (error) {
      console.error("Error fetching images:", error);
      return [];
    }

    // Filter for image files and create full URLs
    const imageFiles: StorageImage[] =
      data
        ?.filter((file: any) => {
          const extension = file.name.toLowerCase().split(".").pop();
          return ["jpg", "jpeg", "png", "webp", "gif"].includes(
            extension || ""
          );
        })
        .map(
          (file: any): StorageImage => ({
            name: file.name,
            url: getImageUrl(bucket, folder, file.name),
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          })
        ) || [];

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
      console.error("Error uploading image:", error);
      return null;
    }

    return {
      path: data.path,
      url: getImageUrl(bucket, folder, finalFileName),
    };
  } catch (error) {
    console.error("Error in uploadImage:", error);
    return null;
  }
};

// Function to delete an image from Supabase storage
export const deleteImage = async (bucket: string, filePath: string) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteImage:", error);
    return false;
  }
};

// Function to get all buckets
export const getBuckets = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Error fetching buckets:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error in getBuckets:", error);
    return [];
  }
};
