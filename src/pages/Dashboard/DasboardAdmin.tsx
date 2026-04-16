import { AlertTriangle, Bell, Calendar, ChevronRight, TrendingDown, Users } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type FreqStatus = "Alta" | "Média" | "Baixa";
type EventType = "Missa" | "Ensaio" | "Reunião" | "Procissão";

interface Guarda {
  id: number;
  nome: string;
  matricula: string;
  tipo: "Guarda" | "Guarda Mirim";
  frequencia: number;
  ultimaPresenca: string;
  diasAusente: number;
}

interface Evento {
  id: number;
  nome: string;
  tipo: EventType;
  data: string;
  dia: string;
  mes: string;
  hora: string;
  local: string;
  presentes: number;
  escalados: number;
  agendado?: boolean;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const guardasBaixaFreq: Guarda[] = [
  { id: 1, nome: "João Silva",     matricula: "00342", tipo: "Guarda",        frequencia: 28, ultimaPresenca: "01/03/2026", diasAusente: 38 },
  { id: 2, nome: "Maria Souza",    matricula: "00218", tipo: "Guarda",        frequencia: 33, ultimaPresenca: "05/03/2026", diasAusente: 35 },
  { id: 3, nome: "Pedro Nunes",    matricula: "00501", tipo: "Guarda Mirim",  frequencia: 40, ultimaPresenca: "09/03/2026", diasAusente: 31 },
  { id: 4, nome: "Carlos Ferreira",matricula: "00410", tipo: "Guarda",        frequencia: 44, ultimaPresenca: "18/03/2026", diasAusente: 22 },
  { id: 5, nome: "Lucia Oliveira", matricula: "00377", tipo: "Guarda Mirim",  frequencia: 47, ultimaPresenca: "21/03/2026", diasAusente: 19 },
];

const eventos: Evento[] = [
  { id: 1, nome: "Missa solene — próximo evento", tipo: "Missa",   data: "12/04/2026", dia: "12", mes: "Abr", hora: "09:00", local: "Basílica de Nazaré",  presentes: 0,   escalados: 24, agendado: true  },
  { id: 2, nome: "Reunião de coordenação",         tipo: "Reunião", data: "09/04/2026", dia: "09", mes: "Abr", hora: "18:00", local: "Sede",                presentes: 34,  escalados: 40  },
  { id: 3, nome: "Ensaio geral",                   tipo: "Ensaio",  data: "07/04/2026", dia: "07", mes: "Abr", hora: "19:00", local: "Basílica de Nazaré",  presentes: 58,  escalados: 70  },
  { id: 4, nome: "Missa dominical",                tipo: "Missa",   data: "06/04/2026", dia: "06", mes: "Abr", hora: "09:00", local: "Basílica de Nazaré",  presentes: 102, escalados: 118 },
  { id: 5, nome: "Ensaio formação mirim",          tipo: "Ensaio",  data: "03/04/2026", dia: "03", mes: "Abr", hora: "17:00", local: "Sede",                presentes: 20,  escalados: 24  },
  { id: 6, nome: "Missa de encerramento",          tipo: "Missa",   data: "30/03/2026", dia: "30", mes: "Mar", hora: "19:00", local: "Basílica de Nazaré",  presentes: 88,  escalados: 118 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getFreqStatus(pct: number): FreqStatus {
  if (pct >= 75) return "Alta";
  if (pct >= 50) return "Média";
  return "Baixa";
}

function getInitials(nome: string): string {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  valueColor,
}: {
  label: string;
  value: string;
  sub: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold leading-none ${valueColor ?? "text-gray-900"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function FreqBar({ pct }: { pct: number }) {
  const color = pct < 50 ? "bg-red-400" : "bg-amber-400";
  return (
    <div className="h-1 w-14 bg-gray-100 rounded-full overflow-hidden mt-1">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function GuardaAvatar({ nome, isCritical }: { nome: string; isCritical: boolean }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
        isCritical ? "bg-red-50 text-red-800" : "bg-amber-50 text-amber-800"
      }`}
    >
      {getInitials(nome)}
    </div>
  );
}

const eventTypeBadge: Record<EventType, string> = {
  Missa:     "bg-blue-50 text-blue-800",
  Ensaio:    "bg-purple-50 text-purple-800",
  Reunião:   "bg-gray-100 text-gray-700",
  Procissão: "bg-amber-50 text-amber-800",
};

function EventBadge({ tipo }: { tipo: EventType }) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${eventTypeBadge[tipo]}`}>
      {tipo}
    </span>
  );
}

function GuardaRow({ guarda }: { guarda: Guarda }) {
  const isCritical = guarda.frequencia < 50;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <GuardaAvatar nome={guarda.nome} isCritical={isCritical} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{guarda.nome}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          Mat. {guarda.matricula} · {guarda.tipo} · última pres. há {guarda.diasAusente} dias
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-sm font-semibold ${isCritical ? "text-red-500" : "text-amber-600"}`}>
          {guarda.frequencia}%
        </p>
        <FreqBar pct={guarda.frequencia} />
      </div>
    </div>
  );
}

function EventoRow({ evento }: { evento: Evento }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div
        className={`rounded-lg px-2.5 py-1.5 text-center shrink-0 min-w-[46px] ${
          evento.agendado ? "bg-blue-50" : "bg-gray-50"
        }`}
      >
        <p className={`text-base font-semibold leading-none ${evento.agendado ? "text-blue-700" : "text-gray-800"}`}>
          {evento.dia}
        </p>
        <p className={`text-[10px] mt-0.5 uppercase tracking-wide ${evento.agendado ? "text-blue-500" : "text-gray-400"}`}>
          {evento.mes}
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{evento.nome}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {evento.hora} · {evento.local}
          {!evento.agendado && ` · ${evento.presentes} de ${evento.escalados} presentes`}
          {evento.agendado && ` · ${evento.escalados} guardas escalados`}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        {evento.agendado ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-800 border border-blue-100">
            Agendado
          </span>
        ) : (
          <EventBadge tipo={evento.tipo} />
        )}
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────

export default function DashboardAdmin() {
  const totalMembros = 142;
  const totalGuardas = 118;
  const totalMirins = 24;
  const freqGeral = 71;
  const altaAssiduidade = 89;
  const baixaFreq = 18;
  const alertasCriticos = guardasBaixaFreq.filter((g) => g.diasAusente >= 30).length;

  return (
    <div className="bg-gray-100 p-6 font-sans">

      {/* Topbar */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Painel do administrador</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Guardas de Nossa Senhora de Nazaré · Abril 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
            <Bell size={15} className="text-red-500" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-medium border border-blue-100">
            Administrador
          </span>
        </div>
      </div>

      {/* Alert banner */}
      {alertasCriticos > 0 && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 border-l-4 border-l-red-400 rounded-xl rounded-l-none px-4 py-3 mb-6">
          <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800">
              {alertasCriticos} guardas com ausência superior a 30 dias
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              Frequência abaixo do mínimo exigido — intervenção e acompanhamento recomendados.
            </p>
          </div>
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total de membros"
          value={String(totalMembros)}
          sub={`${totalGuardas} guardas · ${totalMirins} mirins`}
        />
        <MetricCard
          label="Frequência geral"
          value={`${freqGeral}%`}
          sub="média da corporação"
        />
        <MetricCard
          label="Alta assiduidade ≥75%"
          value={String(altaAssiduidade)}
          sub="63% do total"
          valueColor="text-green-700"
        />
        <MetricCard
          label="Frequência baixa <50%"
          value={String(baixaFreq)}
          sub="13% do total"
          valueColor="text-red-500"
        />
      </div>

      {/* Main columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Guardas com baixa frequência */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-400" />
              <h2 className="text-sm font-semibold text-gray-900">
                5 guardas com menor frequência
              </h2>
            </div>
            <button className="flex items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ver todos <ChevronRight size={12} />
            </button>
          </div>

          <div>
            {guardasBaixaFreq.map((g) => (
              <GuardaRow key={g.id} guarda={g} />
            ))}
          </div>

          <div className="flex gap-4 mt-4 pt-3 border-t border-gray-50">
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              Crítico &lt;50%
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Baixo 50–74%
            </span>
          </div>
        </div>

        {/* Últimos eventos */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-400" />
              <h2 className="text-sm font-semibold text-gray-900">Últimos eventos</h2>
            </div>
            <button className="flex items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ver todos <ChevronRight size={12} />
            </button>
          </div>

          <div>
            {eventos.map((e) => (
              <EventoRow key={e.id} evento={e} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}