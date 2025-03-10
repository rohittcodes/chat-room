import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";
import { auth } from "@/lib/auth";

export default async function Home() {
  const user = await auth();
  return (
    <div>
      {
        user ? (
          <div>
            <p>{user?.user?.email}</p>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )
      }
    </div>
  );
}
