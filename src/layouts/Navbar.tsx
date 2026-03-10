import { ROUTES } from "@/constants";
import { Heart, Home, Mail, QrCode, User } from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-around p-4 sticky bottom-0 bg-secondary shadow-[0_-2px_8px_rgba(0,0,0,0.1)] ">
      <NavLink to={ROUTES.MEMBER}>
        <Home />
      </NavLink>
      <NavLink to={ROUTES.REGISTER}>
        <Heart />
      </NavLink>
      <NavLink to={ROUTES.LOGIN}>
        <Mail />
      </NavLink>
      <NavLink to={ROUTES.QR}>
        <QrCode />
      </NavLink>
      <NavLink to={ROUTES.MEMBER}>
        <User />
      </NavLink>
    </nav>
  );
}
