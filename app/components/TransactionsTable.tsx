"use client";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import ITransaction from "../interfaces/ITransaction";
import formatAmount from "../utils/formatAmount";
import formatDate from "../utils/formatDate";

type Props = {
  transactions: ITransaction[];
  withoutCustomerName?: boolean;
};
const TransactionsTable = ({
  transactions,
  withoutCustomerName = false,
}: Props) => {
  const [view, setView] = useState("last-thirty");

  if (!transactions.length) {
    return "No transactions found";
  }

  return (
    <TableContainer maxH="60vh" overflowY="auto">
      <Table variant="simple" position="relative">
        <Thead pos="sticky" top={0} bg="white" zIndex={10}>
          <Tr>
            {!withoutCustomerName && <Th>From</Th>}
            <Th>To</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody overflowY="scroll">
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              {!withoutCustomerName && <Td>{transaction.customerName}</Td>}
              <Td>{transaction.receiver}</Td>
              <Td>{formatDate(transaction.createdAt)}</Td>
              <Td>{formatAmount(transaction.amount, transaction.currency)}</Td>
              <Td>
                <Link href={`/admin/transactions/${transaction.id}`}>
                  <Button colorScheme="blue">View</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
