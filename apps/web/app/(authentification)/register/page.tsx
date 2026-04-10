"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { UserServices } from "@/services/userServices";
import { useForm } from "react-hook-form";
import { SignupFormData, SignupSchema } from "@/validators/user-validator";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/ui/form";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";
import { Loader } from "lucide-react";

export default function RegisterPage() {
  const formData = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: SignupFormData) => {
    setError("");

    setLoading(true);

    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const result = await UserServices.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result) {
        router.push("/login?message=Inscription réussie");
      } else {
        setError(result.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Inscription</CardTitle>
          <CardDescription className="text-gray-400">
            Créez votre compte pour accéder à l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formData}>
            <form
              onSubmit={formData.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormTextfield
                form={formData}
                label="Nom"
                placeholder="Entrer le nom"
                {...formData.register("name")}
              />

              <FormTextfield
                form={formData}
                label="Email"
                type="email"
                placeholder="Entrer l'email"
                {...formData.register("email")}
              />

              <FormTextfield
                form={formData}
                label="Mot de passe"
                type="password"
                placeholder="Entrer le mot de passe"
                {...formData.register("password")}
              />

              <FormTextfield
                form={formData}
                label="Confirmer le mot de passe"
                type="password"
                placeholder="Confirmer le mot de passe"
                {...formData.register("confirmPassword")}
              />

              {error && <div className="text-gray-400 text-sm">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-gray-100 text-black hover:bg-gray-200"
                disabled={loading}
              >
                {loading ? <Loader className="animate-spin" /> : "S'inscrire"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-400">
              Déjà un compte?{" "}
              <a href="/login" className="text-gray-300 hover:underline">
                Se connecter
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
