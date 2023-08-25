import { FC, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
export const Header: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getUserSession();
  }, []);

  return (
    <Flex as="header" w="full" bg="white" align="center">
      <Flex as="nav" w="full" maxW="1000px" h={12} px={2} mx="auto" justify="space-between" align="center">
        <Box>
          <Link to="/">大丸白衣</Link>
        </Box>
        <Flex as="ul" gap={3} fontSize="sm">
          <Box>
            <Link to="/">HOME</Link>
          </Box>
          <Box>
            <Link to="/skus">在庫表</Link>
          </Box>
          <Box>
            <Link to="/products">商品一覧</Link>
          </Box>
          <Box>
            <Link to="/products/new">商品登録</Link>
          </Box>
          <Box>
            <Link to="/investroy-control">入出庫</Link>
          </Box>
          <Box>
            {session ? (
              <Box as="a" cursor="pointer" onClick={onLogout}>
                ログアウト
              </Box>
            ) : (
              <Link to="/login">ログイン</Link>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
