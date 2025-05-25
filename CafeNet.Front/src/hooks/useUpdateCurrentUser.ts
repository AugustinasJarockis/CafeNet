import { updateCurrentUser, User } from "@/services/employeeService";
import { UpdateCurrentUserPayload } from "@/types/user/UpdateUserPayload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateCurrentUserPayload>({
    mutationFn: updateCurrentUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
    },
    onError: (error: Error) => {
      console.error('Update failed:', error.message);
      alert(`Update failed: ${error.message}`);
    },
  });
};