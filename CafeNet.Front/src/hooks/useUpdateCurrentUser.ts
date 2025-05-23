import { updateCurrentUser, User } from "@/services/employeeService";
import { UpdateUserPayload } from "@/types/user/UpdateUserPayload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserPayload>({
    mutationFn: updateCurrentUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
    },
  });
};