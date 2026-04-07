import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ArrowDownRight, FileText } from "lucide-react";

const data = [
  { name: "Seguridad", value: 400, color: "#1B263B" }, // Azul Institucional
  { name: "Mantenimiento", value: 300, color: "#C4A46B" }, // Dorado Mate
  { name: "Servicios", value: 300, color: "#415A77" }, // Gris Pizarra
  { name: "Administración", value: 200, color: "#A63D40" }, // Rojo Terracota
];

const transactions = [
  { id: 1, title: "Pago Vigilancia", amount: -1200, date: "2026-03-28", category: "Seguridad" },
  { id: 2, title: "Aportes Vecinales", amount: 2500, date: "2026-03-27", category: "Ingresos" },
  { id: 3, title: "Reparación Bomba", amount: -850, date: "2026-03-25", category: "Mantenimiento" },
];

export function TransparencyModule() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Chart Section */}
        <div className="rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-brand-blue">Distribución de Gastos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1rem', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-brand-slate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-blue">Últimos Movimientos</h3>
            <button className="text-sm font-bold text-brand-gold hover:underline">Ver todos</button>
          </div>
          <div className="space-y-4">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-2xl bg-brand-bone p-4 transition-all hover:shadow-md hover:bg-white border border-transparent hover:border-brand-gold/10">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${t.amount > 0 ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-red/10 text-brand-red"}`}>
                    {t.amount > 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-brand-blue">{t.title}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-slate/60">{t.date} • {t.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className={`font-black ${t.amount > 0 ? "text-brand-gold" : "text-brand-red"}`}>
                    {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                  </p>
                  <button className="flex items-center gap-1 text-[10px] font-bold text-brand-blue hover:underline">
                    <FileText className="h-3 w-3" />
                    Factura
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

