import { useRouter } from "next/router";
import { useChannelList } from "@/hooks/query/channels";
import s from "./navbarx.module.scss";
import ChannelsLogo from "./channelsLogo";

export default function NavBar() {
  const router = useRouter();
  const channelID = router.query.id;

  const { data: channels, isPending } = useChannelList();

  return (
    <nav className={s.navBar}>
      <div className={s.separatorWrap}>
        <div className={s.separator}></div>
      </div>
      <ul>
        {channels &&
          channels?.map((channel) => (
            <ChannelsLogo
              channel={channel}
              paramId={channelID}
              key={channel.id}
            />
          ))}
        <div className={s.separatorWrap}>
          <div className={s.separator}></div>
        </div>
      </ul>
    </nav>
  );
}
