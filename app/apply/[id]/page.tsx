"use client";
import { useApply, useGetJob, useGetUser } from "@/app/hooks/hooks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import React from "react";
import { LoaderIcon } from "react-hot-toast";

const applicationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  address: z.string(),
  companyName: z.string(),
  position: z.string(),
  cv: z.string(),
});

/**
 * Form component for job applicants to submit their application.
 * Uses React Hook Form and zod for validation.
 * Submits the form data to the apply mutation.
 */

const Apply = ({ params: { id } }: { params: { id: string } }) => {
  const jobApply = useGetJob(Number(id));
  const { data } = useGetUser();
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: `${data?.givenName as string} ${data?.familyName as string}`,
      email: data?.email as string,
      address: data?.address as string,
      companyName: jobApply?.data?.companyName,
      position: jobApply?.data?.title,
    },
  });

  React.useEffect(() => {
    form.reset({
      fullName: `${data?.givenName as string} ${data?.familyName as string}`,
      email: data?.email as string,
      address: data?.address as string,
      companyName: jobApply?.data?.companyName,
      position: jobApply?.data?.title,
    });
  }, [
    data?.givenName,
    data?.familyName,
    data?.email,
    data?.address,
    jobApply?.data?.companyName,
    jobApply?.data?.title,
  ]);

  const apply = useApply();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => apply.mutate())}
        className="space-y-8 p-10 md:w-fit"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input className="border-black border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="border-black border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input className="border-black border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input readOnly className="border-black border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input readOnly className="border-black border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV</FormLabel>
              <FormControl>
                <Input
                  className="border-black border-2"
                  {...field}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-blue-800 w-full" type="submit">
          {apply.isPending ? <LoaderIcon /> : "Apply"}
        </Button>
      </form>
    </Form>
  );
};
export default Apply;
