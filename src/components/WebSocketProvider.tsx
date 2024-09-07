import React, { createContext, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export type WebsocketMessage = {
  id: string;
  event: string;
  author_id: string;
  channel_id: string;
  message: string;
  created_at: string;
  podchannel_id: number;
};

interface WebSocketContextType {
  isConnected: boolean;
  sendJsonMessage: SendJsonMessage;
  liveMessages: { [key: string]: WebsocketMessage[] };
  sendJoinUser: (channelID: string) => void;
  markPodchannelAsVisited: (podchannelID: number) => void;
}

export const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  sendJsonMessage: () => {},
  liveMessages: {},
  sendJoinUser: () => {},
  markPodchannelAsVisited: () => {},
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const router = useRouter();
  const [liveMessages, setLiveMessages] = useState<{
    [key: string]: WebsocketMessage[];
  }>({});
  const [visitedPodchannel, setVisitedPodchannels] = useState<Set<number>>();

  const url = process.env.NEXT_PUBLIC_DB_URL;
  const websocketUrl = url?.replace(/^http/, "ws");

  const { sendJsonMessage, readyState, lastMessage, sendMessage } =
    useWebSocket(`${websocketUrl}/ws`, {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      share: true,
      retryOnError: true,
      shouldReconnect: () => true,

      onMessage: (event) => {
        const data: WebsocketMessage = JSON.parse(event.data);
        const key = `${data.channel_id}-${data.podchannel_id}`;

        if (data.event === "message") {
          if (visitedPodchannel?.has(data.podchannel_id)) {
            setLiveMessages((prev) => ({
              ...prev,
              [key]: [...(prev[key] || []), data],
            }));
          }
        }
      },
      onError: (error) => {
        console.error("ERROR WebSocket:", error);
      },
      onClose: () => {
        console.log("WebSocket connection closed.");
      },
    });

  const sendJoinUser = (channelID: string) => {
    sendJsonMessage({
      event: "join_podchannel",
      channel_id: Number(channelID),
    });
  };

  const isConnected = readyState === ReadyState.OPEN;
  const markPodchannelAsVisited = (podchannelID: number) => {
    setVisitedPodchannels((prev) => new Set(prev).add(podchannelID));
  };

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        sendJsonMessage,
        liveMessages,
        sendJoinUser,
        markPodchannelAsVisited,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
