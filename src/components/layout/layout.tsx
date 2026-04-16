import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  UserPlus,
  MapPin,
  Menu,
  X,
  Bell,
  ChevronRight,
  Shield,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

// ── Nav config ─────────────────────────────────────────────────────────────────

const navSections: NavSection[] = [
  {
    section: "Geral",
    items: [
      {
        label: "Painel",
        path: "/",
        icon: <LayoutDashboard size={16} />,
      },
    ],
  },
  {
    section: "Gestão",
    items: [
      {
        label: "Guardas",
        path: "/guardas",
        icon: <Users size={16} />,
      },
      {
        label: "Frequência",
        path: "/frequencia",
        icon: <CalendarCheck size={16} />,
      },
      {
        label: "Cadastro",
        path: "/cadastro",
        icon: <UserPlus size={16} />,
      },
    ],
  },
  {
    section: "Configuração",
    items: [
      {
        label: "Locais & Eventos",
        path: "/locais",
        icon: <MapPin size={16} />,
      },
    ],
  },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-[#0B1F3A] z-30 flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:z-auto md:shrink-0
        `}
      >
        {/* Logo */}
        <div className="px-5 pt-7 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C9973A] flex items-center justify-center shrink-0">
              <Shield size={16} className="text-[#0B1F3A]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#C9973A] leading-tight tracking-wide uppercase">
                Guardas de
              </p>
              <p className="text-[11px] font-semibold text-[#C9973A] leading-tight tracking-wide uppercase">
                N. Sra. Nazaré
              </p>
            </div>
          </div>
          <p className="text-[10px] text-white/30 mt-2">Sistema de frequência</p>
        </div>

        {/* Close button (mobile) */}
        <button
          className="absolute top-4 right-4 text-white/40 hover:text-white md:hidden"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.section} className="mb-4">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-white/25 px-3 mb-1">
                {section.section}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] mb-0.5
                    transition-colors duration-150 no-underline
                    ${
                      isActive(item.path)
                        ? "bg-white/10 text-[#E8B85A] font-medium"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }
                  `}
                >
                  <span
                    className={
                      isActive(item.path) ? "text-[#C9973A]" : "text-white/30"
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <ChevronRight size={12} className="ml-auto text-[#C9973A]" />
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9973A] flex items-center justify-center text-[12px] font-semibold text-[#0B1F3A] shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-white/80 truncate">
                Administrador
              </p>
              <p className="text-[10px] text-white/30 truncate">
                admin@guardas.org
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ── Topbar ─────────────────────────────────────────────────────────────────────

function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();

  const pageTitle = (): string => {
    if (pathname === "/") return "Painel geral";
    if (pathname.startsWith("/guardas")) return "Guardas";
    if (pathname.startsWith("/frequencia")) return "Frequência";
    if (pathname.startsWith("/cadastro")) return "Cadastro";
    if (pathname.startsWith("/locais")) return "Locais & Eventos";
    return "Sistema de frequência";
  };

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900">{pageTitle()}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 transition-colors">
          <Bell size={14} className="text-red-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <span className="hidden sm:inline text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-medium border border-blue-100">
          Administrador
        </span>
      </div>
    </header>
  );
}

// ── Layout ─────────────────────────────────────────────────────────────────────

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 items-start">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}