import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { authApi } from "@/features/auth/api";
import { useCurrentUser } from "@/features/auth/hooks/userCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && user) {
      if (!user.member) {
        navigate(ROUTES.ONBOARDING);
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    authApi.logout();
    queryClient.clear();
    window.location.replace(ROUTES.LOGIN);
  };
  return (
    <header className="flex items-center justify-between p-4 bg-accent sticky top-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)] ">
      <div className="font-semibold">Header</div>
      <Button variant="ghost" onClick={handleLogout}>
        <LogOut />
      </Button>
    </header>
  );
}
