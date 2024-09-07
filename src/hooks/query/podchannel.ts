import { getPodchannels } from "@/shared/swagger/generated";
import { useQuery } from "@tanstack/react-query";

export function usePodchannelList(id: string) {
  return useQuery({
    queryKey: ["podchannels", id],
    queryFn: () => getPodchannels({ channelId: Number(id) }),
    enabled: !!id,
    staleTime: 80000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
}
