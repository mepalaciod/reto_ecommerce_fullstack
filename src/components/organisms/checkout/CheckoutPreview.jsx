import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';
import Button from '../../atoms/Button';

export default function CheckoutPreview() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [shipping, setShipping] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkoutShipping') || '{}');
    } catch {
      return {};
    }
  });

  const handleChange = (event) => {
    const next = { ...shipping, [event.target.name]: event.target.value };
    setShipping(next);
    localStorage.setItem('checkoutShipping', JSON.stringify(next));
  };

  const handlePlaceOrder = () => {
    // Mock placing order: store order summary and clear cart
    const order = {
      id: Date.now(),
      items,
      total: getTotalPrice(),
      shipping,
      createdAt: new Date().toISOString()
    };
    const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]');
    orders.push(order);
    localStorage.setItem('mock_orders', JSON.stringify(orders));
    clearCart();
    navigate('/gallery');
  };

  if (!items || items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center">
        <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-slate-600">Agrega productos antes de continuar al checkout.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-4">Previsualización de compra</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.product.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{it.product.title}</div>
                  <div className="text-sm text-slate-500">Cantidad: {it.quantity}</div>
                </div>
                <div className="text-sm font-semibold">${(it.product.price * it.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Información de envío</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={shipping.name || ''} onChange={handleChange} placeholder="Nombre completo" className="input-dna" />
              <input name="email" value={shipping.email || ''} onChange={handleChange} placeholder="Correo electrónico" className="input-dna" />
              <input name="address" value={shipping.address || ''} onChange={handleChange} placeholder="Dirección" className="input-dna md:col-span-2" />
              <input name="phone" value={shipping.phone || ''} onChange={handleChange} placeholder="Teléfono" className="input-dna" />
            </div>
          </div>
        </div>

        <aside className="rounded-lg border p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-slate-600">Subtotal</div>
            <div className="font-semibold">${getTotalPrice().toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-sm text-slate-600">Envío</div>
            <div className="font-semibold">$5.00</div>
          </div>
          <div className="flex justify-between border-t pt-4">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-lg font-bold">${(getTotalPrice() + 5).toFixed(2)}</div>
          </div>

          <div className="mt-4">
            <Button onClick={handlePlaceOrder} className="w-full btn-dna">Confirmar compra</Button>
            <button onClick={() => navigate('/cart')} className="mt-3 w-full text-sm text-slate-700">Editar carrito</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
