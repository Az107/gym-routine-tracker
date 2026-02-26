import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { supabase } from "./lib/utils";

export default function Logout() {
  let navigate = useNavigate();
  supabase.auth.signOut();
  navigate("/login");
  return <></>;
}
