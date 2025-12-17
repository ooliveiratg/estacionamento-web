import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import { LoginApi } from "../../services/Login"; 
import Car from "../assets/car.svg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await LoginApi({ email, senha: password });
      
      if (!result.success) {
        const message =
          typeof result.message === "object"
            ? Object.values(result.message).flat().join("\n")
            : result.message || "Email/senha inválido";
        toast.error(message);
        return;
      }
      
      if (result?.success === true) {
        navigate("/home"); 
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0D0D1B] flex min-h-screen justify-center items-center w-full">
      <main className="w-[40%] h-[50%] rounded-[14px] bg-white/5 flex flex-col">
        <div className="w-full pt-[30px] flex flex-col justify-center items-center">
          <img src={Car} alt="Carro" width={90} height={84} />
          <span className="mt-2 mr-[15px] font-inter text-white font-semibold text-[16px]">
            Login
          </span>
        </div>
        
        <div className="w-full px-20 flex flex-col items-center">
          <label className="mt-[20px] w-full pb-[10px] pl-[5px] text-white font-inter font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] font-inter bg-white/10 rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none"
          />

          <label className="mt-[20px] w-full pb-[10px] pl-[5px] text-white font-inter font-bold">
            Senha
          </label>
          <input
            type="password"
            placeholder="digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] font-inter bg-white/10 rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none"
          />
          
          <Link
            to="/register"
            className="mt-[20px] font-inter underline text-white w-full underline-offset-2 hover:opacity-30"
          >
            Cadastre-se
          </Link>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-[60%] h-[60px] cursor-pointer font-inter bg-blue-600 rounded-[10px] my-[20px] text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </main>
    </section>
  );
}

export default Login;