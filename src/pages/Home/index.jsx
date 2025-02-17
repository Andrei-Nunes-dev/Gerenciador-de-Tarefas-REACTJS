import { useEffect, useState, useRef } from "react";
import "./estilo.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Home() {
  const [tarefas, setTarefas] = useState([]);

  const inputTitulo = useRef();
  const inputDescricao = useRef();
  const inputDataVencimento = useRef();

  const navigate = useNavigate();

  function redirecionarEdicao(tarefa) {
    const query = new URLSearchParams();
    query.set("titulo", tarefa.titulo);
    query.set("descricao", tarefa.descricao);
    query.set("data_vencimento", tarefa.data_Vencimento);
    query.set("id", tarefa.id);

    navigate(`/editar?${query.toString()}`);
  }

  async function getTarefas() {
    const tarefasDaAPI = await api.get("/api/Tarefas");

    setTarefas(tarefasDaAPI.data.reverse());
  }

  async function criaTarefas() {
    var tituloAdicionar = inputTitulo.current.value;
    var descricaoAdicionar = inputDescricao.current.value;
    var dataVencimentoAdicionar = inputDataVencimento.current.value;

    var campovazio = 0;
    var tamanholimite = 0;
    var datairregular = 0;

    var dataHoje = new Date();

    var auxDataVencimentoAdicionar = new Date(dataVencimentoAdicionar);
    auxDataVencimentoAdicionar.setDate(
      auxDataVencimentoAdicionar.getDate() + 1
    );

    if (
      tituloAdicionar.trim() == "" ||
      descricaoAdicionar.trim() == "" ||
      dataVencimentoAdicionar.trim() == ""
    ) {
      campovazio = 1;
    }

    if (tituloAdicionar.length > 40 || descricaoAdicionar.length > 500) {
      tamanholimite = 1;
    }

    if (dataHoje > auxDataVencimentoAdicionar) {
      datairregular = 1;
    }

    if (campovazio == 1) {
      Swal.fire({
        title: "Erro!",
        text: "Campos vazios!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (tamanholimite == 1) {
      Swal.fire({
        title: "Erro!",
        text: " Tamanho de campos inválidos: O Título deve conter até no máximo 40 caracteres e a Descrição até no máximo 500 caracteres!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (datairregular == 1) {
      Swal.fire({
        title: "Erro!",
        text: " Data inválida: A data deve ser maior ou igual ao dia atual!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      await api.post("/api/Tarefas", {
        titulo: inputTitulo.current.value,
        descricao: inputDescricao.current.value,
        data_vencimento: inputDataVencimento.current.value,
      });
      Swal.fire({
        title: "Sucesso!",
        text: " Tarefa criada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      getTarefas();
      setTextoTitulo("");
      setTextoDescricao("");
    }
  }

  async function deletaTarefas(id) {
    Swal.fire({
      title: "Tem certeza que quer excluir a tarefa?",
      showDenyButton: true,
      confirmButtonText: "Sim, excluir",
      denyButtonText: "Não, não excluir",
    }).then((result) => {
      if (result.isConfirmed) {
        deletarTarefaAux(id);
        Swal.fire("Tarefa Excluída!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Tarefa não Excluída!", "", "info");
      }
    });
  }

  async function deletarTarefaAux(id) {
    await api.delete(`/api/Tarefas/${id}`);
    getTarefas();
  }

  function formatarData(data) {
    var dataFormatada = new Date(data);
    var formatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    var dateString = dataFormatada.toLocaleDateString("pt-BR", formatOptions);
    return dateString;
  }

  const [textoDescricao, setTextoDescricao] = useState("");
  const contadorCaractereDescricao = textoDescricao.length;

  const gerenciarMudancaTextoDescricao = (e) => {
    setTextoDescricao(e.target.value);
  };

  const [textoTitulo, setTextoTitulo] = useState("");
  const contadorCaractereTitulo = textoTitulo.length;

  const gerenciarMudancaTextoTitulo = (e) => {
    setTextoTitulo(e.target.value);
  };

  const dataHoje = new Date();
  const dataPassada = new Date(dataHoje);

  useEffect(() => {
    getTarefas();
  }, []);

  return (
    <>
      <div className="w-screen .h-screen min-h-screen bg-gradient-to-r from-amber-400 to-orange-400 flex justify-center font-serif">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl text-green-800 font-bold text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 28"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>{" "}
            Gerenciador de Tarefas (To-do List)
          </h1>

          <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-3">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Titulo da Tarefa
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="titulo"
                name="titulo"
                type="text"
                placeholder="Titulo da Tarefa"
                ref={inputTitulo}
                value={textoTitulo}
                onChange={gerenciarMudancaTextoTitulo}
              />
              <p className="text-xs">
                Contador de caractere: {contadorCaractereTitulo}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descrição da Tarefa
              </label>
              <textarea
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="descricao"
                name="descricao"
                placeholder="Descrição da Tarefa"
                rows={4}
                cols={40}
                ref={inputDescricao}
                value={textoDescricao}
                onChange={gerenciarMudancaTextoDescricao}
              />
              <p className="text-xs">
                Contador de caractere: {contadorCaractereDescricao}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Data de Vencimento
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="data_vencimento"
                name="data_vencimento"
                type="date"
                ref={inputDataVencimento}
                min={dataPassada.toISOString().split("T")[0]}
                defaultValue={dataHoje.toISOString().split("T")[0]}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-2xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={criaTarefas}
              >
                Adicionar Tarefa
              </button>
            </div>
          </form>

          {tarefas.map((tarefa) => (
            <div
              className="mb-8 block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
              key={tarefa.id}
            >
              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {tarefa.titulo}
                </h2>
                <p className="w-150 h-20 break-words overflow-auto font-normal text-gray-700 dark:text-gray-400">
                  {tarefa.descricao}
                </p>
                <p className="mt-5 font-normal text-gray-700 dark:text-gray-400">
                  Data de Vencimento:{formatarData(tarefa.data_Vencimento)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => deletaTarefas(tarefa.id)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-0 mb-0"
                >
                  Excluir
                </button>
                <button
                  onClick={() => redirecionarEdicao(tarefa)}
                  className="text-white bg-gradient-to-r from-green-700 via-green-800 to-green-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-0 mb-0"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
