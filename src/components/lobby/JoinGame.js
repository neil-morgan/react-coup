import React from "react";
import { Flex, Heading, Button, Text, Input } from "@chakra-ui/react";

export const JoinGame = ({
  roomIDLength,
  handleKeyDown,
  setRoom,
  jNameCount,
  maxNameLength,
  jName,
  setJName,
  room,
  joinRoom,
}) => {
  return (
    <Flex
      w="full"
      maxW="320px"
      direction="column"
      bg="base.d400"
      rounded={5}
      p={6}
    >
      <Heading textStyle="heading" size="lg" mb={8}>
        Join A Game
      </Heading>
      <Flex direction="column" w="full" mb={4}>
        <Text mb={2}>Game ID:</Text>

        <Input
          id="roomIdentification"
          maxLength={`${roomIDLength}`}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setRoom(e.target.value)}
        />
      </Flex>

      <Flex direction="column" w="full" mt="auto">
        <Text mb={2}>Your name</Text>
        <Flex direction="column">
          <Input
            maxLength={`${maxNameLength}`}
            spellCheck="false"
            autoComplete="off"
            onKeyDown={(e) => handleKeyDown(e, jName)}
            onChange={(e) => setJName(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          <Text
            {...(jNameCount === 0 && { color: "red.500" })}
            size="xs"
            mt={1}
            ml="auto"
          >
            {jNameCount}
          </Text>
        </Flex>
      </Flex>

      <Button
        mt={4}
        colorScheme="primary"
        disabled={room.length !== roomIDLength || jName.length === 0}
        onClick={() => joinRoom(room, jName)}
      >
        Join Game
      </Button>
    </Flex>
  );
};
