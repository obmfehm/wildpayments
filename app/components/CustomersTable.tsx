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
import ICustomer from "../interfaces/ICustomer";

export interface IPartialCustomer extends Partial<ICustomer> {
  id: string;
  name: string;
  _count: {
    transactions: number;
  };
}

interface Props {
  customers: IPartialCustomer[];
}

const CustomersTable = ({ customers }: Props) => {
  if (!customers.length) {
    return "No customers found";
  }
  return (
    <TableContainer maxH="60vh" overflowY="auto">
      <Table variant="simple" position="relative">
        <Thead pos="sticky" top={0} bg="white" zIndex={10}>
          <Tr>
            <Th>Company</Th>
            <Th>Payments made</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody overflowY="scroll">
          {customers.map((customer) => (
            <Tr key={customer.id}>
              <Td>{customer.name}</Td>
              <Td>{customer._count.transactions}</Td>
              <Td>
                <Link href={`/admin/customers/${customer.id}`}>
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

export default CustomersTable;
