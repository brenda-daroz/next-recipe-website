'use client'
import { useState } from "react";
import { signin } from "../actions/auth";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("SignupForm", email, password);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("handlesubmit", email, password);
        signin({
            email,
            password
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
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
                                // name="email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)} required />
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
export default SigninForm;