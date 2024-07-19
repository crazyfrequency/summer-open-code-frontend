'use client'

import { checkErrorMessage } from "@/api/error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_TOASTER } from "@/constants/seo.constants";
import { authService } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string()
    .min(5, "Имя должно содержать не менее 5 символов")
    .max(50, "Имя должно содержать не более 50 символов")
    .refine(v => v.match(/^[a-zA-Z0-9_]+$/), {
      message: "Только латинские буквы, цифры и нижнее подчеркивание"
    }),
  password: z.string().min(5, "Пароль должен содержать не менее 5 символов")
  .max(50, "Пароль должен содержать не более 50 символов"),
})

export default function SignIn() {
  const router = useRouter();
  const { next } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let response = await authService.login(values.username, values.password);

    let status = checkErrorMessage(response);

    if (status.ok) {
      toast.success("Вы вошли в админ панель");
      router.replace(typeof next === "string" ? next : "/")
    } else {
      toast.error("Не удалось войти в админ панель", {
        description: status.message,
        ...DEFAULT_TOASTER
      });
    }
  };

  return (
    <Card className="lg:min-w-96">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>Войдите чтобы попасть в админ панель</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit) }>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input placeholder="username" onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        document.getElementsByName("password")?.item(0)?.focus();
                      }
                    }} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Войти</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
