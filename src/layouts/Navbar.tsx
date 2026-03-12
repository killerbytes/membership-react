import { ROUTES } from "@/constants";
import { BadgeDollarSign, Home, QrCode, User } from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-around p-4 sticky bottom-0 bg-primary text-gray-400 shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
      <NavLink to={ROUTES.MAIN}>
        <Home />
      </NavLink>
      <NavLink to={ROUTES.FINANCE}>
        <BadgeDollarSign />
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
