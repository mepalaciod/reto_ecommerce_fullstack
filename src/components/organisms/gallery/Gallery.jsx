import ProductCard from "../../molecules/ProductCard";
import { useEffect } from "react";
import useProductsStore from "../../../store/productsStore";

export default function Gallery() {
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);
    const error = useProductsStore((state) => state.error);
    const fetchProducts = useProductsStore((state) => state.fetchProducts);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <section className="p-6">
            <h2 className="mb-6 text-2xl font-bold">Nuestros Productos</h2>

            {error ? (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    {error}
                </div>
            ) : null}

            <div className="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((producto) => (
                    <ProductCard key={producto.id} product={producto} />
                ))}
            </div>
        </section>
    );
}
