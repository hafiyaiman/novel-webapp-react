import { Logo } from "@/components/icons";
import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { InputOtp } from "@heroui/input-otp";
import React from "react";

export default function VerifyOtpPage() {
    const [otp, setOtp] = React.useState<string>("");

    return (
        <GuestLayout>
            <div className="flex flex-col items-center pb-4">
                <Logo size={60} />
                <p className="text-xl font-medium">Verify OTP</p>
                <p className="text-small text-default-500">We have sent an OTP to your email</p>
            </div>

            <Form className="flex w-full flex-col items-center gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const otpValue = formData.get("otp") as string | null;

                    if (otpValue) {
                        setOtp(otpValue);
                    }
                }}>

                <InputOtp
                    isRequired
                    size="lg"
                    aria-label="OTP input field"
                    length={4}
                    name="otp"
                    placeholder="Enter code"
                    variant="faded"
                />
                <Button size="sm" className="text-white w-full mt-2" type="submit" color="primary">
                    Submit
                </Button>
                {otp && <div className="text-small text-default-500">OTP submitted: {otp}</div>}
            </Form>
        </GuestLayout>
    )
}

