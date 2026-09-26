const phrases = [
  "EVERY TRIP COUNTS",
  "OWNER FIRST",
  "BUILT IN MAKHANDA",
  "TRUST IS EARNED IN THE FIELD",
  "CONSENT LED",
  "PRIVACY BY DESIGN",
];

// Duplicated for seamless CSS loop — the animation moves exactly 50%
const track = [...phrases, ...phrases];

export default function Marquee() {
  return (
    <div className="marqueeBand" aria-hidden="true">
      <div className="marqueeTrack">
        {track.map((phrase, i) => (
          <span key={i} className="marqueeItem">{phrase}</span>
        ))}
      </div>
    </div>
  );
}
