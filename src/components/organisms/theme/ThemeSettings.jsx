import { useEffect, useState } from 'react';
import Button from '../../atoms/Button';

const DEFAULTS = {
  '--color-brand-blue': '#4D61FF',
  '--color-brand-dark': '#32325d',
  '--color-brand-muted': '#8898aa',
  '--color-brand-border': '#dee2e6',
  '--radius-dna': '0.5rem',
  '--shadow-dna': '0 4px 11px rgba(77, 97, 255, 0.15)'
};

function applyVars(vars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export default function ThemeSettings() {
  const [values, setValues] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('posata_theme')) || DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    // Apply current/loaded theme once on mount
    applyVars(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const next = { ...values, [name]: value };
    setValues(next);
    applyVars(next);
    localStorage.setItem('posata_theme', JSON.stringify(next));
  };

  const handleReset = () => {
    setValues(DEFAULTS);
    applyVars(DEFAULTS);
    localStorage.removeItem('posata_theme');
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-2xl font-bold mb-4">Ajustes de tema</h2>

      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Color principal</span>
          <input name="--color-brand-blue" type="color" value={values['--color-brand-blue']} onChange={handleChange} className="mt-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Color oscuro</span>
          <input name="--color-brand-dark" type="color" value={values['--color-brand-dark']} onChange={handleChange} className="mt-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Color muted</span>
          <input name="--color-brand-muted" type="color" value={values['--color-brand-muted']} onChange={handleChange} className="mt-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Border color</span>
          <input name="--color-brand-border" type="color" value={values['--color-brand-border']} onChange={handleChange} className="mt-2" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Radio (px/rem)</span>
          <input name="--radius-dna" type="text" value={values['--radius-dna']} onChange={handleChange} className="mt-2 input-dna" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-slate-600">Sombra CSS</span>
          <input name="--shadow-dna" type="text" value={values['--shadow-dna']} onChange={handleChange} className="mt-2 input-dna" />
        </label>

        <div className="flex gap-3 mt-4">
          <Button onClick={handleReset} className="btn-dna">Restablecer</Button>
          <a href="/gallery" className="ml-auto self-center text-sm text-slate-700 hover:underline">Volver a galería</a>
        </div>
      </div>
    </div>
  );
}
