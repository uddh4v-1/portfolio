import { useMemo } from "react";
import DottedMapLib from "dotted-map";

interface DottedMapProps {
  lineColor?: string;
  className?: string;
}

export function DottedMap({ lineColor = "#e2e8f0", className }: DottedMapProps) {
  const svgMap = useMemo(() => {
    const map = new DottedMapLib({ height: 60, grid: "diagonal" });
    return map.getSVG({
      radius: 0.2,
      color: lineColor,
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [lineColor]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgMap }}
    />
  );
}
