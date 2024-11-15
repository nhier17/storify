import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: "sign-in" | "sign-up"): z.ZodObject<{
  email: z.ZodString;
  fullName: z.ZodString;
}> => {
  return z.object({
    email: z.string().email(),
    fullName: type === 'sign-in' ? z.string().min(2, 'Full name is required') : z.string().min(2, 'Full name is required'),
  });
}
