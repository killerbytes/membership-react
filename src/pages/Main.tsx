import { ROUTES } from "@/constants";
import React from "react";
import { useNavigate } from "react-router";

export default function Main() {
  const navigation = useNavigate();
  React.useEffect(() => {
    navigation(ROUTES.MEMBER);
  }, []);
  return (
    <div>
      <h1>Home</h1>
      Welcome
    </div>
  );
}
