import { EyeOff, Gift, Star, Users } from 'lucide-react';
import SocialButton from './SocialButton';

import type { User } from '@/types/user';
import EmailPassword from './EmailPassword';

export default function LandingPage({
  onLogin,
}: {
  onLogin: (user: User) => void;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left: Hero */}
      <div className="lg:w-1/2 bg-primary relative overflow-hidden flex flex-col justify-between p-10 lg:p-16 min-h-[40vh] lg:min-h-screen">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-[#C4797A]" />
            <span className="text-[#C4797A] font-semibold tracking-widest text-xs uppercase">
              Wishpool
            </span>
          </div>
        </div>
        {/* Decorative rings */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full border border-white/10" />
        <div className="absolute bottom-20 -left-24 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute bottom-10 -left-16 w-56 h-56 rounded-full border border-white/5" />

        <div className="relative z-10">
          <h1 className="font-['Playfair_Display'] text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.15] mb-6">
            The wishlist
            <br />
            <em className="text-[#E8B89A]">they'll actually</em>
            <br />
            love to receive.
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-sm leading-relaxed">
            Create a wishlist for any occasion. Friends pick gifts anonymously —
            no duplicates, no awkward reveals.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C4797A]/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-[#C4797A]" />
            </div>
            <span className="text-white/70 text-sm">
              No duplicate gifts — ever
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C4797A]/20 flex items-center justify-center">
              <EyeOff className="w-4 h-4 text-[#C4797A]" />
            </div>
            <span className="text-white/70 text-sm">
              Surprise stays safe — owner can't see who picks what
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C4797A]/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#C4797A]" />
            </div>
            <span className="text-white/70 text-sm">Share with one link</span>
          </div>
        </div>
      </div>

      {/* Right: Auth */}
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
            <EmailPassword onLogin={onLogin} />
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
            By signing in you agree to our terms. Your data stays private — gift
            selections are always anonymous to the wishlist owner.
          </p>
        </div>
      </div>
    </div>
  );
}
