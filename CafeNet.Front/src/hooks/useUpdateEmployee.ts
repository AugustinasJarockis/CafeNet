import { updateUser } from '@/services/employeeService';
import { UpdateUserPayload } from '@/types/user/UpdateUserPayload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserPayload;
    }) => updateUser(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: Error) => {
      console.error('Update failed:', error.message);
    },
  });
}
