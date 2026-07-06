import { UserArraySchema, type User } from '@/types/user';
import { useState } from 'react';
import { storageHelper } from '../../utils/storageHelper';

interface EmailPasswordProps {
  onLogin: (user: User) => void;
}

export default function EmailPassword({ onLogin }: EmailPasswordProps) {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');

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
        <button
          onClick={() => {
            setMode('signin');
            setEmailError('');
          }}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'signin' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Sign in
        </button>
        <button
          onClick={() => {
            setMode('register');
            setEmailError('');
          }}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'register' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm outline-none focus:border-[#C4797A] transition-colors"
              placeholder="Emma Thornton"
              value={emailForm.name}
              onChange={e => {
                setEmailForm({ ...emailForm, name: e.target.value });
              }}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm outline-none focus:border-[#C4797A] transition-colors"
            placeholder="you@example.com"
            value={emailForm.email}
            onChange={e => {
              setEmailForm({ ...emailForm, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm outline-none focus:border-[#C4797A] transition-colors"
            placeholder="••••••••"
            value={emailForm.password}
            onChange={e => {
              setEmailForm({ ...emailForm, password: e.target.value });
            }}
          />
        </div>

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
