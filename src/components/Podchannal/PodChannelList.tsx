import { QueriesPodchannel } from "@/shared/swagger/generated";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import s from "./podchannelx.module.scss";

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
      <ul className={s.scroller}>
        <div>
          <img src="/img/sport2.jpg" alt="" />
        </div>
        <div className={s.separator}></div>

        {/* {!data ? (
          <Skeleton className="h-[100vh] w-full animate-pulse bg-slate-300 duration-700" />
        ) : ( */}
        {data &&
          data.map((podchannel) => (
            <Link
              key={podchannel.id}
              href={`/channel/${channelID}/${podchannel.id}`}
            >
              {/* <Button
                className={`w-full text-white rounded px-4 py-2 ${podchannelID == podchannel.id ? "bg-red-950" : "bg-gray-200 text-black hover:bg-red-950 hover:text-white"}`}
              >
                {podchannel.name}
              </Button> */}
            </Link>
          ))}
        {/* // )} */}
      </ul>
    </section>
  );
}
