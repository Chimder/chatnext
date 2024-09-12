import { QueriesPodchannel } from "@/shared/swagger/generated";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./podchannelx.module.scss";
import Icon from "@/shared/assets/Icon";
import clsx from "clsx";

interface Props {
  data?: QueriesPodchannel[];
}

export default function PodChannelList({ data }: Props) {
  const router = useRouter();
  const channelID =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const podchannelID = router.query.podchannelId;

  return (
    <section className={s.sideBar}>
      <h1>Channel</h1>
      <div className={s.separator}></div>
      <ul className={s.scroller}>
        {/* {!data ? (
          <Skeleton className="h-[100vh] w-full animate-pulse bg-slate-300 duration-700" />
        ) : ( */}
        {data &&
          data.map((podchannel) => (
            <Link
              key={podchannel.id}
              href={`/channel/${channelID}/${podchannel.id}`}
              className={s.podchannelWrap}
            >
              <div
                className={clsx(
                  s.podchannelList,
                  podchannelID == podchannel.id && s.active
                )}
              >
                <Icon.UpdatesLogo className={s.logoUpdate} />
                <span> 💬・{podchannel.name}</span>
              </div>
            </Link>
          ))}
        {/* // )} */}
      </ul>
    </section>
  );
}
