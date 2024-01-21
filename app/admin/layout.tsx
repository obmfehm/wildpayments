import { Card, CardBody, Container, Divider } from "@chakra-ui/react";
import React from "react";
import Nav from "../components/Nav";
import { ISessionUser } from "../utils/authorize";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

type Props = {
  children: React.ReactNode;
};
const AdminDashboardLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if ((session?.user as ISessionUser).role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <main>
      <Container maxW={1400}>
        <Card>
          <CardBody>
            <Nav />
            <Divider marginY={4} />
            {children}
          </CardBody>
        </Card>
      </Container>
    </main>
  );
};

export default AdminDashboardLayout;
