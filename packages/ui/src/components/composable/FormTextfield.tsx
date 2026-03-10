
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormTextfieldProps {
  form: UseFormReturn<any>;
  type?: string;
  step?: string | number;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function FormTextfield({
  form,
  type = "text",
  step,
  name,
  label,
  placeholder,
  description,
  className,
}: FormTextfieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "number" ? (
              <Input
                type="number"
                step={step}
                placeholder={placeholder}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            ) : type === "textarea" ? (
              <Textarea
                className={className}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FormTextSelectProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  options: {
    value: string;
    text: string;
  }[];
  placeholder?: string;
}

export function FormTextSelect({
  form,
  name,
  label,
  options,
  placeholder,
}: FormTextSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-2 border-primary/20 rounded-sm ">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((item, idx) => (
                <SelectItem key={idx} value={item.value}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
