import { useNavigate } from "react-router-dom";

export default function ButtonLink({ to, children }) {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>{children}</button>;
}
