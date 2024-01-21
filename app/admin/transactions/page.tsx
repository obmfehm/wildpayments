"use client";
import { IPartialCustomer } from "@/app/components/CustomersTable";
import TransactionsTable from "@/app/components/TransactionsTable";
import ITransaction from "@/app/interfaces/ITransaction";
import { Box, Flex, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<string>();
  const [customers, setCustomers] = useState<IPartialCustomer[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/get-all-customers");
        const data: IPartialCustomer[] = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `/api/get-all-transactions?customerId=${selectedCustomer ?? ""}`
        );
        const data: ITransaction[] = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [selectedCustomer]);

  if (loading) {
    return "Loading";
  }

  return (
    <Box>
      <Flex marginBottom={4} justifyContent="space-between" alignItems="center">
        <Select
          width="70%"
          onChange={(e) => setSelectedCustomer(e.target.value)}
          placeholder="Filter by customer"
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Select>
        <RadioGroup>
          <Stack direction="row">
            <Radio value="last-thirty">Last 30</Radio>
            <Radio value="all">All</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <TransactionsTable transactions={transactions} />
    </Box>
  );
};

export default TransactionsPage;
