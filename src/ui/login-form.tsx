"use client";

import { handleSignIn } from "@/lib/cognitoActions";
import Link from "next/link";
import {Button, Center, Group, Space, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useRouter} from "next/navigation";


export default function LoginForm() {
    const router = useRouter();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is not valid'),
           password: (value) => (value ? null : 'Password is required'),
        },
    });
    return (
        <form onSubmit={form.onSubmit(async (values) => {
            const res = await handleSignIn(values)
            console.log(res)
            router.push(res?.redirectLink || '')
        })} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <Center>
                    <Title order={3}>
                        Please log in to continue.
                    </Title>
                </Center>
                <Space h="sm" />
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="Password"
                    type="password"
                    placeholder="*****"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />


                <Group justify="flex-center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
                <div className="flex justify-center">
                    <Link
                        href="/auth/signup"
                        className="mt-2 cursor-pointer text-blue-500"
                    >
                        {"Don't have an account? "} Sign up.
                    </Link>
                </div>
            </div>
        </form>
    );
}
