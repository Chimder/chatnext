import { getPodchannels } from "@/shared/swagger/generated";
import { useQuery } from "@tanstack/react-query";

import Chat from "@/components/Chat";
import PodChannelList from "@/components/PodChannelList";
import { useRouter } from "next/router";

type Props = {};

export default function PodChannel({}: Props) {
  const param = useRouter();
  const channelID = param.query.id;

  const { data: podchannels } = useQuery({
    queryKey: ["podchannels", channelID],
    queryFn: () => getPodchannels({ channelId: Number(channelID) }),
    enabled: !!channelID,
  });
  return (
    <main className="flex h-[100vh] overflow-y-hidden flex-grow pl-24">
      <PodChannelList data={podchannels} />
      <Chat />
    </main>
  );
}
