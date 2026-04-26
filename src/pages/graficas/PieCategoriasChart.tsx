import { type PieCategoriasChartType } from "@/types/graficas";
import { Pie, PieChart, Cell, Label } from "recharts";
import { formatMXN } from "@/lib/utils";
import { useSelectedCategoriaStore } from "@/stores/selectedCategoriaStore";
import { useEffect } from "react";
import { COLORS } from "@/types/categoria";

type Props = {
  data: PieCategoriasChartType;
};

type PieCategoria = {
    id: number,
    name: string;
    value: number;
};

export default function PieCategoriasChart({ data }: Props) {
    const { selectedCategoriaId, setSelectedCategoriaId, resetSelectedCategoria } = useSelectedCategoriaStore();

    const dataChart: PieCategoria[] = Object.values(
        data.reduce((acc, item) => {
        if (!acc[item.idCategoria]) {
            acc[item.idCategoria] = { id: item.idCategoria, name: item.categoria, value: 0 };
        }
        acc[item.idCategoria].value += Math.abs(item.cantidad);;
        return acc;
        }, {} as Record<string, PieCategoria>)
    );

    dataChart.sort((a, b) => b.value - a.value);

    const activeItem = selectedCategoriaId !== null ? dataChart.find(item => item.id === selectedCategoriaId) ?? null : null;
    const total = dataChart.reduce((sum, item) => sum + item.value, 0);

    useEffect(() => {
      return () => {
        resetSelectedCategoria();
      };
    }, [resetSelectedCategoria]);

  return (
    <PieChart style={{ width: "100%", aspectRatio: 2 }} onClick={() => setSelectedCategoriaId(null)}>
      <Pie 
        data={dataChart}
        innerRadius="50%"
        outerRadius="70%"
        dataKey="value"
        nameKey="name"
        paddingAngle={5}
        onClick={(entry: { payload?: PieCategoria }, _, e) => {
          e.stopPropagation();
          const categoria = entry.payload;
          if (!categoria) return;
          setSelectedCategoriaId(
            selectedCategoriaId === categoria.id ? null : categoria.id
          );
        }}
        labelLine={false}
        label={(entry) => selectedCategoriaId  === null ? entry.name : ""}
        isAnimationActive={false}
      >
        {dataChart.map((item, index) => {
          const isActive = item.id === selectedCategoriaId;

          return (
            <Cell
              key={index}
              fill={COLORS[item.id-1]}
              opacity={selectedCategoriaId === null || isActive ? 1 : 0.3}
              stroke={isActive ? "#000" : "none"}
              strokeWidth={isActive ? 2 : 0}
              style={{ cursor: "pointer" }} 
            />
          );
        })}

        {/* Label central */}
        <Label
          content={() => {
            if (!activeItem) {
              return (
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff">
                  <tspan x="50%" dy="-0.3em" fontSize="14">Total</tspan>
                  <tspan x="50%" dy="1.2em" fontSize="18" fontWeight="bold">{formatMXN(total)}</tspan>
                </text>
              );
            }

            const percent = ((activeItem.value / total) * 100).toFixed(0);

            return (
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff">
                <tspan x="50%" dy="-0.3em" fontSize="14">
                  {activeItem.name}
                </tspan>
                <tspan x="50%" dy="1.2em" fontSize="18" fontWeight="bold">
                  {formatMXN(activeItem.value)} ({percent}%)
                </tspan>
              </text>
            );
          }}
        />
      </Pie>
    </PieChart>
  );
}   