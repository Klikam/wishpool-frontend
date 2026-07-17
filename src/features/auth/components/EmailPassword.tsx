import { UserArraySchema, type User } from '@/types/user';
import { storageHelper } from '@/utils/storageHelper';
import { useEmailPasswordStore } from '../store/useEmailPasswordStore';
import CredentialsField from './CredentialsField';
import CredentialsButton from './CredentialsButton';

interface EmailPasswordProps {
  onLogin: (user: User) => void;
}

export default function EmailPassword({ onLogin }: EmailPasswordProps) {
  const mode = useEmailPasswordStore(state => state.mode);
  const emailForm = useEmailPasswordStore(state => state.emailForm);
  const emailError = useEmailPasswordStore(state => state.emailError);
  const { setEmailForm, setEmailError, changeMode } = useEmailPasswordStore(
    state => state.actions,
  );

  function handleEmailSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setEmailError('');

    const users = storageHelper.load<User[]>(
      storageHelper.STORAGE_KEYS.users,
      [],
      UserArraySchema,
    );

    if (mode === 'register') {
      if (!emailForm.name.trim()) {
        setEmailError('Please enter your name.');
        return;
      }
      if (!emailForm.email.includes('@')) {
        setEmailError('Please enter a valid email.');
        return;
      }
      if (emailForm.password.length < 6) {
        setEmailError('Password must be at least 6 characters.');
        return;
      }
      if (
        users.find(u => u.email === emailForm.email && u.provider === 'email')
      ) {
        setEmailError(
          'An account with this email already exists. Sign in instead.',
        );
        return;
      }
      const newUser: User = {
        id: storageHelper.genId(),
        name: emailForm.name.trim(),
        email: emailForm.email.trim(),
        avatar: '',
        provider: 'email',
      };
      storageHelper.save(storageHelper.STORAGE_KEYS.users, [...users, newUser]);
      onLogin(newUser);
    } else {
      const existing = users.find(
        u => u.email === emailForm.email && u.provider === 'email',
      );
      if (!existing) {
        setEmailError('No account found. Register first.');
        return;
      }
      // In a real app password would be verified server-side; here we trust it
      onLogin(existing);
    }
  }

  return (
    <>
      <div className="flex rounded-xl border border-border bg-secondary p-1 mb-5">
        <CredentialsButton
          label="Sign in"
          mode="signin"
          handleModeChange={() => {
            changeMode('signin');
          }}
        />
        <CredentialsButton
          label="Register"
          mode="register"
          handleModeChange={() => {
            changeMode('register');
          }}
        />
      </div>

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
        {mode === 'register' && (
          <CredentialsField
            label="Full name"
            field="name"
            placeholder="Emma Thornton"
            type="text"
            emailForm={emailForm}
            setEmailForm={setEmailForm}
          />
        )}

        <CredentialsField
          label="Email"
          field="email"
          placeholder="you@example.com"
          type="email"
          emailForm={emailForm}
          setEmailForm={setEmailForm}
        />

        <CredentialsField
          label="Password"
          field="password"
          placeholder="••••••••"
          type="password"
          emailForm={emailForm}
          setEmailForm={setEmailForm}
        />

        {emailError && (
          <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2">
            {emailError}
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
