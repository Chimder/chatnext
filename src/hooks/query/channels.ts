import { getChannels } from "@/shared/swagger/generated";
import { useQuery } from "@tanstack/react-query";

export function useChannelList() {
  return useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannels(),
    // enabled: !!id,
    staleTime: 99999,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
