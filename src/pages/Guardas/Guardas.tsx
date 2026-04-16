import { useState } from "react";
import {
  Search,
  Filter,
  ChevronRight,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Shirt,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Users,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type TipoGuarda = "Guarda" | "Guarda Mirim";
type StatusGuarda = "Ativo" | "Inativo" | "Suspenso";
type FreqStatus = "Alta" | "Média" | "Baixa";

interface Evento {
  nome: string;
  data: string;
  hora: string;
  tipo: "Missa" | "Ensaio" | "Reunião" | "Procissão";
}

interface Guarda {
  id: number;
  nome: string;
  matricula: string;
  tipo: TipoGuarda;
  status: StatusGuarda;
  frequencia: number;
  ultimaPresenca: string;
  cpf: string;
  responsavel?: string;
  cpfResponsavel?: string;
  endereco: string;
  email: string;
  telefone: string;
  tipoSanguineo: string;
  tamanhoCamisa: string;
  proximosEventos: Evento[];
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const guardas: Guarda[] = [
  {
    id: 1,
    nome: "Ana Lima",
    matricula: "00089",
    tipo: "Guarda",
    status: "Ativo",
    frequencia: 88,
    ultimaPresenca: "09/04/2026",
    cpf: "123.456.789-00",
    endereco: "Tv. Mauriti, 220 — Marco, Belém/PA",
    email: "ana.lima@email.com",
    telefone: "(91) 99812-3456",
    tipoSanguineo: "A+",
    tamanhoCamisa: "M",
    proximosEventos: [
      { nome: "Missa Solene", data: "12/04/2026", hora: "09:00", tipo: "Missa" },
      { nome: "Ensaio Geral", data: "15/04/2026", hora: "19:00", tipo: "Ensaio" },
      { nome: "Reunião", data: "17/04/2026", hora: "18:00", tipo: "Reunião" },
    ],
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    matricula: "00134",
    tipo: "Guarda",
    status: "Ativo",
    frequencia: 76,
    ultimaPresenca: "09/04/2026",
    cpf: "987.654.321-00",
    endereco: "Av. Almirante Barroso, 1500 — Belém/PA",
    email: "carlos.mendes@email.com",
    telefone: "(91) 98765-4321",
    tipoSanguineo: "O-",
    tamanhoCamisa: "G",
    proximosEventos: [
      { nome: "Missa Solene", data: "12/04/2026", hora: "09:00", tipo: "Missa" },
      { nome: "Reunião", data: "17/04/2026", hora: "18:00", tipo: "Reunião" },
    ],
  },
  {
    id: 3,
    nome: "João Silva",
    matricula: "00342",
    tipo: "Guarda",
    status: "Ativo",
    frequencia: 28,
    ultimaPresenca: "01/03/2026",
    cpf: "321.654.987-00",
    endereco: "Rua dos Mundurucus, 450 — Belém/PA",
    email: "joao.silva@email.com",
    telefone: "(91) 99111-2233",
    tipoSanguineo: "B+",
    tamanhoCamisa: "GG",
    proximosEventos: [
      { nome: "Missa Solene", data: "12/04/2026", hora: "09:00", tipo: "Missa" },
    ],
  },
  {
    id: 4,
    nome: "Maria Souza",
    matricula: "00218",
    tipo: "Guarda",
    status: "Ativo",
    frequencia: 33,
    ultimaPresenca: "05/03/2026",
    cpf: "456.789.123-00",
    endereco: "Tv. Benjamin Constant, 88 — Belém/PA",
    email: "maria.souza@email.com",
    telefone: "(91) 99222-3344",
    tipoSanguineo: "AB+",
    tamanhoCamisa: "P",
    proximosEventos: [
      { nome: "Ensaio Geral", data: "15/04/2026", hora: "19:00", tipo: "Ensaio" },
    ],
  },
  {
    id: 5,
    nome: "Pedro Nunes",
    matricula: "00501",
    tipo: "Guarda Mirim",
    status: "Ativo",
    frequencia: 40,
    ultimaPresenca: "09/03/2026",
    cpf: "099.899.999-99",
    responsavel: "Fernando Nunes",
    cpfResponsavel: "099.899.888-99",
    endereco: "Travessa Chaco, 2350 — Marco, Belém/PA",
    email: "pedro@email.com",
    telefone: "(91) 99999-9999",
    tipoSanguineo: "O+",
    tamanhoCamisa: "M",
    proximosEventos: [
      { nome: "Missa", data: "11/04/2026", hora: "19:00", tipo: "Missa" },
      { nome: "Ensaio", data: "10/04/2026", hora: "19:00", tipo: "Ensaio" },
      { nome: "Reunião", data: "09/04/2026", hora: "18:00", tipo: "Reunião" },
      { nome: "Reunião", data: "07/04/2026", hora: "17:00", tipo: "Reunião" },
    ],
  },
  {
    id: 6,
    nome: "Lucia Oliveira",
    matricula: "00377",
    tipo: "Guarda Mirim",
    status: "Ativo",
    frequencia: 47,
    ultimaPresenca: "21/03/2026",
    cpf: "111.222.333-44",
    responsavel: "Sandra Oliveira",
    cpfResponsavel: "555.666.777-88",
    endereco: "Av. Pedro Álvares Cabral, 300 — Belém/PA",
    email: "lucia@email.com",
    telefone: "(91) 98877-6655",
    tipoSanguineo: "A-",
    tamanhoCamisa: "P",
    proximosEventos: [
      { nome: "Missa Solene", data: "12/04/2026", hora: "09:00", tipo: "Missa" },
      { nome: "Ensaio", data: "15/04/2026", hora: "19:00", tipo: "Ensaio" },
    ],
  },
  {
    id: 7,
    nome: "Roberto Farias",
    matricula: "00290",
    tipo: "Guarda",
    status: "Inativo",
    frequencia: 15,
    ultimaPresenca: "10/02/2026",
    cpf: "999.888.777-66",
    endereco: "Rua Boaventura da Silva, 700 — Belém/PA",
    email: "roberto@email.com",
    telefone: "(91) 97766-5544",
    tipoSanguineo: "B-",
    tamanhoCamisa: "G",
    proximosEventos: [],
  },
  {
    id: 8,
    nome: "Fernanda Costa",
    matricula: "00412",
    tipo: "Guarda",
    status: "Ativo",
    frequencia: 82,
    ultimaPresenca: "09/04/2026",
    cpf: "222.333.444-55",
    endereco: "Passagem São Jorge, 15 — Belém/PA",
    email: "fernanda@email.com",
    telefone: "(91) 99334-5566",
    tipoSanguineo: "O+",
    tamanhoCamisa: "M",
    proximosEventos: [
      { nome: "Missa Solene", data: "12/04/2026", hora: "09:00", tipo: "Missa" },
      { nome: "Ensaio Geral", data: "15/04/2026", hora: "19:00", tipo: "Ensaio" },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function getInitials(nome: string): string {
  return nome.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function getFreqStatus(pct: number): FreqStatus {
  if (pct >= 75) return "Alta";
  if (pct >= 50) return "Média";
  return "Baixa";
}

const freqStatusStyle: Record<FreqStatus, string> = {
  Alta:  "bg-green-50 text-green-800",
  Média: "bg-amber-50 text-amber-800",
  Baixa: "bg-red-50 text-red-800",
};

const freqBarColor: Record<FreqStatus, string> = {
  Alta:  "bg-green-400",
  Média: "bg-amber-400",
  Baixa: "bg-red-400",
};

const statusStyle: Record<StatusGuarda, string> = {
  Ativo:    "bg-green-50 text-green-800",
  Inativo:  "bg-gray-100 text-gray-600",
  Suspenso: "bg-red-50 text-red-800",
};

const eventoBadge: Record<string, string> = {
  Missa:     "bg-blue-50 text-blue-800",
  Ensaio:    "bg-purple-50 text-purple-800",
  Reunião:   "bg-gray-100 text-gray-700",
  Procissão: "bg-amber-50 text-amber-800",
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function Avatar({ nome, size = "md" }: { nome: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-20 h-20 text-2xl" };
  return (
    <div className={`${sizes[size]} rounded-full bg-[#1A3A5C] flex items-center justify-center font-semibold text-white shrink-0`}>
      {getInitials(nome)}
    </div>
  );
}

function FreqBar({ pct }: { pct: number }) {
  const status = getFreqStatus(pct);
  return (
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1.5">
      <div className={`h-full rounded-full ${freqBarColor[status]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0 gap-4">
      <span className="text-xs text-gray-400 shrink-0">{label}</span>
      <span className={`text-xs font-medium text-right ${highlight ?? "text-gray-800"}`}>{value}</span>
    </div>
  );
}

// ── Painel de detalhe ──────────────────────────────────────────────────────────

function GuardaDetalhe({ guarda, onClose }: { guarda: Guarda; onClose: () => void }) {
  const freqStatus = getFreqStatus(guarda.frequencia);
  const FreqIcon = freqStatus === "Alta" ? TrendingUp : freqStatus === "Média" ? Minus : TrendingDown;

  return (
    <div className="bg-gray-100 p-0 md:p-6 animate-fadeIn">
      {/* Header mobile */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onClose}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-gray-700"
        >
          <X size={16} />
        </button>
        <h2 className="text-sm font-semibold text-gray-500">Ficha do guarda</h2>
        <button
          onClick={onClose}
          className="hidden md:flex ml-auto w-8 h-8 items-center justify-center rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Coluna esquerda — perfil */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
          <Avatar nome={guarda.nome} size="lg" />
          <h2 className="text-lg font-semibold text-gray-900 mt-4 text-center">{guarda.nome}</h2>
          <div className="flex items-center gap-1.5 mt-1 mb-5">
            {guarda.tipo === "Guarda Mirim" ? (
              <Shield size={12} className="text-blue-500" />
            ) : (
              <Users size={12} className="text-[#1A3A5C]" />
            )}
            <p className={`text-sm font-semibold ${guarda.tipo === "Guarda Mirim" ? "text-blue-700" : "text-[#1A3A5C]"}`}>
              {guarda.tipo}
            </p>
          </div>

          <div className="w-full space-y-0">
            <InfoRow label="Matrícula" value={guarda.matricula} />
            <InfoRow label="CPF do guarda" value={guarda.cpf} />
            {guarda.responsavel && (
              <InfoRow label="Responsável" value={guarda.responsavel} />
            )}
            {guarda.cpfResponsavel && (
              <InfoRow label="CPF do responsável" value={guarda.cpfResponsavel} />
            )}
            <InfoRow label="Endereço" value={guarda.endereco} />
            <InfoRow label="Email" value={guarda.email} />
            <InfoRow label="Telefone" value={guarda.telefone} />
            <InfoRow label="Tipo sanguíneo" value={guarda.tipoSanguineo} highlight="text-red-600" />
            <InfoRow label="Tamanho da camisa" value={guarda.tamanhoCamisa} />
            <InfoRow
              label="Status"
              value={guarda.status}
              highlight={guarda.status === "Ativo" ? "text-green-600" : guarda.status === "Inativo" ? "text-gray-500" : "text-red-600"}
            />
          </div>
        </div>

        {/* Coluna direita */}
        <div className="md:col-span-2 space-y-4">

          {/* Cards de frequência */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Frequência</p>
              <p className={`text-2xl font-semibold ${freqStatus === "Alta" ? "text-green-600" : freqStatus === "Média" ? "text-amber-600" : "text-red-500"}`}>
                {guarda.frequencia}%
              </p>
              <FreqBar pct={guarda.frequencia} />
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <div className="flex items-center gap-1.5 mt-1">
                <FreqIcon size={16} className={freqStatus === "Alta" ? "text-green-500" : freqStatus === "Média" ? "text-amber-500" : "text-red-400"} />
                <p className={`text-lg font-semibold ${freqStatus === "Alta" ? "text-green-700" : freqStatus === "Média" ? "text-amber-700" : "text-red-600"}`}>
                  {freqStatus}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">Última presença</p>
              <p className="text-base font-semibold text-gray-800 mt-1">{guarda.ultimaPresenca}</p>
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={15} className="text-blue-400" />
              <h3 className="text-sm font-semibold text-gray-900">Próximos eventos</h3>
            </div>

            {guarda.proximosEventos.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">Nenhum evento agendado.</p>
            ) : (
              <ul className="space-y-2">
                {guarda.proximosEventos.map((ev, i) => (
                  <li key={i} className="flex items-center justify-between border border-gray-50 bg-gray-50 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ev.nome}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ev.data}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${eventoBadge[ev.tipo]}`}>
                        {ev.tipo}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">{ev.hora}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Ações rápidas */}
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors border border-gray-50">
              <Phone size={14} className="text-blue-400" /> Ligar
            </button>
            <button className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors border border-gray-50">
              <Mail size={14} className="text-purple-400" /> Enviar email
            </button>
            <button className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors border border-gray-50">
              <Calendar size={14} className="text-green-400" /> Registrar presença
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Listagem ───────────────────────────────────────────────────────────────────

function GuardaCard({ guarda, onClick }: { guarda: Guarda; onClick: () => void }) {
  const freqStatus = getFreqStatus(guarda.frequencia);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 border border-transparent hover:border-gray-100"
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar nome={guarda.nome} size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{guarda.nome}</p>
          <p className="text-xs text-gray-400 mt-0.5">Mat. {guarda.matricula} · {guarda.tipo}</p>
        </div>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-400">Frequência</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${freqStatusStyle[freqStatus]}`}>
            {freqStatus}
          </span>
          <span className="text-xs font-semibold text-gray-700">{guarda.frequencia}%</span>
        </div>
      </div>
      <FreqBar pct={guarda.frequencia} />

      <div className="flex items-center justify-between mt-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusStyle[guarda.status]}`}>
          {guarda.status}
        </span>
        <span className="text-[10px] text-gray-400">Última pres.: {guarda.ultimaPresenca}</span>
      </div>
    </button>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function Guardas() {
  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"Todos" | TipoGuarda>("Todos");
  const [filtroFreq, setFiltroFreq] = useState<"Todos" | FreqStatus>("Todos");
  const [selecionado, setSelecionado] = useState<Guarda | null>(null);

  const filtrados = guardas.filter((g) => {
    const matchNome = g.nome.toLowerCase().includes(search.toLowerCase()) ||
                      g.matricula.includes(search);
    const matchTipo = filtroTipo === "Todos" || g.tipo === filtroTipo;
    const matchFreq = filtroFreq === "Todos" || getFreqStatus(g.frequencia) === filtroFreq;
    return matchNome && matchTipo && matchFreq;
  });

  if (selecionado) {
    return <GuardaDetalhe guarda={selecionado} onClose={() => setSelecionado(null)} />;
  }

  return (
    <div className="bg-gray-100 min-h-full">

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
        {/* Busca */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 min-w-48 border border-gray-100">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar por nome ou matrícula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={12} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Filtro tipo */}
        <div className="flex items-center gap-1.5">
          <Filter size={13} className="text-gray-400" />
          {(["Todos", "Guarda", "Guarda Mirim"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltroTipo(t)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filtroTipo === t
                  ? "bg-[#0B1F3A] text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filtro frequência */}
        <div className="flex items-center gap-1.5">
          {(["Todos", "Alta", "Média", "Baixa"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltroFreq(f)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filtroFreq === f
                  ? "bg-[#0B1F3A] text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-400 ml-auto shrink-0">
          {filtrados.length} {filtrados.length === 1 ? "guarda" : "guardas"}
        </span>
      </div>

      {/* Grid de cards */}
      {filtrados.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <User size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhum guarda encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtrados.map((g) => (
            <GuardaCard key={g.id} guarda={g} onClick={() => setSelecionado(g)} />
          ))}
        </div>
      )}
    </div>
  );
}