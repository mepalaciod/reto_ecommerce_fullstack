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
        <span className="block text-sm font-medium text-slate-600">{label}</span>
      ) : null}

      <input
        id={inputId}
        className={joinClassNames(
          'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/10',
          inputClassName,
          className,
        )}
        {...props}
      />

      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}