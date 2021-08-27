import React from "react";
import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export const CreateGame = ({
  num,
  setNum,
  cNameCount,
  maxNameLength,
  handleKeyDown,
  cName,
  setCName,
  createRoom,
}) => {
  const max = 8;
  const min = 2;
  const handleChange = (value) => setNum(value);

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
        Create A Game
      </Heading>
      <Flex direction="column" w="full" mb={4}>
        <Text mb={2}>Players:</Text>
        <NumberInput
          defaultValue={min}
          min={min}
          max={max}
          value={num}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text size="xs" mt={1} ml="auto">
          Max: {max}
        </Text>
      </Flex>
      <Flex direction="column" w="full" mt="auto">
        <Text mb={2}>Your name</Text>
        <Flex direction="column">
          <Input
            maxLength={`${maxNameLength}`}
            spellCheck="false"
            autoComplete="off"
            onKeyDown={(e) => handleKeyDown(e, cName)}
            onChange={(e) => setCName(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            className="input-field"
          />
          <Text
            {...(cNameCount === 0 && { color: "red.500" })}
            size="xs"
            mt={1}
            ml="auto"
          >
            {cNameCount}
          </Text>
        </Flex>
      </Flex>

      <Button
        mt={4}
        disabled={cName.length === 0}
        colorScheme="primary"
        onClick={createRoom}
      >
        Create Game
      </Button>
    </Flex>
  );
};
