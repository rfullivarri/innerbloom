import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import { MarketingPage } from "./components/MarketingPage";
import { DashboardPage } from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-purple-200/70">Innerbloom</p>
                <p className="font-display text-lg font-semibold text-white">Mission Control</p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonBox: "flex items-center gap-3",
                    userButtonTrigger: "focus:outline-none"
                  }
                }}
              />
            </div>
          </header>
          <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
            <DashboardPage />
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <MarketingPage
          signInButton={
            <SignInButton mode="modal">
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-cosmic-border hover:bg-white/5">
                Sign in
              </button>
            </SignInButton>
          }
        />
      </SignedOut>
    </>
  );
};

export default App;
