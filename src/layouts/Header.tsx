import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { authApi } from "@/features/auth/api";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useStore } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Sprout } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const { authState } = useStore();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && user) {
      authState.setUser(user);
      if (!user.member) {
        navigate(ROUTES.ONBOARDING);
      }
    }
  }, [user, isLoading, navigate]);

  const handleLogout = async () => {
    await authApi.logout();
    queryClient.clear();
    window.location.replace(ROUTES.LOGIN);
  };

  if (isLoading) {
    return (
      <header className="z-50 sticky top-0 h-14 bg-primary flex items-center px-4">
        <div className="flex gap-2 items-center animate-pulse">
          <div className="h-7 w-7 rounded-lg bg-white/20" />
          <div className="h-4 w-28 rounded bg-white/20" />
        </div>
      </header>
    );
  }

  return (
    <header className="z-50 sticky top-0 bg-primary shadow-md shadow-primary/20">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Sprout className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-sm tracking-tight">
              CoopMember
            </span>
            {user?.email && (
              <span className="text-white/50 text-[10px] truncate max-w-35">
                {user.email}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          aria-label="Logout"
          className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
