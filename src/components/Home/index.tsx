import { useEffect, useState } from "react";
import "./styles.css";

type DataResponse = {
  date: string;
  explanation: string;
  title: string;
  url: string;
};

function Home() {
  const [dadosExibir, setDadosExibir] = useState<DataResponse>();
  const [loading, setLoading] = useState(true);

  // Função para obter os dados da API da NASA
  async function obterDados() {
    const dadosRespose = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c"
    );

    const dadosJson = await dadosRespose.json();

    return dadosJson;
  }

  // Função para buscar os dados e atualizar o estado
  async function buscarDados() {
    setLoading(true);
    try {
      const dados = await obterDados();
      setDadosExibir(dados);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarDados();
  }, []);

  // Função para obter a data anterior
  function getPreviousDate(dateString: string): string {
    const date = new Date(dateString);
    console.log("date", date);
    date.setDate(date.getDate() - 1);
    console.log("previousDate", date.toISOString().split("T")[0]);
    return date.toISOString().split("T")[0];
  }

  // Função para obter a data seguinte
  function getNextDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    // Verifica se a data seguinte é maior que a data atual
    if (date > new Date()) {
      return dateString;
    }

    return date.toISOString().split("T")[0];
  }

  const handlePreviousDate = async () => {
    const previousDate = getPreviousDate(dadosExibir?.date || "");
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c&date=${previousDate}`
    )
      .then((response) => response.json())
      .then((data) => setDadosExibir(data));
  };

  const handleNextDate = async () => {
    const nextDate = getNextDate(dadosExibir?.date || "");

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c&date=${nextDate}`
    )
      .then((response) => response.json())
      .then((data) => setDadosExibir(data));
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl text-gray-400">Carregando...</h1>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <div>
            <button
              className="w-26 flex shadow-black text-gray-400 px-4 py-4 mr-4 rounded-lg shadow-md hover:bg-gray-800 text-sm cursor-pointer transition duration-300 ease-in-out"
              onClick={handlePreviousDate}
            >
              ⪡ Previous
            </button>
          </div>
          <div className="grid p-10 gap-2 grid-cols-2 shadow-black shadow-lg rounded-lg ">
            <div className="col-span-2 flex justify-center mb-6">
              <h2 className="text-2xl text-white flex justify-center mb-6">
                {dadosExibir?.title}
              </h2>
            </div>
            <div className="col-span-1 flex justify-center ">
              <p className="text-gray-400">{dadosExibir?.explanation}</p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <img
                className="w-full h-full object-cover rounded-lg shadow-lg"
                src={dadosExibir?.url}
                alt=""
              />
            </div>
          </div>

          <div>
            <button
              className="min-w-22 flex shadow-black text-gray-400 px-4 py-4 ml-4 rounded-lg shadow-md hover:bg-gray-800 text-sm "
              onClick={handleNextDate}
            >
              Next ⪢
            </button>
          </div>
        </div>
      )}

      <footer className="flex justify-center items-center text-gray-600 p-2 mt-10">
        <p>Fonte: NASA API | Desenvolvido por Polyane Tuag</p>
      </footer>
    </>
  );
}

export default Home;
