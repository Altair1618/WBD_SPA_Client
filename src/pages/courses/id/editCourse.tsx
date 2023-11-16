"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Navbar } from "@/components/navbar/navbar";
import { UserTypes } from "@/lib/userTypes";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const formSchema = z.object({
  kode: z.string().regex(/^[A-Z]{2}\d{4}$/),
  nama: z.string(),
  deskripsi: z.string().optional(),
  kodeProgramStudi: z.string().regex(/^\d{3}$/),
});

export function EditCourse() {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const url = `${import.meta.env.VITE_REST_SERVICE}/courses/${id}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          form.setValue("kode", res.data.kode);
          form.setValue("nama", res.data.nama);
          form.setValue("deskripsi", res.data.deskripsi);
          form.setValue("kodeProgramStudi", res.data.kode_program_studi);
        } else {
          navigate("/courses");
          toast.error(res.message);
        }
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode: "",
      nama: "",
      deskripsi: "",
      kodeProgramStudi: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `${import.meta.env.VITE_REST_SERVICE}/courses/${id}`;

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        kode: values.kode,
        nama: values.nama,
        deskripsi: values.deskripsi,
        kode_program_studi: values.kodeProgramStudi,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          navigate("/courses");
          toast.success("Berhasil membuat mata kuliah");
        } else {
          toast.error(res.message);
        }
      });
  }

  function onCancel() {
    navigate("/courses");
    toast.success("Berhasil membatalkan pembuatan mata kuliah");
  }

  return (
    <>
      <Navbar role={UserTypes.pengajar} />

      <div className="mt-16 flex min-h-screen w-full flex-col gap-2.5 px-5 py-2.5">
        <p className="text-xs">Ubah Mata Kuliah Premium</p>

        <div className="flex h-full w-full flex-col items-center justify-center rounded-[20px] bg-white p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <div className="flex flex-col gap-2.5">
                <FormField
                  control={form.control}
                  name="kode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode</FormLabel>
                      <FormControl>
                        <Input
                          readOnly={true}
                          placeholder="Masukkan Kode Mata Kuliah"
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
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Masukkan Nama Mata Kuliah"
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
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Deskripsi Mata Kuliah"
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
                  name="kodeProgramStudi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Program Studi</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Masukkan Kode Program Studi"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row w-full items-center justify-center gap-10">
                <Button onClick={onCancel} className="rounded-full px-10 py-5 bg-red-700 text-sm font-bold text-white">
                  BATAL
                </Button>
                <Button
                  type="submit"
                  className="rounded-full px-10 py-5 bg-blue-700 text-sm font-bold text-white"
                >
                  SIMPAN
                </Button>
              </div>  
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
