import Icon from "@/shared/assets/Icon";
import React from "react";
import s from "./navbarx.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { QueriesChannel } from "@/shared/swagger/generated";

type Props = {
  channel: QueriesChannel;
  paramId?: string | string[];
};

export default function ChannelsLogo({ channel, paramId }: Props) {
  return (
    <Link key={channel.id} href={`/channel/${channel.id}`}>
      <li className={s.channelWrap} key={channel?.id}>
        <div className={s.pin}>
          <span></span>
        </div>
        <div className={clsx(s.logo, channel.id == paramId && s.active)}>
          <Icon.DiscordLogo />
        </div>
      </li>
    </Link>
  );
}
