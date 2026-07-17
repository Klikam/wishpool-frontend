import z from 'zod';

const min = 8;
const max = 20;
const minLengthErrorMessage = `Password must contain at least ${min.toString()} characters`;
const maxLengthErrorMessage = `Password must contain no more than ${max.toString()} characters`;
const uppercaseErrorMessage = `Password must contain at least one uppercase letter`;
const lowercaseErrorMessage = `Password must contain at least one lowercase letter`;
const numberErrorMessage = `Password must contain at least one number`;
const specialCharacterErrorMessage = `Password must contain at least one special character`;

const passwordSchema = z
  .string()
  .min(min, { message: minLengthErrorMessage })
  .max(max, { message: maxLengthErrorMessage })
  .refine(password => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine(password => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine(password => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine(password => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const CredentialsSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: passwordSchema,
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export interface CredentialsState {
  emailForm: Credentials;
  setEmailForm: (emailForm: Credentials) => void;
}

export type Mode = 'signin' | 'register';
