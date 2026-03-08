import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { Link } from "react-router";

export default function Main() {
  return (
    <>
      <Button>
        <Link to={ROUTES.LOGIN}>Login</Link>
      </Button>
      <Button>Register</Button>
    </>
  );
}
