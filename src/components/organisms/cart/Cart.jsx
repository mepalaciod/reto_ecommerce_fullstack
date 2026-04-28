import { Link } from 'react-router-dom';
import Button from '../../atoms/Button';
import useCartStore from '../../../store/cartStore';

function formatMoney(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Carrito</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Tu carrito está vacío</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
            Agrega productos desde la galería o desde la ficha de detalle para verlos aquí con su total.
          </p>

          <Button as={Link} to="/gallery" size="lg" className="mt-8" variant="secondary">
            Ir a la galería
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Carrito</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Resumen de compra</h1>
          <p className="mt-2 text-sm text-slate-500">{totalItems} producto(s) en tu carrito.</p>
        </div>

        <Button variant="secondary" onClick={clearCart} className="self-start sm:self-auto">
          Vaciar carrito
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.product.title}</p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">{item.product.title}</h2>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{item.product.description}</p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <p className="text-lg font-semibold text-slate-900">{formatMoney(parseFloat(item.product.price) * item.quantity)}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>Cantidad: {item.quantity}</span>
                    <span>·</span>
                    <span>{formatMoney(parseFloat(item.product.price))} c/u</span>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.product.id)}>
                    Quitar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Total</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Productos</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
              <span>Total a pagar</span>
              <span>{formatMoney(totalPrice)}</span>
            </div>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Finalizar compra
          </Button>

          <Link to="/gallery" className="mt-4 block text-center text-sm font-medium text-slate-500 hover:text-slate-900 hover:underline">
            Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}