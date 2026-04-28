import MOCK_PRODUCTS from '../../../mockdata/mock_products';
import ProductCard from '../../molecules/ProductCard';

export default function ProductGallery({
  products = MOCK_PRODUCTS,
  title = 'Our Products',
  description = 'Explore our curated collection',
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-green/70">Curated selection</p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight text-brand-dark sm:text-4xl">{title}</h2>
          {description && <p className="mt-3 text-sm leading-6 text-brand-gray sm:text-base">{description}</p>}
        </div>

        <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-green shadow-dna backdrop-blur">
          {products.length} items
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}