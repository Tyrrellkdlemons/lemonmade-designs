export type Device = "desktop" | "tablet" | "mobile";

const devices: { id: Device; label: string; icon: string }[] = [
  { id: "desktop", label: "Desktop", icon: "🖥️" },
  { id: "tablet", label: "Tablet", icon: "📱" },
  { id: "mobile", label: "Mobile", icon: "📲" },
];

interface Props {
  value: Device;
  onChange: (d: Device) => void;
}

export default function DevicePreviewToggle({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Preview device size" className="inline-flex rounded-full border border-white/15 bg-navy/60 p-1">
      {devices.map((d) => (
        <button
          key={d.id}
          type="button"
          onClick={() => onChange(d.id)}
          aria-pressed={value === d.id}
          className={`focus-ring rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            value === d.id ? "bg-lemon text-navy" : "text-cream/70 hover:text-cream"
          }`}
        >
          <span aria-hidden="true" className="mr-1">{d.icon}</span>
          {d.label}
        </button>
      ))}
    </div>
  );
}
