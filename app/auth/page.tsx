'use client'
import { signIn, useSession } from "next-auth/react";

export default function Session() {
 const {data: user, status}  = useSession()

  return (
    <div>
     <h1>Logged in as: {user?.user?.email}</h1>
    </div>
  );
}