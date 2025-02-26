import { Logo } from "@/components/icons";
import GuestLayout from "@/layouts/guest";
import { UserRegistration } from "@/models/User";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { RadioGroup, Radio } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React, { useContext, useEffect, useState } from "react";
import { register, fetchCountryCode } from "@/api/auth";
import { addToast } from "@heroui/toast";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";


export default function SignUpPage() {
    const { login } = useContext(AuthContext);
    const [countryCode, setCountryCode] = useState("MY");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [phoneCountries, setPhoneCountries] = useState<{ key: string; label: string; code: string; dialCode: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCountryCodes() {
            try {
                const countries = await fetchCountryCode();
                console.log("Formatted Country Data:", countries);

                const formattedCountries = countries.map((country: any) => ({
                    key: country.code,
                    label: ` ${country.dialCode}`,
                    code: country.code,
                    dialCode: country.dialCode,
                }));
                setPhoneCountries(formattedCountries);
            } catch (error) {
                console.error("Failed to fetch country codes:", error);
                addToast({
                    color: "danger",
                    title: "Error",
                    description: error instanceof Error ? error.message : "An error occurred",
                    timeout: 3000,
                    shouldShowTimeoutProgess: true,
                });
            }
        }
        getCountryCodes();
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dialCode = phoneCountries.find((country) => country.key === countryCode)?.dialCode || "";

        const userData: UserRegistration = {
            firstName,
            lastName,
            email,
            phoneNumber: `${dialCode}${phoneNumber}`,
            gender,
            countryCode,
        };

        console.log("User Registration Data:", userData);

        try {
            const response = await register(userData);
            login(response.user, response.token);
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
            addToast({
                color: "success",
                title: "Success",
                description: "Registration successful!",
                timeout: 3000,
                shouldShowTimeoutProgess: true,
            });
        } catch (error: any) {
            addToast({
                color: "danger",
                title: "Error",
                description: error.message,
                timeout: 3000,
                shouldShowTimeoutProgess: true,
            });
        }
    };

    return (
        <GuestLayout>
            <div className="flex flex-col items-center pb-4">
                <Logo size={60} />
                <p className="text-xl font-medium">Sign Up</p>
                <p className="text-small text-default-500">Let's set up your profile.</p>
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        isRequired
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter your last name"
                        type="text"
                        variant="bordered"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="flex border border-2 rounded-large w-full">
                    <Select
                        className="max-w-[120px]"
                        isRequired
                        label="Country Code"
                        placeholder="Select a country code"
                        selectedKeys={[countryCode]}
                        onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0];
                            setCountryCode(selectedKey as string);
                        }}
                    >
                        {phoneCountries.map((country) => (
                            <SelectItem key={country.key} textValue={country.label}>
                                <div className="flex items-center gap-2">
                                    <Flag className="rounded-sm" code={country.code} style={{ width: '16px', height: '20px' }} />
                                    {country.label}
                                </div>
                            </SelectItem>

                        ))}
                    </Select>
                    <Input
                        isRequired
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <RadioGroup
                    size="sm"
                    className="text-sm"
                    isRequired
                    label="Select your gender"
                    orientation="horizontal"
                    onValueChange={setGender}
                >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </RadioGroup>

                <Button className="w-full text-white" color="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p className="text-center text-small">
                Already have an account?&nbsp;
                <Link href="/signin" size="sm">
                    Sign In
                </Link>
            </p>
        </GuestLayout>
    );
}

