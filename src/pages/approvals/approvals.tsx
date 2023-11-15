import { Navbar } from "@/components/navbar/navbar";
import { UserTypes } from "@/lib/userTypes";

export function Approvals() {
  return (
    <>
      <Navbar role={UserTypes.admin} />
    </>
  );
}