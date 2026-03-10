"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";

export type FormFieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select";
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  className?: string;
};

interface GenericFormProps {
  schema: z.ZodSchema;
  fields: FormFieldConfig[];
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  submitLabel?: string;
  loading?: boolean;
  className?: string;
}

export function GenericForm({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitLabel = "Submit",
  loading = false,
  className,
}: GenericFormProps) {
  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  });

  const renderField = (field: FormFieldConfig) => {
    const fieldType = field.type || "text";

    switch (fieldType) {
      case "textarea":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    className={field.className}
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  value={formField.value}
                >
                  <FormControl>
                    <SelectTrigger className={field.className}>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormTextfield
            key={field.name}
            form={form}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={fieldType}
            description={field.description}
            className={field.className}
          />
        );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${className || ""}`}
      >
        {fields.map(renderField)}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
