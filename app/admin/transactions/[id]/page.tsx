"use client";
import ITransaction from "@/app/interfaces/ITransaction";
import formatAmount from "@/app/utils/formatAmount";
import formatDate from "@/app/utils/formatDate";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TransactionPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<ITransaction>();
  const router = useRouter();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/get-transaction?id=${params.id}`);
        const data: ITransaction = await res.json();
        setTransaction(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  if (loading || !transaction) {
    return "Loading";
  }

  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>

      <Flex gap={10} justifyContent="space-evenly">
        <Box flex={1}>
          <Heading marginTop={8}>Transaction #{params.id}</Heading>
          <Stat>
            <StatNumber>
              {formatAmount(transaction.amount, transaction.currency)}
            </StatNumber>
            <StatHelpText>{formatDate(transaction.createdAt)}</StatHelpText>
          </Stat>
        </Box>
        <Flex flexDir="column" gap={4} marginTop={8} flex={1}>
          <Flex gap={8}>
            <Stat>
              <StatLabel>From</StatLabel>
              <Link href={`/admin/customers/${transaction.customerId}`}>
                <StatNumber>{transaction.customerName}</StatNumber>
              </Link>
            </Stat>
            <Stat>
              <StatLabel>To</StatLabel>
              <StatNumber>{transaction.receiver}</StatNumber>
            </Stat>
          </Flex>
          <Stat>
            <StatLabel>Note</StatLabel>
            <StatHelpText>
              {transaction.note ? transaction.note : "No note was added"}
            </StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </div>
  );
};

export default TransactionPage;
