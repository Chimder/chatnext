import Chat from "@/components/Chat";
import PodChannelList from "@/components/PodChannelList";
import { useRouter } from "next/router";
import { usePodchannelList } from "@/hooks/query/podchannel";

type Props = {};

export default function PodChannel({}: Props) {
  const param = useRouter();
  const channelID = param.query.id;

  const { data: podchannels } = usePodchannelList(channelID as string);

  return (
    <main className="flex h-[100vh] overflow-y-hidden flex-grow pl-24">
      <PodChannelList data={podchannels} />
      <Chat />
    </main>
  );
}
