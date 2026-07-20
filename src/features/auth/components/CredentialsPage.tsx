import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useCredentialsStore } from '../store/useCredentialsStore';
import { CredentialsSchema, type Credentials } from '../types/credentials';
import CredentialsButton from './CredentialsButton';
import CredentialsField from './CredentialsField';

export default function CredentialsPage({
  onLogin,
}: {
  onLogin: (credentials: Credentials) => void;
}) {
  const { mode } = useCredentialsStore();
  const { changeMode } = useCredentialsStore((state) => state.actions);

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    onLogin(data);
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CredentialsSchema),
  });

  return (
    <>
      <div className="flex rounded-xl border border-border bg-secondary p-1 mb-5">
        <CredentialsButton
          label="Sign in"
          handleModeChange={() => {
            changeMode('signin');
          }}
        />
        <CredentialsButton
          label="Register"
          handleModeChange={() => {
            changeMode('register');
          }}
        />
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-3"
      >
        {mode === 'register' && (
          <CredentialsField
            label="Full name"
            field="name"
            placeholder="Emma Thornton"
            type="text"
            register={register}
          />
        )}

        <CredentialsField
          label="Email"
          field="email"
          placeholder="you@example.com"
          type="email"
          register={register}
        />

        <CredentialsField
          label="Password"
          field="password"
          placeholder="••••••••"
          type="password"
          register={register}
        />

        {errors.email?.message && (
          <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
            {errors.email.message}
          </p>
        )}

        {errors.name?.message && (
          <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
            {errors.name.message}
          </p>
        )}

        {errors.password?.message && (
          <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-[#3a1232] transition-colors mt-1"
        >
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </>
  );
}
