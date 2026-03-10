import z from "zod";

export const CreateOsintSearchSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  searchType: z.string().min(1, "Search type is required"),
  query: z
    .string()
    .min(1, "Query is required")
    .max(500, "Query must be less than 500 characters"),
  source: z
    .string()
    .max(100, "Source must be less than 100 characters")
    .optional(),
});

export const CreateHumanProfileSchema = z.object({
  name: z.string().max(200, "Name must be less than 200 characters").optional(),
  aliases: z
    .string()
    .max(500, "Aliases must be less than 500 characters")
    .optional(),
  dateOfBirth: z
    .string()
    .max(20, "Date of birth must be less than 20 characters")
    .optional(),
  placeOfBirth: z
    .string()
    .max(200, "Place of birth must be less than 200 characters")
    .optional(),
  profession: z
    .string()
    .max(200, "Profession must be less than 200 characters")
    .optional(),
  socialMedia: z
    .string()
    .max(1000, "Social media must be less than 1000 characters")
    .optional(),
  images: z
    .string()
    .max(2000, "Images must be less than 2000 characters")
    .optional(),
  knownAssociates: z
    .string()
    .max(2000, "Known associates must be less than 2000 characters")
    .optional(),
  locations: z
    .string()
    .max(2000, "Locations must be less than 2000 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  sources: z
    .string()
    .max(2000, "Sources must be less than 2000 characters")
    .optional(),
  riskScore: z.number().min(0).max(100).optional(),
});

export const CreateBuildingSchema = z.object({
  name: z.string().max(200, "Name must be less than 200 characters").optional(),
  address: z
    .string()
    .max(500, "Address must be less than 500 characters")
    .optional(),
  city: z.string().max(200, "City must be less than 200 characters").optional(),
  country: z
    .string()
    .max(200, "Country must be less than 200 characters")
    .optional(),
  buildingType: z
    .string()
    .max(100, "Building type must be less than 100 characters")
    .optional(),
  constructionYear: z
    .string()
    .max(10, "Construction year must be less than 10 characters")
    .optional(),
  architect: z
    .string()
    .max(200, "Architect must be less than 200 characters")
    .optional(),
  coordinates: z
    .string()
    .max(100, "Coordinates must be less than 100 characters")
    .optional(),
  owner: z
    .string()
    .max(200, "Owner must be less than 200 characters")
    .optional(),
  usage: z
    .string()
    .max(200, "Usage must be less than 200 characters")
    .optional(),
  images: z
    .string()
    .max(2000, "Images must be less than 2000 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  sources: z
    .string()
    .max(2000, "Sources must be less than 2000 characters")
    .optional(),
});

export const CreateObjectSchema = z.object({
  name: z.string().max(200, "Name must be less than 200 characters").optional(),
  category: z
    .string()
    .max(100, "Category must be less than 100 characters")
    .optional(),
  brand: z
    .string()
    .max(100, "Brand must be less than 100 characters")
    .optional(),
  model: z
    .string()
    .max(100, "Model must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional(),
  specifications: z
    .string()
    .max(2000, "Specifications must be less than 2000 characters")
    .optional(),
  images: z
    .string()
    .max(2000, "Images must be less than 2000 characters")
    .optional(),
  estimatedValue: z
    .string()
    .max(100, "Estimated value must be less than 100 characters")
    .optional(),
  rarity: z
    .string()
    .max(50, "Rarity must be less than 50 characters")
    .optional(),
  origin: z
    .string()
    .max(200, "Origin must be less than 200 characters")
    .optional(),
  sources: z
    .string()
    .max(2000, "Sources must be less than 2000 characters")
    .optional(),
});

export type CreateOsintSearchFormData = z.infer<typeof CreateOsintSearchSchema>;
export type CreateHumanProfileFormData = z.infer<
  typeof CreateHumanProfileSchema
>;
export type CreateBuildingFormData = z.infer<typeof CreateBuildingSchema>;
export type CreateObjectFormData = z.infer<typeof CreateObjectSchema>;
