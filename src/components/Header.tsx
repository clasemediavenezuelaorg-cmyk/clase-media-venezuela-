import { Bell, User, Search, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-brand-bone lg:hidden">
            <Menu className="h-5 w-5 text-brand-slate" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-brand-blue">Clase Media</h1>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">Gestión Comunitaria</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/50" />
            <input
              type="text"
              placeholder="Buscar servicios, emprendedores..."
              className="h-10 w-full rounded-full border border-brand-gold/20 bg-brand-bone/50 pl-10 pr-4 text-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative rounded-full p-2 hover:bg-brand-bone">
            <Bell className="h-5 w-5 text-brand-slate" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white"></span>
          </button>
          <button className="flex items-center gap-2 rounded-full border border-brand-gold/20 p-1 pr-3 hover:bg-brand-bone">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden flex-col items-start text-left lg:flex">
              <span className="text-xs font-bold text-brand-blue">Hola, Vecino</span>
              <span className="text-[10px] font-medium text-brand-slate">Mi Perfil</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
