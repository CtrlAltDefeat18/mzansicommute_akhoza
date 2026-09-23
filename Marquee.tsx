const phrases = [
  "EVERY TRIP COUNTS",
  "OWNER FIRST",
  "BUILT IN MAKHANDA",
  "TRUST IS EARNED IN THE FIELD",
];

export default function Marquee() {
  const track = [...phrases, ...phrases]; // duplicated once for a seamless 50% loop
  return (
    <div className="marqueeBand" aria-hidden="true">
      <div className="marquee">
        {track.map((phrase, i) => (
          <span key={i}>{phrase}</span>
        ))}
      </div>
    </div>
  );
}
