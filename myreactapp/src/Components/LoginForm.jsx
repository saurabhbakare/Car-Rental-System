import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>User Login</h2>

      <button onClick={() => navigate("/register")}>
        Sign Up
      </button>
    </div>
  );
}
