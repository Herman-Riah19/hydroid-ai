import z from "zod";

export const CreateWeaponSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be less than 200 characters"),
  category: z.string().min(1, "Category is required"),
  subcategory: z
    .string()
    .max(100, "Subcategory must be less than 100 characters")
    .optional(),
  manufacturer: z
    .string()
    .max(200, "Manufacturer must be less than 200 characters")
    .optional(),
  country: z
    .string()
    .max(100, "Country must be less than 100 characters")
    .optional(),
  yearIntroduced: z
    .string()
    .max(10, "Year introduced must be less than 10 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  history: z
    .string()
    .max(10000, "History must be less than 10000 characters")
    .optional(),
  use: z.string().max(2000, "Use must be less than 2000 characters").optional(),
  caliber: z
    .string()
    .max(50, "Caliber must be less than 50 characters")
    .optional(),
  weight: z
    .string()
    .max(50, "Weight must be less than 50 characters")
    .optional(),
  length: z
    .string()
    .max(50, "Length must be less than 50 characters")
    .optional(),
  barrelLength: z
    .string()
    .max(50, "Barrel length must be less than 50 characters")
    .optional(),
  muzzleVelocity: z
    .string()
    .max(50, "Muzzle velocity must be less than 50 characters")
    .optional(),
  effectiveRange: z
    .string()
    .max(50, "Effective range must be less than 50 characters")
    .optional(),
  capacity: z
    .string()
    .max(50, "Capacity must be less than 50 characters")
    .optional(),
  action: z
    .string()
    .max(50, "Action must be less than 50 characters")
    .optional(),
  images: z
    .string()
    .max(2000, "Images must be less than 2000 characters")
    .optional(),
  videos: z
    .string()
    .max(2000, "Videos must be less than 2000 characters")
    .optional(),
  isAutomatic: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  sources: z
    .string()
    .max(2000, "Sources must be less than 2000 characters")
    .optional(),
});

export const UpdateWeaponSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  category: z.string().optional(),
  subcategory: z.string().max(100).optional(),
  manufacturer: z.string().max(200).optional(),
  country: z.string().max(100).optional(),
  yearIntroduced: z.string().max(10).optional(),
  description: z.string().max(5000).optional(),
  history: z.string().max(10000).optional(),
  use: z.string().max(2000).optional(),
  caliber: z.string().max(50).optional(),
  weight: z.string().max(50).optional(),
  length: z.string().max(50).optional(),
  barrelLength: z.string().max(50).optional(),
  muzzleVelocity: z.string().max(50).optional(),
  effectiveRange: z.string().max(50).optional(),
  capacity: z.string().max(50).optional(),
  action: z.string().max(50).optional(),
  images: z.string().max(2000).optional(),
  videos: z.string().max(2000).optional(),
  isAutomatic: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  sources: z.string().max(2000).optional(),
});

export type CreateWeaponFormData = z.infer<typeof CreateWeaponSchema>;
export type UpdateWeaponFormData = z.infer<typeof UpdateWeaponSchema>;
