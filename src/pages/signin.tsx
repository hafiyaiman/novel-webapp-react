import React from "react";

import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Checkbox } from "@heroui/checkbox";
import { Icon } from "@iconify/react";

import { Select, SelectSection, SelectItem } from "@heroui/select";
import { Logo } from "@/components/icons";

export default function SigninPage() {
    const [countryCode, setCountryCode] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');


    const handleSignin = async () => {
        // Todo: Implement Signin logic
    };

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit");
    };

    return (
        <GuestLayout>
            {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                </div>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
                    <div className="flex gap-2">
                        <Select
                            className="w-40"
                            label="Country Code"
                            placeholder="Select a country code"
                            selectedKeys={countryCode}
                            variant="bordered"
                            onSelectionChange={setCountryCode}
                        >
                            {phoneCountries.map((country) => (
                                <SelectItem key={country.key}>{country.label}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            type="tel"
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Continue
                    </Button>
                </form>
            </section> */}
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
                />
                {/* <Input
                    isRequired
                    endContent={
                        <button type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <Icon
                                    className="pointer-events-none text-2xl text-default-400"
                                    icon="solar:eye-closed-linear"
                                />
                            ) : (
                                <Icon
                                    className="pointer-events-none text-2xl text-default-400"
                                    icon="solar:eye-bold"
                                />
                            )}
                        </button>
                    }
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                /> */}
                {/* <div className="flex w-full items-center justify-between px-1 py-2">
                    <Checkbox name="remember" size="sm">
                        Remember me
                    </Checkbox>
                    <Link className="text-default-500" href="#" size="sm">
                        Forgot password?
                    </Link>
                </div> */}
                <Button className="w-full mt-4 text-white" color="primary" type="submit">
                    Continue
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

