import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const { userId } = await auth();
  if (userId != null) redirect('/dashboard/calendar')

  return (
    <div>HomePage</div>
  );
}

//could add UserButton from clerk for user manage account option
