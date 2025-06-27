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
  const [loading, setLoading] = useState(false);

  async function obterDados() {
    const dadosRespose = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c"
    );

    const dadosJson = await dadosRespose.json();

    return dadosJson;
  }

  async function buscarDados() {
    const dados = await obterDados();
    // setLoading(true);

    setDadosExibir(dados);

    console.log("dados", dados);
  }

  useEffect(() => {
    buscarDados();
  }, []);

  // function getPreviousDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   console.log("date", date);
  //   date.setDate(date.getDate() - 1);
  //   console.log("previousDate", date.toISOString().split("T")[0]);
  //   return date.toISOString().split("T")[0];
  // }

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
              // onClick={() => {
              //   const previousDate = getPreviousDate(dadosExibir?.date || "");
              //   fetch(
              //     `https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c&date=${previousDate}`
              //   )
              //     .then((response) => response.json())
              //     .then((data) => setDadosExibir(data));
              // }}
              className="w-26 flex shadow-black text-gray-400 px-4 py-4 mr-4 rounded-lg shadow-md hover:bg-gray-800 text-sm cursor-pointer transition duration-300 ease-in-out"
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
              onClick={() => {
                const nextDate = new Date(dadosExibir?.date || "");
                nextDate.setDate(nextDate.getDate() + 1);
                const formattedNextDate = nextDate.toISOString().split("T")[0];
                fetch(
                  `https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c&date=${formattedNextDate}`
                )
                  .then((response) => response.json())
                  .then((data) => setDadosExibir(data));
              }}
              className="min-w-22 flex shadow-black text-gray-400 px-4 py-2 ml-4 rounded-lg shadow-md hover:bg-gray-800 text-sm cursor-pointer"
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
