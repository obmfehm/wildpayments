"use client";
import { Button, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

const Unauthorized = () => {
  return (
    <Card m="auto">
      <CardBody>
        <Flex flexDir="column" gap={4}>
          <Heading>Unauthorized</Heading>
          <Button colorScheme="red" onClick={() => signOut()}>
            Sign out
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Unauthorized;
