import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { authServices, userServices } from "@/services";
import { useStore } from "@/stores";
import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const {
    authState: { user, setUser, logout },
  } = useStore();

  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const user = await userServices.me();
      setUser(user);
      if (!user.member) {
        navigate(ROUTES.ONBOARDING);
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  const handleLogout = () => {
    authServices.logout();
    navigate(ROUTES.LOGIN);
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
