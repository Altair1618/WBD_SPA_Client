import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";

import { Brand } from "@/components/brand/brand";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "@/lib/auth";

const formSchema = z.object({
  credentials: z.string(),
  password: z.string(),
});

export function Login() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      credentials: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `${import.meta.env.VITE_REST_SERVICE}/login`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setToken(res.data.token);
          navigate('/');
        } else {
          toast.error(res.message);
        }
      });
  }

  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center gap-[45px] px-[35px]">
      <Brand size="large" clickable={false} />

      <div className="flex w-full max-w-[450px] flex-col justify-center gap-[35px] rounded-[20px] bg-white px-5 py-8">
        <p className="text-center text-2xl font-bold">SIGN IN</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex flex-col gap-2.5">
              <FormField
                control={form.control}
                name="credentials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Masukkan Username atau Email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="password"
                        placeholder="Masukkan Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="rounded-full bg-blue-700 text-sm font-bold text-white"
            >
              SIGN IN
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm">
          Belum memiliki akun?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
