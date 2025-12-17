import { Plus, SignOutIcon, CarIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/username";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const { token, fetchUser, username, } = useAuthStore();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchUser();
    }
  }, [token, fetchUser, navigate]);

  if (!token) return null;


  return (
    <section className="bg-black flex min-h-screen flex-col  w-full">
      <header className="mt-7 ml-7">
        <div className="flex items-center gap-4">
          <span className="text-white font-albert-sans font-semibold text-[30px]">
            Hello, {username || "Visitante"}!
          </span>

        </div>
      </header>
      <div className="flex flex-1 flex-col pt-[100px] items-center">
        <span className="font-albert-sans text-white font-light text-[34px] ">
          Parking Cars
        </span>
        <div className="flex mt-[100px] gap-4 ">
          <div
            onClick={() => navigate("/entry")}
            className="w-[150px] h-[150px] bg-white/10 rounded-[10px] flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors"
          >
            <Plus size={32} color="#FFF" />
            <span className="text-white font-albert-sans font-semibold text-[16px]">
              Entrada
            </span>
          </div>
          <div
            onClick={() => navigate("/exit")}
            className="w-[150px] h-[150px] bg-white/10 rounded-[10px] flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors"
          >
            <SignOutIcon size={32} color="#FFF" />
            <span className="text-white font-albert-sans font-semibold text-[16px]">
              Saída
            </span>
          </div>
          <div
            onClick={() => navigate("/listing")}
            className="w-[150px] h-[150px] bg-white/10 rounded-[10px] flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors"
          >
            <CarIcon size={32} color="#FFF" />
            <span className="text-white font-albert-sans font-semibold text-[16px]">
              listagem
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
