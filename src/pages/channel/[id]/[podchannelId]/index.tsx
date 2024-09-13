import PodChannelList from "@/components/Podchannal/PodChannelList";
import { useRouter } from "next/router";
import { usePodchannelList } from "@/hooks/query/podchannel";
import Chat from "@/components/Chat/Chat";
import s from "./podchannel.module.scss";

type Props = {};

export default function PodChannel({}: Props) {
  const param = useRouter();
  const channelID = param.query.id;

  const { data: podchannels } = usePodchannelList(channelID as string);

  return (
    <section className={s.initWrap}>
      <div className={s.init}>
        <PodChannelList data={podchannels} />
        <Chat />
      </div>
    </section>
  );
}
