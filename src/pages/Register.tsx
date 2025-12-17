import Car from "../assets/car.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { RegisterApi } from "../../services/Register";
import { LoginApi } from "../../services/Login";

export default function Register() {
  const router = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await RegisterApi({ name, email, senha: password });
      if (!response.success) {
        const message =
          typeof response.message === "object"
            ? Object.values(response.message).flat().join("\n")
            : response.message || "Email já cadastrado";
        toast.error(message);
        return;
      }

      if (response?.success === true) {
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
          router("/home");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-[#0D0D1B] flex min-h-screen justify-center items-center w-full">
      <main className="w-[40%] h-[50%] rounded-[14px] bg-white/5  flex flex-col">
        <div className="w-full pt-[30px] flex flex-col justify-center items-center">
          <img src={Car} alt="Carro" width={90} height={84} />
          <span className="mt-2 mr-[15px] font-inter text-white font-semibold text-[16px]">
            Cadastro
          </span>
        </div>
        <div className="flex-1 bg-white/2 px-5 flex items-center flex-col  my-5 mx-4 rounded-[10px]">
          <label className="mt-[20px] w-full pb-[10px] pl-[5px] text-white font-inter font-bold">
            Nome
          </label>
          <input
            type="text"
            placeholder="digite seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[50px] font-inter bg-white/10 rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none "
          />
          <label className="mt-[20px] w-full pb-[10px] pl-[5px] text-white font-inter font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] font-inter bg-white/10 rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none "
          />
          <label className="mt-[20px] w-full pb-[10px] pl-[5px] text-white font-inter font-bold">
            Senha
          </label>
          <input
            type="text"
            placeholder="digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] font-inter bg-white/10 rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none "
          />
          <span className="w-full text-white mt-[20px] font-inter">
            Já tem uma conta?{" "}
            <Link
              to="/"
              className=" font-int er underline text-blue-300  underline-offset-2 hover:opacity-30"
            >
              Entrar
            </Link>
          </span>
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-[60%] h-[60px] cursor-pointer font-inter bg-blue-600 rounded-[10px]  mt-[20px] text-white font-semiboldhover:bg-blue-700 transition-colors mb-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Cadastro"}
          </button>
        </div>
      </main>
    </section>
  );
}
