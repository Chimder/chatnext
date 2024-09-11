import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getPodchannelMessage } from "@/shared/swagger/generated";
import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { WebSocketContext } from "@/components/WebSocketProvider";
import { z } from "zod";
import s from "./chatx.module.scss";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Chat() {
  const {
    isConnected,
    liveMessages,
    sendJsonMessage,
    markPodchannelAsVisited,
  } = useContext(WebSocketContext);
  const param = useRouter();
  const channelID = param.query.id;
  const podchannelID = param.query.podchannelId;
  const [inputValue, setInputValue] = useState<string>("");

  const chatContainerRef = useRef<HTMLUListElement>(null);
  const initialLoadRef = useRef(true);

  const key = `${channelID}-${podchannelID}`;

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (podchannelID) {
      markPodchannelAsVisited(Number(podchannelID));
    }
  }, [podchannelID]);

  const fetchMessages = async ({ pageParam = 1 }) => {
    const response = await getPodchannelMessage({
      podchannel_id: Number(podchannelID),
      limit: 20,
      page: pageParam,
    });
    return response;
  };

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["messages", podchannelID],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (!lastPage || lastPage.length < 19) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    initialPageParam: 1,
    enabled: !!podchannelID,
    refetchOnWindowFocus: false,
    staleTime: 800000,
    retry: 0,
    select: (data) => {
      const allMessages = data.pages.flat();
      const liveMessagesForCurrentChannel = liveMessages[key] || [];

      const mergedMessages = [...allMessages, ...liveMessagesForCurrentChannel]
        .sort(
          (a, b) =>
            new Date(a?.created_at!).getTime() -
            new Date(b?.created_at!).getTime()
        )
        .filter((m) => m !== null);
      return mergedMessages;
    },
  });

  useLayoutEffect(() => {
    if (initialLoadRef.current && messages && chatContainerRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
        initialLoadRef.current = false;
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  const validMessage = z
    .string()
    .min(1, { message: "Message cannot be empty" });

  const sendMessage = () => {
    try {
      validMessage.parse(inputValue);
      if (isConnected && inputValue.trim() !== "" && podchannelID) {
        sendJsonMessage({
          event: "message",
          message_id: uuidv4(),
          message: inputValue,
          created_at: new Date().toISOString(),
          channel_id: Number(channelID),
          podchannel_id: Number(podchannelID),
        });
        setInputValue("");
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(`${error.errors[0].code}: ${error.errors[0].message}`, {
          position: "top-center",
          duration: 2000,
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <section className={s.chat}>
      {isFetching && !isFetchingNextPage ? (
        <div className="relative px-4 pb-4">
          {Array.from({ length: 20 }, (_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              className="mb-2 bg-slate-300 p-8"
            />
          ))}
        </div>
      ) : (
        <>
          <ul
            ref={chatContainerRef}
            className="h-[100vh] space-y-4 overflow-y-auto px-4 pb-4"
          >
            {hasNextPage && (
              <div className="my-4 pt-1 flex justify-center">
                <Button
                  onClick={() => fetchNextPage()}
                  className="rounded bg-red-950 px-4 py-2 text-white"
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "load..." : "load old"}
                </Button>
              </div>
            )}

            {messages?.length === 0 ? (
              <h1>No messages</h1>
            ) : (
              messages &&
              messages.map((message) => (
                <li
                  key={`${message?.id}${message?.created_at}`}
                  className="mb-2 flex items-center justify-between border-2 border-red-400 p-4"
                >
                  <p>{message?.message}</p>
                  <span className="self-start text-xs">
                    {message &&
                      new Date(message?.created_at!).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </li>
              ))
            )}
          </ul>
        </>
      )}
      <div className=" relative bottom-0 mb-20 pb-[8vh] pt-1 mx-8 ml-4 h-11 ">
        <Textarea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter message"
          className="mb-2 mr-4 w-full border border-transparent rounded p-2 bg-gray-200 text-base placeholder-shown:border-red-800 focus:border-red-800 focus:outline-none"
          style={{ resize: "none", overflow: "auto", minHeight: "40px" }}
        />
      </div>
    </section>
  );
}
