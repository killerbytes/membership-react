import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { Link } from "react-router";

export default function Main() {
  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <Link to={ROUTES.LOGIN} className={buttonVariants()}>
        Login
      </Link>
      <Link
        to={ROUTES.REGISTER}
        className={buttonVariants({ variant: "outline" })}
      >
        Register
      </Link>
    </div>
  );
}
