import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../UI/Form";
import { Input } from "../../UI/Input";
import { FormError, FormSuccess } from "../AuthFormMessage";

import AuthCard from "../AuthWrapper";
import { Loader2 } from "lucide-react";
import { registerNewAccount } from "../../../API";

const SignUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    name: z.string().min(1, "Username is required").max(100),
    organisation: z.string().min(1, "Organisation is required").max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(10, "Password must have atleast 10 characters")
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setError("");
    setSuccess("");
    setPending(true);

    await registerNewAccount(values)
      .then((data) => {
        if (data?.success) {
          setSuccess(data?.success);
        }

        if (data?.error) {
          setError(data?.error);
        }
      })
      .finally(() => {
        setPending(false);
        form.reset();
      });
  };

  return (
    <AuthCard
      headerLabel="Sign Up"
      messageLabel="Create your account now"
      backref="/login"
      backrefDescription="Have an account?"
      backrefMessage="Sign In"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormSuccess message={success} />
          <FormError message={error} />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a username"
                    {...field}
                    disabled={pending}  
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Organization</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your organization "
                    {...field}
                    disabled={pending} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a password"
                    type="password"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full h-auto mb-5">
                <FormLabel className="mb-1">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter password"
                    type="password"
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="w-full h-12 outline-none flex items-center justify-center rounded-md text-base font-semibold mb-7 border-2 border-transparent bg-sunbird-orange text-white hover:bg-opacity-90 transition-all ease-out duration-[0.3s]"
            disabled={pending}
          >
            {pending ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SignUpForm;
