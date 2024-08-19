import { getPodchannels } from "@/shared/swagger/generated";
import { useQuery } from "@tanstack/react-query";

import PodChannelList from "@/components/PodChannelList";
import { useRouter } from "next/router";

export default function Channel() {
  const param = useRouter();
  const id = param.query.id;

  const { data: podchannels } = useQuery({
    queryKey: ["podchannels", id],
    queryFn: () => getPodchannels({ channelId: Number(id) }),
    enabled: !!id,
    staleTime: 80000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  console.log("PODDD", podchannels);

  return (
    <section className="flex h-[100vh] flex-grow pl-20">
      <PodChannelList data={podchannels} />
      <div>WELCOME</div>
    </section>
  );
}
