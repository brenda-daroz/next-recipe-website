"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useSession } from "../lib/context/SessionContext";

export default function AuthForm() {
  const [mode, setMode] = useState<"signin">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let response;
      if (mode === "signin") {
        response = await signin({ email, password });
      }

      if (response?.message) {
        setError(response.message);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    }
  };

  return loading ? (
    <div className="text-lg">Loading...</div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm p-6 shadow-xl rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          </CardContent>
          <CardFooter className="flex justify-between pt-2 items-center">
            <Button type="submit">Sign In</Button>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
