import { useEffect, useState } from "react";
import "./styles.css";

type DataResponse = {
  date: string;
  explanation: string;
  title: string;
  url: string;
};

async function obterDados() {
  const dadosRespose = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c"
  );

  const dadosJson = await dadosRespose.json();

  return dadosJson;
}

function Home() {
  const [dadosExibir, setDadosExibir] = useState<DataResponse>();
  async function buscarDados() {
    const dados = await obterDados();
    setDadosExibir(dados);
    console.log("dados", dados);
  }
  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div>
          <button className="w-26 flex  bg-gray-900 text-gray-400 px-4 py-2 mr-4 rounded-lg shadow-md hover:bg-gray-800 text-sm cursor-pointer">
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
          <button className="min-w-22 flex bg-gray-900 text-gray-400 px-4 py-2 ml-4 rounded-lg shadow-md hover:bg-gray-800 text-sm cursor-pointer">
            Next ⪢
          </button>
        </div>
      </div>
      <footer className="flex justify-center items-center text-gray-600 p-2 mt-10">
        <p>Fonte: NASA API | Desenvolvido por Polyane Tuag</p>
      </footer>
    </>
  );
}

export default Home;
