import { validateOtp, login as loginAPI } from "@/api/auth";
import { Logo } from "@/components/icons";
import { AuthContext } from "@/context/AuthContext";
import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { InputOtp } from "@heroui/input-otp";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/toast";
import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyOtpPage() {
    const { login } = useContext(AuthContext);
    // const [otp, setOtp] = useState<string>("");
    const [resendCountdown, setResendCountdown] = useState<number>(2 * 60);
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const otpValue = formData.get("otp") as string | null;

        if (email && otpValue) {
            try {
                const response = await validateOtp(email, otpValue);
                login(response.user, response.token);
                navigate(`/home`);
            } catch (error) {
                addToast({
                    color: "danger",
                    title: "Login Failed",
                    description: error instanceof Error ? error.message : "An error occurred",
                    timeout: 3000,
                    shouldShowTimeoutProgess: true,
                });
            }
        }
    };

    const handleResend = () => {
        setResendCountdown(2 * 60);
        if (email) {
            try {
                const response = loginAPI(email);
                console.log("Login Success:", response);


            } catch (error) {
                addToast({
                    color: "danger",
                    title: "Login Failed",
                    description: error instanceof Error ? error.message : "An error occurred",
                    timeout: 3000,
                    shouldShowTimeoutProgess: true,
                });
            }
        }
    };

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setResendCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatCountdown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <GuestLayout>
            <div className="flex flex-col items-center pb-4">
                <Logo size={60} />
                <p className="text-xl font-medium">Verify OTP</p>
                <p className="text-small text-default-500">We have sent an OTP to your email</p>
            </div>

            <Form className="flex w-full flex-col items-center gap-4"
                onSubmit={handleSubmit}>

                <InputOtp
                    isRequired
                    size="lg"
                    aria-label="OTP input field"
                    length={6}
                    name="otp"
                    placeholder="Enter code"
                    variant="faded"
                />

                <Button size="sm" className="text-white w-full " type="submit" color="primary">
                    Submit
                </Button>
            </Form>

            <p className="text-center text-small">
                Didn't receive the code?&nbsp;
                {resendCountdown > 0 ? (
                    <span className="text-default-300 cursor-not-allowed">{formatCountdown(resendCountdown)}</span>
                ) : (
                    <Link className="cursor-pointer" size="sm" onPress={handleResend}>
                        Resend
                    </Link>
                )}
            </p>
        </GuestLayout>
    )
}

