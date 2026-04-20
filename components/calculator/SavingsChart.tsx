interface ChartItem {
  department: string;
  savings: number;
}

interface Props {
  data: ChartItem[];
}

export default function SavingsChart({ data }: Props) {
  if (!data.length) return null;
  const max = data[0].savings;

  return (
    <div className="space-y-3">
      {data.map((item, i) => {
        const pct = Math.round((item.savings / max) * 100);
        return (
          <div key={item.department} className="flex items-center gap-3">
            <span className="text-xs font-label text-on-surface-variant w-28 shrink-0 text-right">
              {item.department}
            </span>
            <div className="flex-1 h-6 bg-surface-container-high rounded overflow-hidden relative">
              <div
                className="h-full rounded transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background:
                    i === 0
                      ? "linear-gradient(90deg, #1d5bae, #abc7ff)"
                      : i === 1
                      ? "linear-gradient(90deg, #ed6910, #ffb692)"
                      : "linear-gradient(90deg, #2b5ba8, #6ba3e8)",
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
            <span className="font-mono text-xs text-[#4CAF50] font-medium w-20 shrink-0">
              ${Math.round(item.savings).toLocaleString("en-US")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
