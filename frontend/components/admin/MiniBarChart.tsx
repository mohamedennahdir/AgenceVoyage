interface DataPoint {
  date: string;
  value: number;
}

interface MiniBarChartProps {
  data: DataPoint[];
  label?: string;
  color?: string;
}

export function MiniBarChart({ data, label = 'Valeur', color = '#0F4C81' }: MiniBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 560;
  const H = 120;
  const barW = Math.floor(W / data.length) - 4;
  const gap = Math.floor(W / data.length);

  const formatDateShort = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  return (
    <div>
      {label && <p className="text-xs text-neutral-500 mb-2">{label}</p>}
      <svg
        viewBox={`0 0 ${W} ${H + 20}`}
        className="w-full"
        style={{ height: 140 }}
      >
        {data.map((d, i) => {
          const barH = Math.max(4, Math.round((d.value / max) * H));
          const x = i * gap + 2;
          const y = H - barH;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={3}
                fill={color}
                opacity={0.85}
              >
                <title>{formatDateShort(d.date)}: {d.value}</title>
              </rect>
              {/* Date label every 3 bars */}
              {i % 3 === 0 && (
                <text
                  x={x + barW / 2}
                  y={H + 16}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#9ca3af"
                >
                  {formatDateShort(d.date)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
