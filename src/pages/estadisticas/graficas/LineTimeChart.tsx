import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DateTime } from "luxon";
import { formatMXN } from "@/lib/utils";

type Serie = {
  key: string;
  color: string;
  name?: string;
};

type RawItem = {
  fecha: string;
  [key: string]: number | string | undefined;
};

type Props = {
  data: RawItem[];
  series: Serie[];
};

export default function LineTimeChart({ data, series }: Props) {

  // Generar lista de meses de una fecha inicio a una fecha fin
  const generateMonths = (start: string, end: string): string[] => {
    const startDate = DateTime.fromISO(start).startOf("month");
    const endDate = DateTime.fromISO(end).startOf("month");

    const diff = endDate.diff(startDate, "months").months;

    return Array.from({ length: diff + 1 }, (_, i) =>
      startDate.plus({ months: i }).toFormat("yyyy-MM")
    );
  }

  // Normalizar datos (rellena meses + soporta múltiples líneas)
  const normalizeData = (data: RawItem[], series: Serie[])=>{
    if (!data.length) return [];

    const sorted = [...data].sort((a, b) => DateTime.fromISO(a.fecha).toMillis() - DateTime.fromISO(b.fecha).toMillis());
    const start = DateTime.fromISO(sorted[0].fecha).startOf("month");
    const end = DateTime.fromISO(sorted[sorted.length - 1].fecha).startOf("month");
    const months = generateMonths(start.toISODate()!, end.toISODate()!);
    const map = new Map<string, RawItem>();

    for (const item of sorted) {
      const key = DateTime.fromISO(item.fecha).toFormat("yyyy-MM");
      map.set(key, item);
    }

    const lastValues: Record<string, number> = {};
    return months.map((mes) => {
      const dt = DateTime.fromFormat(mes, "yyyy-MM");
      const item = map.get(mes);

      const result: any = {
        mes,
        fechaTS: dt.toMillis(),
      };

      for (const s of series) {
        if (item && item[s.key] !== undefined) {
          lastValues[s.key] = Number(item[s.key]);
        }
        result[s.key] = lastValues[s.key] ?? 0;
      }
      
      return result;
    });
  }

  const finalData = normalizeData(data, series);

  return (
    <div className="w-full my-8">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={finalData} margin={{ top: 0, right: 50, left: 50, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="fechaTS" type="number" domain={["dataMin", "dataMax"]} scale="time"
            tickFormatter={(value) => DateTime.fromMillis(value).toFormat("MM/yy")}/>

          <YAxis domain={["dataMin", "dataMax"]} tickFormatter={(value) => formatMXN(Number(value))}/>

          <Tooltip labelFormatter={(value) => DateTime.fromMillis(value).toFormat("LLLL yyyy")}
            formatter={(value: number) => formatMXN(Number(value))}/>

          <Legend />

          {/* Líneas dinámicas */}
          {series.map((s) => (
            <Line 
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              name={s.name || s.key}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}