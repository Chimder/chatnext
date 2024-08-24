import { QueriesPodchannel } from "@/shared/swagger/generated";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  data?: QueriesPodchannel[];
}

export default function PodChannelList({ data }: Props) {
  const router = useRouter();
  const channelID =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const podchannelID = router.query.podchannelId;

  return (
    <div className="h-full w-64 overflow-y-auto bg-gray-700 p-4">
      <ul className="flex flex-col gap-2">
        {data &&
          data.map((podchannel) => (
            <Link
              key={podchannel.id}
              href={`/channel/${channelID}/${podchannel.id}`}
            >
              <Button
                className={`w-full text-black rounded px-4 py-2 ${podchannelID == podchannel.id ? "bg-blue-500" : "bg-white"}`}
              >
                {podchannel.name}
              </Button>
            </Link>
          ))}
      </ul>
    </div>
  );
}
