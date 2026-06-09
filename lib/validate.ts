import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address").max(254);

export const waitlistBodySchema = z.object({
  email: emailSchema,
  source: z.string().max(100).optional(),
  referrer: z.string().max(500).optional(),
  company: z.string().optional(), // honeypot
});

export type WaitlistBody = z.infer<typeof waitlistBodySchema>;
