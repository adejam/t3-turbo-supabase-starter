'use client'

import type { z } from 'zod'
import React, { useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FlagIcon } from 'lucide-react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../ui/src/form'
import { Input } from '../../../../ui/src/input'
import { loginAction } from '../action'
import { loginSchema } from '../lib/schema'
import SubmitButton from './submit-button'

type FormValues = z.output<typeof loginSchema>

const LoginForm = () => {
  const [state, formAction] = useFormState(loginAction, {
    message: '',
  })
  const searchParams = useSearchParams()
  const redirectFrom = searchParams.get('redirectFrom') ?? '/dashboard'

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      email: '',
      redirectFrom: redirectFrom.replaceAll('//', '/'),
      ...(state.fields ?? {}),
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Form {...form}>
      <div className="items-center justify-center p-6 lg:flex lg:p-10">
        <form
          ref={formRef}
          className="mx-auto max-w-sm space-y-6 lg:w-[400px] lg:max-w-none"
          action={formAction}
          onSubmit={async (evt) => {
            evt.preventDefault()
            await form.handleSubmit(() => {
              formAction(new FormData(formRef.current ?? undefined))
            })(evt)
          }}
        >
          <div className="space-y-2 text-center">
            <Link className="inline-block" href="#">
              <FlagIcon className="mx-auto h-10 w-10" />
              <span className="sr-only">Home</span>
            </Link>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>

          {typeof state.success !== 'undefined' && state.success === false && (
            <div className="text-center text-red-500">{state.message}</div>
          )}
          <FormField
            control={form.control}
            name="redirectFrom"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input id="redirectFrom" type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="email"
                      {...field}
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
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton className="w-full" type="submit">
              Sign in
            </SubmitButton>
            <p className="space-x-1 text-center text-sm">
              <span>Don&nbsp;t have an account?</span>
              <Link className="text-primary underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default LoginForm
