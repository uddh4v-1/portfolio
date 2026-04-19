

type Avatar3DProps = {
  size: number;
};

export default function Avatar3D({ size }: Avatar3DProps) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-current"
      style={{ width: size, height: size }}
    >
      UP
    </div>
  );
}