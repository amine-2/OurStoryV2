// lib/supabase/createUser.js
import { supabase } from "./supabaseClient";

export const createUser = async ({ id, name, image_url }) => {
  const { data, error } = await supabase.from("profiles").insert([
    {
      id,
      name,
      image_url: image_url,
    },
  ]);

  if (error) throw error;
  return data;
};
