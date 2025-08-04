import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post('/api/login', data);
      return res.data;
    },
  });
};
