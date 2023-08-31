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
    <Flex as="header" w="full" bg="white" align="center" position="sticky" top={0} zIndex={10}>
      <Flex as="nav" w="full" h={12} px={6} mx="auto" justify="space-between" align="center" boxShadow="md">
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
            <Link to="/products/new">商品登録</Link>
          </Box>
          <Box>
            <Link to="/outgoing-history">出荷履歴</Link>
          </Box>
          <Box>
            <Link to="/incoming-history">入荷履歴</Link>
          </Box>
          <Box>
            <Link to="/investroy-control">入出庫処理</Link>
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
