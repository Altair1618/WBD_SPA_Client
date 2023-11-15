import { Navbar } from "@/components/navbar/navbar";
import { UserTypes } from "@/lib/userTypes";

export function Subscriptions() {
  return (
    <>
      <Navbar role={UserTypes.admin} />
    </>
  );
}