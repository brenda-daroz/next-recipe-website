"use client";
import { useEffect, useState } from "react";
import { signin } from "../actions/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useSession } from "../lib/context/SessionContext";


export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_user, setUser] = useState({});
  const { user, loading } = useSession();

  useEffect(() => {
    if (user) {
      redirect("/admin");
    }
  }, [user]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await signin({
      email,
      password,
    });
    console.log("response", response);
    if (response && response.user) {
      setUser(response.user);
      redirect("/admin");
    } else {
      console.log(response?.message);
    }
  };

  return loading ? (
    <div className="text-lg">Loading...</div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm p-6 shadow-xl rounded-2xl border h-1/2">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 padding-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
