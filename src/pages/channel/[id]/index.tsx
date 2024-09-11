import PodChannelList from "@/components/Podchannal/PodChannelList";
import { useRouter } from "next/router";
import { usePodchannelList } from "@/hooks/query/podchannel";

import s from "./index.module.scss";
export default function Channel() {
  const param = useRouter();
  const channelID = param.query.id as string;

  const { data: podchannels } = usePodchannelList(channelID);

  return (
      <PodChannelList data={podchannels} />
  );
}
