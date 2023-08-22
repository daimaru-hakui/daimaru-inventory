/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import Layout from "./components/Layout/Layout";
import { useState, useEffect } from "react";
import { supabase} from "./utils/supabaseClient";
import { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  console.log(session)
  return (
    <>
      <Layout>
        <div className="container" style={{ padding: "50px 0 100px 0" }}></div>
      </Layout>
    </>
  );
}

export default App;
