"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { UserServices } from "@/services/userServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "@/validators/user-validator";
import { Form } from "@repo/ui/components/ui/form";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const formData = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state: { isAuthenticated: any }) => state.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: SignInFormData) => {
    setError("");
    setLoading(true);

    try {
      await UserServices.login({
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formData}>
            <form
              onSubmit={formData.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormTextfield
                form={formData}
                label="Email"
                placeholder="Entrer votre nom"
                type="email"
                {...formData.register("email")}
              />
              <FormTextfield
                form={formData}
                label="Mot de passe"
                placeholder="Entrer votre mot de passe"
                type="password"
                {...formData.register("password")}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Se connecter"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Pas de compte?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                S'inscrire
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
