import { useEffect, useState } from "react";
import "./styles.css";

async function obterDados() {
  const dadosRespose = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=6k6cosvzmKWWeRiKLgHWU7cXSCcgZ5e6Qc2nZf9c"
  );

  const dadosJson = await dadosRespose.json();

  return dadosJson;
}

type DataResponse = {
  date: string;
  explanation: string;
  title: string;
  url: string;
};

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
      <div className="grid p-6 gap-6 grid-cols-2 ">
        <div className="col-span-2">
          <h2 className="text-2xl text-gray-300 flex justify-center mb-6">
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
    </>
  );
}

export default Home;
