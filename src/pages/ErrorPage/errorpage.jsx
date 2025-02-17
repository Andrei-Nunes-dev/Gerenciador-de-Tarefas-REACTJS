import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="w-screen .h-screen min-h-screen bg-gradient-to-r from-amber-400 to-orange-400 flex justify-center font-serif">
      <div className="mt-50 w-full max-w-2xl">
        <h1 className="text-3xl text-green-800 font-bold text-center">
          {error.status == "404" ? "Erro 404 - Página não encontrada" : ""}
          {error.status != "404" ? "Um erro ocorreu durante a edição" : ""}
        </h1>
        <h3 className="text-2xl text-green-800 font-bold text-center">
          Retorne para a página principal
        </h3>
        <button
          onClick={() => navigate("/")}
          className="w-2xl bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Retornar para a página inicial
        </button>
      </div>
    </div>
  );
}
