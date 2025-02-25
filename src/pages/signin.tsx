import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Link } from "@heroui/link";
import { Logo } from "@/components/icons";
import { login } from "@/api/auth";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await login(email);
            console.log("Login Success:", response);

            navigate(`/verify-otp?email=${encodeURIComponent(email)}`);

        } catch (err) {
            console.error("Login Failed:", err);
            setError("Failed to log in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GuestLayout>
            <div className="flex flex-col items-center pb-4">
                <Logo size={60} />
                <p className="text-xl font-medium">Welcome Back</p>
                <p className="text-small text-default-500">Log in to your account to continue</p>
            </div>

            <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button className="w-full text-white" color="primary" type="submit" isDisabled={loading}>
                    {loading ? "Logging in..." : "Continue"}
                </Button>
            </Form>

            <p className="text-center text-small">
                Need to create an account?&nbsp;
                <Link href="/signup" size="sm">
                    Sign Up
                </Link>
            </p>
        </GuestLayout>
    );
}
