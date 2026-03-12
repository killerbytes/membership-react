import { ROUTES } from "@/constants";
import { BadgeDollarSign, Home, QrCode, UserCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router";

const NAV_ITEMS = [
  { to: ROUTES.MAIN, label: "Home", icon: Home },
  { to: ROUTES.FINANCE, label: "Finance", icon: BadgeDollarSign },
  { to: ROUTES.QR, label: "QR Code", icon: QrCode },
  { to: ROUTES.MEMBER, label: "Profile", icon: UserCircle },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky bottom-0 z-40 w-full" aria-label="Main navigation">
      <div className="absolute inset-0 bg-primary/95 backdrop-blur-md border-t border-white/10" />

      <div className="relative flex items-end justify-around px-2 pt-2 pb-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to as string);

          return (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div
                className={`
                  flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5
                  transition-all duration-200
                  ${isActive ? "bg-white/15" : "hover:bg-white/8"}
                `}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? "text-white scale-110" : "text-white/50"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                >
                  {label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
