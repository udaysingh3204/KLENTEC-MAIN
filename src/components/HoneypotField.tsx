interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/** Hidden from real users (off-screen, unfocusable, unlabeled); bots that
 * auto-fill every field often fill this one, giving away the game. */
export const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => (
  <input
    type="text"
    name="website"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
  />
);
