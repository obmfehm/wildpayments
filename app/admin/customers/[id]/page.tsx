"use client";

import TransactionsTable from "@/app/components/TransactionsTable";
import ICustomer from "@/app/interfaces/ICustomer";
import ITransaction from "@/app/interfaces/ITransaction";
import {
  Button,
  Flex,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ICustomerWithTransactions extends ICustomer {
  transactions: ITransaction[];
}

const CustomerPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<ICustomerWithTransactions>();
  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/get-customer?id=${params.id}`);
        const data: ICustomerWithTransactions = await res.json();
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading || !customer) {
    return "Loading";
  }

  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
      <Heading marginTop={8} marginBottom={4}>
        {customer.name}
      </Heading>
      <Flex flexDir="column">
        <Stat>
          <StatLabel>{customer.country.toUpperCase()}</StatLabel>
          <StatLabel>{customer.address}</StatLabel>
          <StatHelpText>
            {customer.zip}, {customer.city}
          </StatHelpText>
        </Stat>
      </Flex>
      <TransactionsTable
        transactions={customer.transactions}
        withoutCustomerName
      />
    </div>
  );
};

export default CustomerPage;
