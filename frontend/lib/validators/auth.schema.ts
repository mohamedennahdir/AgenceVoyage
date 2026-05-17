import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'Le prénom doit contenir au moins 2 caractères')
      .max(50, 'Prénom trop long'),
    lastName: z
      .string()
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(50, 'Nom trop long'),
    email: z
      .string()
      .min(1, 'L\'email est requis')
      .email('Adresse email invalide'),
    phone: z
      .string()
      .min(9, 'Numéro de téléphone invalide')
      .regex(/^(\+213|0)[5-7]\d{8}$/, 'Format attendu : +213XXXXXXXXX ou 0XXXXXXXXX'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    confirmPassword: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, 'Vous devez accepter les CGV'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Adresse email invalide'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
