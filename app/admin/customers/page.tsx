"use client";
import CustomersTable, {
  IPartialCustomer,
} from "@/app/components/CustomersTable";
import { useEffect, useState } from "react";

const CustomersPage = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<IPartialCustomer[]>([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/get-all-customers");
        const data: IPartialCustomer[] = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) {
    return "Loading";
  }

  return <CustomersTable customers={customers} />;
};

export default CustomersPage;
