import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";

// Simulando usuário logado
const usuario = {
  nome: "Pedro Nunes",
  tipo: "Guarda Mirim",
  frequencia: 40,
  ultimaPresenca: "09/03/2026",
  historico: [
    { evento: "Missa", data: "11/04/2026", status: "Presente" },
    { evento: "Ensaio", data: "10/04/2026", status: "Ausente" },
    { evento: "Reunião", data: "09/04/2026", status: "Justificado" },
  ],
  proximosEventos: [
    { nome: "Missa", data: "11/04/2026", hora: "19:00" },
    { nome: "Ensaio", data: "10/04/2026", hora: "19:00" },
  ],
};

// helpers
function getStatus(pct: number) {
  if (pct >= 75) return "Alta";
  if (pct >= 50) return "Média";
  return "Baixa";
}

export default function FrequenciaPessoal() {
  const status = getStatus(usuario.frequencia);

  const Icon =
    status === "Alta"
      ? TrendingUp
      : status === "Média"
      ? Minus
      : TrendingDown;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#1A3A5C] text-white flex items-center justify-center text-xl font-bold">
            PN
          </div>

          <h2 className="mt-4 text-lg font-semibold">{usuario.nome}</h2>
          <p className="text-gray-500 text-sm mb-4">{usuario.tipo}</p>

          <div className="w-full text-sm space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span>Frequência:</span>
              <span>{usuario.frequencia}%</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={
                  status === "Alta"
                    ? "text-green-600"
                    : status === "Média"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {status}
              </span>
            </div>
          </div>
        </div>

       
        <div className="md:col-span-2 space-y-6">

       
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow">
              <p className="text-gray-400 text-sm">Frequência</p>
              <p className="text-2xl font-bold">{usuario.frequencia}%</p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <p className="text-gray-400 text-sm">Status</p>
              <div className="flex items-center gap-2">
                <Icon />
                <span className="font-semibold">{status}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <p className="text-gray-400 text-sm">Última presença</p>
              <p className="font-semibold">{usuario.ultimaPresenca}</p>
            </div>
          </div>

      
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Histórico de Frequência
            </h2>

            <ul className="space-y-2">
              {usuario.historico.map((h, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{h.evento}</p>
                    <p className="text-sm text-gray-500">{h.data}</p>
                  </div>

                  <span
                    className={
                      h.status === "Presente"
                        ? "text-green-600"
                        : h.status === "Ausente"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {h.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar size={16} /> Próximos Eventos
            </h2>

            <ul className="space-y-2">
              {usuario.proximosEventos.map((ev, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{ev.nome}</p>
                    <p className="text-sm text-gray-500">{ev.data}</p>
                  </div>

                  <span className="font-semibold">{ev.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}