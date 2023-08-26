import { ReactNode, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { Box } from "@chakra-ui/react";
const queryClient = new QueryClient();

const Layout = ({ children }: { children: ReactNode; }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setSession(session);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <>
      {session && (
        <QueryClientProvider client={queryClient}>
          <Header />
          <Box as="main" p={6} bg="#f4f4f4" minH="calc(100vh - 50px)">
            {children}
          </Box>
        </QueryClientProvider>
      )}
    </>
  );
};

export default Layout;
