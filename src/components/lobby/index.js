import React, { useState } from "react";
import { Stack, Flex } from "@chakra-ui/react";
import { api } from "../../server";
import { CreateGame } from "./CreateGame";
import { JoinGame } from "./JoinGame";

const Lobby = ({ history }) => {
  const maxNameLength = 12;
  const roomIDLength = 6;

  const [room, setRoom] = useState("");
  const [jName, setJName] = useState("");
  const jNameCount = maxNameLength - jName.length;
  const [num, setNum] = useState(2);
  const [cName, setCName] = useState("");
  const cNameCount = maxNameLength - cName.length;
  const [errMsg, setErrMsg] = useState("");

  // restrict inputs, specifically spaces (inspired by https://secret-hitler.online/)
  const handleKeyDown = (e, text) => {
    if (e.key === " ") {
      if (text) {
        if (
          text.length === 0 ||
          text.substring(text.length - 1, text.length) === " "
        ) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }
  };

  // store user information to localStorage to use later when we arrive at the room
  const saveInfo = (name, id, credentials) => {
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    localStorage.setItem("credentials", credentials);
  };

  const createRoom = () => {
    api.createRoom(num).then((roomID) => {
      joinRoom(roomID, cName);
    });
  };

  const joinRoom = async (roomID, name) => {
    try {
      const players = await api.getPlayers(roomID);
      const uniqueName =
        players
          .filter((player) => player.name)
          .map((player) => player.name)
          .indexOf(name) === -1;
      if (uniqueName) {
        // find first empty seat
        const id = players.find((player) => !player.name).id;
        api.joinRoom(roomID, id, name).then((credentials) => {
          saveInfo(name, id, credentials);
          history.push("/rooms/" + roomID);
        });
      } else {
        // handle name conflict error
        setErrMsg("name already taken!");
        setJName("");
        document.getElementById("joinName").value = "";
      }
    } catch (err) {
      /*
       * --- TO-DO: setErrMsg("room is full") here if that's the case. currently it's "room does not exist" in both cases ---
       */
      setErrMsg("room does not exist!");
      setRoom("");
      document.getElementById("roomIdentification").value = "";
    }
  };

  const createProps = {
    num,
    setNum,
    cNameCount,
    maxNameLength,
    handleKeyDown,
    cName,
    setCName,
    createRoom,
  };

  const joinProps = {
    roomIDLength,
    handleKeyDown,
    setRoom,
    jNameCount,
    maxNameLength,
    jName,
    setJName,
    room,
    joinRoom,
  };

  const errProps = {
    errMsg,
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      mx="auto"
      alignSelf="center"
      spacing={8}
    >
      <CreateGame {...createProps} />
      <JoinGame {...joinProps} />
      {errMsg && <ErrorMessage {...errProps} />}
    </Stack>
  );
};

const ErrorMessage = ({ errMsg }) => {
  return <Flex>{errMsg}</Flex>;
};

export default Lobby;
