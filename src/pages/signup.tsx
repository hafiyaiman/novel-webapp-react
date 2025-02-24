import { Logo } from "@/components/icons";
import GuestLayout from "@/layouts/guest";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { RadioGroup, Radio } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

export const phoneCountries = [
    { key: "+1", label: "United States" },
    { key: "+44", label: "United Kingdom" },
    { key: "+33", label: "France" },
    { key: "+49", label: "Germany" },
    { key: "+61", label: "Australia" },
    { key: "+65", label: "Singapore" },
    { key: "+1 876", label: "Jamaica" },
    { key: "+7 495", label: "Russia" },
    { key: "+86", label: "China" },
    { key: "+90", label: "Turkey" },
    { key: "+971", label: "United Arab Emirates" },
];

export default function SignUpPage() {
    const [countryCode, setCountryCode] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit");
    };

    return (
        <GuestLayout>
            <div className="flex flex-col items-center pb-4">
                <Logo size={60} />
                <p className="text-xl font-medium">Sign Up</p>
                <p className="text-small text-default-500">Seems you are new here, Let's set up your profile.</p>
            </div>

            <Form className="flex flex-col gap-5" validationBehavior="native" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <Input
                        isRequired
                        label="First Name"
                        name="firstName"
                        placeholder="Enter your first name"
                        type="text"
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter your last name"
                        type="text"
                        variant="bordered"
                    />
                </div>
                <div className="flex border border-2 rounded-large w-full">
                    <Select
                        className="max-w-[120px]"
                        isRequired
                        label="Country Code"
                        placeholder="Select a country code"
                        selectedKeys={countryCode}
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

                <Input
                    isRequired
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                />

                <RadioGroup size="sm" isRequired label="Select your gender" orientation="horizontal">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </RadioGroup>

                <Button className="w-full text-white" color="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p className=" text-center text-small">
                Already have an account?&nbsp;
                <Link href="/signin" size="sm">
                    Sign In
                </Link>
            </p>
        </GuestLayout >
    );
}

