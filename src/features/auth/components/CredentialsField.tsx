import type { Credentials, CredentialsState } from '../types/credentials';

interface CredentialsFieldProps {
  label: string;
  field: keyof Credentials;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
}

export default function CredentialsField({
  label,
  field,
  placeholder,
  type,
  emailForm,
  setEmailForm,
}: CredentialsFieldProps & CredentialsState) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        required
        className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm outline-none focus:border-[#C4797A] transition-colors"
        placeholder={placeholder}
        value={emailForm[field]}
        onChange={e => {
          setEmailForm({ ...emailForm, [field]: e.target.value });
        }}
      />
    </div>
  );
}
