import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
      <form className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end">
        <label htmlFor="userName">Username</label>
        <Input
          id="userName"
          pattern="\S*"
          placeholder="Username"
          ref={userNameRef}
          required
          autoFocus
        />
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          ref={emailRef}
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          ref={passwordRef}
        />
        <Button type="submit" className="col-span-full">
          Sign Up
        </Button>
      </form>
    </>
  );
}
