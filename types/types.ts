import { ChatType, User } from "@prisma/client";

export type Message = {
  id: number;
  content: string;
  date: Date;
  chatId: number;
  userId: number;
  user: { name: string };
};

export type FullChat = {
  id: number;
  name: string;
  type: ChatType;
  participants: User[];
  messages: Message[];
};

export type PopupDisplay =
  | "add"
  | "addGroup"
  | "addDirect"
  | "invite"
  | "changeName"
  | "changePassword"
  | "settings"
  | "none";
