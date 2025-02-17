import { useSearchParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

function Editar() {
  const [searchParams] = useSearchParams();
  const titulo = searchParams.get("titulo");
  const descricao = searchParams.get("descricao");
  const data_vencimento = searchParams.get("data_vencimento");
  const id = searchParams.get("id");
  const inputTitulo = useRef();
  const inputDescricao = useRef();
  const inputDataVencimento = useRef();
  const navigate = useNavigate();

  async function editarTarefas() {
    var tituloEditar = inputTitulo.current.value;
    var descricaoEditar = inputDescricao.current.value;
    var dataVencimentoEditar = inputDataVencimento.current.value;

    var campovazio = 0;
    var tamanholimite = 0;
    var datairregular = 0;

    var dataHoje = new Date();

    var auxDataVencimentoAdicionar = new Date(dataVencimentoEditar);
    auxDataVencimentoAdicionar.setDate(
      auxDataVencimentoAdicionar.getDate() + 1
    );

    if (
      tituloEditar.trim() == "" ||
      descricaoEditar.trim() == "" ||
      dataVencimentoEditar.trim() == ""
    ) {
      campovazio = 1;
    }

    if (tituloEditar.length > 40 || descricaoEditar.length > 500) {
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
      Swal.fire({
        title: "Tem certeza que quer editar a tarefa?",
        showDenyButton: true,
        confirmButtonText: "Sim, editar",
        denyButtonText: "Não, não editar",
      }).then((result) => {
        if (result.isConfirmed) {
          editarTarefasAux(id);
          Swal.fire("Tarefa Editada com Sucesso!", "", "success");
          navigate(-1);
        } else if (result.isDenied) {
          Swal.fire("Edição cancelada!", "", "info");
        }
      });
    }
  }

  async function editarTarefasAux(id) {
    await api.put(`/api/Tarefas/${id}`, {
      titulo: inputTitulo.current.value,
      descricao: inputDescricao.current.value,
      data_vencimento: inputDataVencimento.current.value,
    });
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

  async function preencheCampos() {
    setTextoDescricao(descricao);
    setTextoTitulo(titulo);
  }

  const dataHoje = new Date();
  const dataPassada = new Date(dataHoje);

  useEffect(() => {
    preencheCampos();
  }, []);

  return (
    <>
      <div className="w-screen .h-screen min-h-screen bg-gradient-to-r from-amber-400 to-orange-400 flex justify-center font-serif">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl text-green-800 font-bold text-center">
            Editor de Tarefas
          </h1>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action=""
          >
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
                defaultValue={titulo}
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="descricao"
                name="descricao"
                placeholder="Descrição da Tarefa"
                rows={4}
                cols={40}
                defaultValue={descricao}
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
                defaultValue={data_vencimento.substring(0, 10)}
                ref={inputDataVencimento}
                min={dataPassada.toISOString().split("T")[0]}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => editarTarefas({ id })}
                className=" bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Atualizar Tarefa
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Retornar para a página inicial
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Editar;
