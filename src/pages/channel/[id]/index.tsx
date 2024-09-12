import PodChannelList from "@/components/Podchannal/PodChannelList";
import { useRouter } from "next/router";
import { usePodchannelList } from "@/hooks/query/podchannel";
import s from "./index.module.scss";

export default function Channel() {
  const param = useRouter();
  const channelID = param.query.id as string;

  const { data: podchannels } = usePodchannelList(channelID);

  return (
    <div className={s.initWrap}>
      <div className={s.init}>
        <PodChannelList data={podchannels} />
        <div className={s.fill}>
          <p>Welcome</p>
        </div>
      </div>
    </div>
  );
}
