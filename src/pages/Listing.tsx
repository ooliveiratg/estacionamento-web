import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdDirectionsCar } from "react-icons/md";
import { VehicleListingApi } from "../../services/VehicleListingApi";
import { VehicleListingPlateApi } from "../../services/VehicleListingPlateApi";



interface VehicleData {
  placa: string;
  dataEntrada: string;
  horarioEntrada: string;
  valorPago?: string;
  horarioSaida?: string;
}

export default function VehicleListing() {
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<VehicleData[]>([]);
  const [plate, setPlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async (searchPlate?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = searchPlate 
        ? await VehicleListingPlateApi(searchPlate)
        : await VehicleListingApi();
      
      if (result.success) {
        setVehicle(result.response || []);
      } else {
        setError(result.error || "Erro ao carregar veículos");
        setVehicle([]);
      }
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      setError("Erro ao carregar veículos");
      setVehicle([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchVehicles(plate.trim() || undefined);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [plate]);

  return (
    <div className="flex flex-col min-h-screen">

      <div className="pl-6 w-full h-[223px] bg-black flex flex-col justify-center gap-4">
        <button
          onClick={() => navigate("/home")}
          className="w-10 h-10 flex items-center justify-center text-white"
        >
          <MdArrowBack size={24} />
        </button>

        <h1 className="text-white text-[48px] font-bold">Veículos</h1>
      </div>

      <div className="flex-1 bg-neutral-900 px-4">

        <div className="flex justify-center mt-[69px]">
          <div className="w-[79px] h-[80px] rounded-[24px] bg-blue-500 flex items-center justify-center">
            <MdDirectionsCar size={35} className="text-white" />
          </div>
        </div>

        
        <div className="flex flex-col w-[296px] mt-[30px] gap-2">
          <span className="text-white text-[20px] font-semibold">
            Deseja buscar pelo seu veículo?
          </span>

          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Digite sua placa"
            className="bg-transparent border-b border-white text-white text-[18px] outline-none placeholder:text-white"
          />
        </div>


        <div className="mt-9">
          <h2 className="text-white text-[20px] font-semibold">
            Carros no estacionamento:
          </h2>

          <div className="mt-4 flex flex-col gap-6 pb-6 items-center">
            {isLoading ? (
              <span className="text-white">Carregando...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : vehicle.length > 0 ? (
              vehicle.map((vehicles) => (
                <div
                  key={vehicles.placa}
                  className="w-[80%] h-[94px] bg-white rounded-[20px] flex items-center px-4"
                >
                  <div className="border border-gray-400 rounded-[20px] w-[62px] h-[63px] flex items-center justify-center shadow-lg">
                    <MdDirectionsCar size={27} className="text-gray-600" />
                  </div>

                  <div className="flex flex-col ml-4 gap-2">
                    <span className="text-[13px] text-gray-500">
                      Entrada: {vehicles.horarioEntrada}
                    </span>

                    <div className="flex justify-between w-full gap-4">
                      <span className="text-[20px] text-black">
                        {vehicles.placa}
                      </span>
                      <span className="text-[14px] font-semibold text-black">
                        {vehicles.dataEntrada}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-white mt-4">
                Nenhum veículo ativo
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
