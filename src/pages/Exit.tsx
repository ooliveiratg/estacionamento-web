import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/username";
import { toast } from "react-toastify";
import { useState } from "react";
import { VehicleExitApi } from "../../services/VehicleExitApi";

export default function Exit() {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);
  const handleExitVehicle = async () => {
    try {
      setLoading(true);
      const token = await useAuthStore.getState().token;
      if (!token) {
        toast.error("Usuário não autenticado");
        return;
      }

      const result = await VehicleExitApi({ placa }, token);
      if (!result.success) {
        const message =
          typeof result.message === "object"
            ? Object.values(result.message).flat().join("\n")
            : result.message || "Email/senha inválido";
        toast.error(message);

        return;
      }

      if (result?.success === true) {
        return navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-black flex min-h-screen justify-center items-center w-full">
      <main className="w-[40%] h-[50%] rounded-[14px] bg-white/5  flex flex-col">
        <div className="w-full pt-[30px] flex flex-col justify-center items-center">
          <div className="mt-2 items-center gap-3 flex w-full ml-10">
            <ArrowLeftIcon
              onClick={() => navigate("/home")}
              size={32}
              color="white"
            />
            <span className=" font-inter text-white font-bold text-[28px]">
              Saída de Veículo
            </span>
          </div>
        </div>
        <div className="w-full px-20 flex flex-col   items-center">
          <input
            type="text"
            placeholder="digite sua placa..."
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="w-full h-[50px] mt-[40px] font-inter bg-transparent rounded-[10px] border border-white/20 mx-auto px-[20px] text-white placeholder:text-white/50 focus:outline-none "
          />

          <button
            onClick={handleExitVehicle}
            disabled={loading}
            className="w-[60%] h-[50px] cursor-pointer font-inter bg-blue-600 rounded-[10px]  my-[20px] text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processando..." : "Registrar saída"}
          </button>
        </div>
      </main>
    </section>
  );
}
