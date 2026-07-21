import SocialButton from './SocialButton';
import CredentialsPage from './CredentialsPage';
import type { User } from '@/types/user';
import { register } from '../api/auth';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

export default function AuthPage({ onLogin }: LandingPageProps) {
  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-foreground mb-2">
            Sign in
          </h2>
          <p className="text-muted-foreground text-sm">
            Use a social account to get started instantly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton provider="google" onLogin={onLogin} />
          <SocialButton provider="apple" onLogin={onLogin} />
          <SocialButton provider="facebook" onLogin={onLogin} />
        </div>

        <div className="flex items-center gap-3 mb-6 mt-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or use email</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div>
          <CredentialsPage onRegister={register} />
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
          By signing in you agree to our terms. Your data stays private — gift
          selections are always anonymous to the wishlist owner.
        </p>
      </div>
    </div>
  );
}
