import { getChannels } from "@/shared/swagger/generated";
import { useQuery } from "@tanstack/react-query";

import { Button } from "./ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export default function NavBar() {
  const router = useRouter();
  const channelID = router.query.id;

  const { data: channels, isPending } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannels(),
    initialData: [],
  });

  return (
    <nav className="w-24 absolute  h-[100vh] justify-center  text-white border-r-red-400 border-r-2">
      <ul className="flex flex-col  items-center gap-4">
        {isPending ? (
          <Skeleton className=" h-[100vh] w-full animate-pulse bg-orange-100 duration-700" />
        ) : (
          channels &&
          channels?.map((channel) => (
            <Link key={channel.id} href={`/channel/${channel.id}`}>
              <li className="" key={channel?.id}>
                <Button
                  className={`rounded-full text-black px-4 py-2 ${channelID == channel.id ? "bg-red-950 text-white" : "bg-gray-200 hover:bg-red-950 hover:text-white"}`}
                >
                  {channel.name}
                </Button>
              </li>
            </Link>
          ))
        )}
      </ul>
    </nav>
  );
}
