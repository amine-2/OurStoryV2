// lib/supabase/uploadProfileImage.js
import * as ImageManipulator from "expo-image-manipulator";
import mime from "mime";
import { supabase } from "./supabaseClient";

export const uploadProfileImage = async (uri, userId) => {
  // Resize and compress
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 512 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );

  const fileExt = manipulatedImage.uri.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const mimeType = mime.getType(manipulatedImage.uri);

  const file = {
    uri: manipulatedImage.uri,
    name: fileName,
    type: mimeType,
  };

  const { error } = await supabase.storage
    .from("user-profiles")
    .upload(`avatars/${fileName}`, file, {
      contentType: mimeType,
      upsert: true,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from("user-profiles")
    .getPublicUrl(`avatars/${fileName}`);

  return publicUrl.publicUrl;
};
