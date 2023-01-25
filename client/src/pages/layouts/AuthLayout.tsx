import { Outlet } from "react-router-dom";
import { FSCard } from "../../components/FSCard";

export function AuthLayout() {
  return (
    <FSCard>
      <FSCard.Body>
        <Outlet />
      </FSCard.Body>
      <FSCard.BelowCard>Hi</FSCard.BelowCard>
    </FSCard>
  );
}
