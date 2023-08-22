import { useEffect } from "react";
import { Box, Button, Container, Flex, Input, Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: "";
  password: "";
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      await onSignIn(data);
      alert("成功");
    } catch (e) {
      console.log(e);
    } finally {
      reset();
    }
  };

  const onSignIn = async ({ email, password }: Inputs) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      } else {
        console.log(event, session);
      }
    });
  }, [navigate]);

  return (
    <Flex w="full">
      <Flex justify="center" align="center" w="100%" h="100vh">
        <Container maxW="300px">
          <Box as="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Flex justify="center" direction="column" align="center">
              <Stack spacing={3} w="100%">
                <Box>Sign In</Box>
                <Box>
                  <Input
                    w="100%"
                    autoComplete="off"
                    placeholder="email"
                    id="email"
                    {...register("email", { required: true })}
                    required
                  />
                  {errors.email && (
                    <Box color="red" textAlign="left" fontSize="sm">
                      emailを入力してください
                    </Box>
                  )}
                </Box>
                <Box>
                  <Input
                    w="full"
                    type="password"
                    autoComplete="off"
                    placeholder="password"
                    id="password"
                    {...register("password", { required: true })}
                    required
                  />
                  {errors.password && (
                    <Box color="red" textAlign="left" fontSize="sm">
                      パスワードを入力してください
                    </Box>
                  )}
                </Box>
                <Flex w="100%">
                  <Button w="full" type="submit" colorScheme="linkedin">
                    ログイン
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Login;
