import Router from "next/router";
import { signIn } from "next-auth/react";

export async function handleAddGroup(name: string) {
  try {
    const res = await fetch("/api/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.push("/app/chats/" + result.id);
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleAddDirect(email: string) {
  try {
    const res = await fetch("/api/direct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.push("/app/chats/" + result.id);
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleInvite(email: string, chatId: number) {
  try {
    const res = await fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, chatId: chatId }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.reload();
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleChangeName(name: string) {
  try {
    const res = await fetch("/api/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.reload();
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleChangePassword(
  oldPassword: string,
  newPassword: string,
) {
  try {
    const res = await fetch("/api/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.reload();
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleSendMessage(message: string, chatId: number) {
  try {
    if (message.length < 1) {
      throw new Error("Empty message");
    }
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message, chatId: chatId }),
    });
    const result = await res.json();
    if (res.status !== 200) {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleLeave(chatId: number) {
  try {
    const res = await fetch("/api/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId: chatId }),
    });
    const result = await res.json();
    if (res.status === 200) {
      Router.push("/app");
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleRegister(
  email: string,
  name: string,
  password: string,
  callbackUrl: string,
) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, name: name, password: password }),
    });
    const result = await res.json();

    if (res.status === 200) {
      signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: callbackUrl,
      });
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function handleSignIn(
  email: string,
  password: string,
  callbackUrl: string,
) {
  signIn("credentials", {
    email: email,
    password: password,
    callbackUrl: callbackUrl,
  });
}
