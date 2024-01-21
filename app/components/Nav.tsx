"use client";
import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    href: "/admin/transactions",
    text: "Transactions",
  },
  {
    href: "/admin/customers",
    text: "Customers",
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <Box display="flex" gap={2}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button
            colorScheme={pathname.startsWith(link.href) ? "blue" : undefined}
          >
            {link.text}
          </Button>
        </Link>
      ))}

      <Button marginLeft="auto" onClick={() => signOut()}>
        Log out
      </Button>
    </Box>
  );
};

export default Nav;
