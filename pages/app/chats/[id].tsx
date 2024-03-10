import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { GetServerSideProps } from "next";
import { useState } from "react";

import prisma from "@/lib/prisma";

import styles from "@/styles/App.module.css";

import Header from "@/components/header/header";
import Sidenav from "@/components/sidenav/sidenav";
import Sidemenu from "@/components/sidemenu/sidemenu";
import Chat from "@/components/chat/chat";
import Popup from "@/components/popup/popup";
import ChatInput from "@/components/chatInput/chatInput";

import { PopupContext } from "@/contexts/popupContext";

import { FullChat, PopupDisplay } from "@/types/types";
import Head from "next/head";

interface ChatPageProps {
  chats: FullChat[];
  chat: FullChat;
  chatId: number;
  userId: number;
  username: string;
  chatName: string;
}

export default function ChatPage(props: ChatPageProps) {
  const [popupDisplay, setPopupDisplay] = useState<PopupDisplay>("none");
  const displayChatName =
    props.chat.type == "GROUP" ? props.chat.name : "@" + props.chat.name;

  return (
    <>
      <Head>
        <title>{displayChatName}</title>
      </Head>
      <div className={styles.wrapper}>
        <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
          <Popup chatId={props.chatId} />
          <div className={styles.container}>
            <Sidenav chats={props.chats} chatId={props.chatId} />
            <div className={styles.main}>
              <Header chatName={props.chatName} />
              <div className={styles.chatContainer}>
                <div className={styles.innerChatContainer}>
                  <Chat
                    messages={props.chat.messages}
                    chatId={props.chatId}
                    userId={props.userId}
                  />
                  <ChatInput chatName={props.chatName} chatId={props.chatId} />
                </div>
                <Sidemenu chat={props.chat} chatName={props.chatName} />
              </div>
            </div>
          </div>
        </PopupContext.Provider>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email || typeof context.query.id !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const id = parseInt(context.query.id);
  const email = session.user.email as string;

  const user = await prisma.user.findUnique({
    where: { email: email },
    include: {
      chats: {
        include: {
          messages: {
            orderBy: {
              date: "desc",
            },
            take: 1,
          },
          participants: {
            where: {
              NOT: {
                email: email,
              },
            },
            select: {
              name: true,
            },
            take: 1,
          },
        },
      },
    },
  });

  if (!user) {
    return { notFound: true };
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id: id,
      participants: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      messages: {
        orderBy: {
          date: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        take: 50,
      },
    },
  });

  if (!chat) {
    return { notFound: true };
  }

  let chatName;
  if (chat.type === "DIRECT") {
    if (chat.participants[0].email == session.user.email) {
      chatName = chat.participants[1].name;
    } else {
      chatName = chat.participants[0].name;
    }
  } else {
    chatName = chat.name;
  }

  return {
    props: {
      chats: JSON.parse(JSON.stringify(user.chats)),
      chat: JSON.parse(JSON.stringify(chat)),
      chatId: id,
      userId: user.id,
      username: user.name,
      chatName: chatName,
    },
  };
};
