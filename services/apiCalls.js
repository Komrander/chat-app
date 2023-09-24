import Router from "next/router";
import { signIn } from "next-auth/react";

async function handleAddGroup(name) {
  try {
    const res = await fetch("/api/group", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.push('/app/chats/'+result.id);
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleAddDirect(email) {
  try {
    const res = await fetch("/api/direct", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.push('/app/chats/'+result.id);
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleInvite(email) {
  try {
    const res = await fetch("/api/invite", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.reload(window.location.pathname)
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleChangeName(name) {
  try {
    const res = await fetch("/api/name", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.reload(window.location.pathname)
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleChangePassword(oldPassword, newPassword) {
  try {
    const res = await fetch("/api/password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.reload(window.location.pathname)
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleSendMessage(message) {
  try {
    if (message.length < 1) {
      throw new Error("Empty message");
    }
    const res = await fetch("/api/message", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    });
    const result = await res.json();
    if (res.status != 200) {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleLeave(chatId) {
  try {
    const res = await fetch("/api/leave", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId: chatId }),
    });
    const result = await res.json();
    if (res.status == 200) {
        Router.push('/app');
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleRegister(email, name, password, callbackUrl) {
  try {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, name: name, password: password }),
    });
    const result = await res.json();
    if (res.status == 200) {
      await signIn("credentials", { email: email, password: password, callbackUrl: callbackUrl })
    } else {
      throw new Error(result.data);
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleSignIn(email, password, callbackUrl) {
  signIn("credentials", { email: email, password: password, callbackUrl: callbackUrl });
}

export {handleAddGroup, handleAddDirect, handleInvite, handleChangeName, handleChangePassword, handleSendMessage, handleLeave, handleRegister, handleSignIn};