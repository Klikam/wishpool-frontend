import { useCredentialsStore } from '../store/useCredentialsStore';

interface CredentialsButtonProps {
  label: string;
  handleModeChange: () => void;
}

export default function CredentialsButton({
  label,
  handleModeChange,
}: CredentialsButtonProps) {
  const { mode } = useCredentialsStore();
  return (
    <button
      onClick={handleModeChange}
      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === label.trim().replaceAll(' ', '').toLowerCase() ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
    </button>
  );
}
