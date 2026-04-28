function joinClassNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold tracking-[0.04em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 cursor-pointer will-change-transform';

const variants = {
  primary:
    'bg-brand-green text-white shadow-dna hover:-translate-y-0.5 hover:shadow-glow hover:brightness-105 focus-visible:ring-brand-green/30',
  secondary:
    'bg-brand-yellow text-brand-dark shadow-dna hover:-translate-y-0.5 hover:shadow-glow hover:brightness-105 focus-visible:ring-brand-yellow/30',
  outline:
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-green focus-visible:ring-white/30',
  ghost:
    'bg-transparent px-4 py-2 text-brand-gray hover:bg-brand-light focus-visible:ring-brand-light/30',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  as: Component = 'button',
  children,
  ...props
}) {
  const componentProps = Component === 'button' ? { type, ...props } : props;

  return (
    <Component className={joinClassNames(baseClasses, variants[variant], sizes[size], className)} {...componentProps}>
      {children}
    </Component>
  );
}