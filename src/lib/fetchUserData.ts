import { supabase } from "./supabaseClient";

export const fetchUserData = async () => {
  // 1. Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Auth error:", userError);
    return null;
  }

  // 2. Fetch user row from your "users" table
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Table fetch error:", error);
    return null;
  }

  return data;
};
