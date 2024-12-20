'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import OTPModal from './OTPModal';
import { createAccount, signInUser } from '@/lib/actions/user.actions';

type FormType = "sign-in" | "sign-up";

const AuthForm = ({ type }: { type: FormType}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user = type === 'sign-up'
        ? await createAccount({
            email: values.email,
            fullName: values.fullName || "",
          })
        : await signInUser({ email: values.email });


      setAccountId(user.accountId);
    } catch (error) {
      console.error(error);
      setErrorMessage(type === 'sign-up' ? "Failed to create account" : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
          {type === 'sign-up' ? 'Storify Your Files😁!' : 'Storify your files😁!'}
        </h1>

        {type === 'sign-up' && (
          <CustomInput
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="Full Name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        )}
        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <Button
          type="submit"
          className="form-submit-button"
          disabled={isLoading}
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}

          {isLoading && (
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
              className="ml-2 animate-spin"
            />
          )}
        </Button>   
        {errorMessage && (
          <p className="form-error-message">{errorMessage}</p>
        )} 
        <div className="body-2 flex justify-center">
          <p className="text-light-100">
            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link 
            href={type === "sign-in" ? "/sign-up" : "/sign-in"} 
            className="ml-1 font-medium text-brand"
          >
            {" "}
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </form>
    </Form>
    {accountId && <OTPModal accountId={accountId} email={form.getValues('email')} />}
    </>
  )
}

export default AuthForm
