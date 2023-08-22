import { useMutation,useQueryClient } from 'react-query';
import { supabase } from '../../utils/supabaseClient';

export const useMutateAuth = () => {

  const loginMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const queryClient = useQueryClient();
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      queryClient.removeQueries(['user']);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    loginMutation,
    registerMutation,
    logout,
  };
};