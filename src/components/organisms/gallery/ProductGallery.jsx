import MOCK_PRODUCTS from '../../../mockdata/mock_products';
import ProductCard from '../../molecules/ProductCard';

export default function ProductGallery({
  products = MOCK_PRODUCTS,
  title = 'Galería de productos',
  description = 'Explora la colección destacada en un grid adaptable a cualquier pantalla.',
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}