function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function Input({
  label,
  id,
  error,
  hint,
  className = '',
  inputClassName = '',
  containerClassName = '',
  ...props
}) {
  const inputId = id ?? props.name;

  return (
    <label className={joinClassNames('block space-y-2', containerClassName)} htmlFor={inputId}>
      {label ? (
        <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-brand-gray">{label}</span>
      ) : null}

      <input
        id={inputId}
        className={joinClassNames(
          'input-dna bg-white/90 text-brand-dark shadow-sm backdrop-blur transition-all placeholder:text-brand-gray',
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-white/80',
          inputClassName,
          className,
        )}
        {...props}
      />

      {hint ? <p className="text-xs text-brand-gray">{hint}</p> : null}
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}