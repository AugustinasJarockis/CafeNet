import { useQuery } from '@tanstack/react-query';
import { getTaxes, Tax } from '@/services/taxService'; // adjust path if needed

export function useTaxes() {
  return useQuery<Tax[], Error>({
    queryKey: ['taxes'],
    queryFn: getTaxes,
  });
}
