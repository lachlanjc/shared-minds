// Adapted from respin

export default function Spinner({
  size = 16,
  spokes = 8,
  duration = 1000,
  ...rest
}: {
  size?: number;
  spokes?: number;
  duration?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      style={style}
      fill="currentcolor"
      {...rest}
    >
      {getPaths(spokes, duration)}
    </svg>
  );
}

const getPaths = (length: number, dur: number) =>
  Array.from({ length }).map((n, i) => (
    <path
      key={i}
      opacity={0.1}
      d="M15 0 H17 V8 H17z"
      transform={`rotate(${(i * 360) / length} 16 16)`}
    >
      <animate
        attributeName="opacity"
        from={1}
        to={0.1}
        dur={dur + "ms"}
        repeatCount="indefinite"
        begin={(i * dur) / length + "ms"}
      />
    </path>
  ));

const style = {
  display: "inline-flex",
  margin: 0,
};
