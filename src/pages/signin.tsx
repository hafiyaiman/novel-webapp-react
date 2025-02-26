import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Link } from "@heroui/link";
import { Logo } from "@/components/icons";
import { login as loginAPI } from "@/api/auth";
import { addToast } from "@heroui/toast";
import { AuthContext } from "@/context/AuthContext";

export default function SigninPage() {
    const { login } = useContext(AuthContext); // Store user data in context
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await loginAPI(email); // Call API
            login(response.user, response.token); // Store user info
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`); // Redirect
        } catch (error) {
            addToast({
                color: "danger",
                title: "Login Failed",
                description: error instanceof Error ? error.message : "An error occurred",
                timeout: 3000,
                shouldShowTimeoutProgess: true,
            });
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

            <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Input
                    isRequired
                    variant="bordered"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

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
