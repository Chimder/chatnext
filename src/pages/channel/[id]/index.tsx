import PodChannelList from "@/components/PodChannelList";
import { useRouter } from "next/router";
import { usePodchannelList } from "@/hooks/query/podchannel";

export default function Channel() {
  const param = useRouter();
  const channelID = param.query.id as string;

  const { data: podchannels } = usePodchannelList(channelID);

  return (
    <section className="flex h-[100vh] overflow-y-hidden flex-grow pl-24">
      <PodChannelList data={podchannels} />
      <div>WELCOME</div>
    </section>
  );
}
