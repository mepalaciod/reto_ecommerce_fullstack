import { useEffect } from "react";
import useProductsStore from "../../../store/productsStore";
import ProductGallery from './ProductGallery';

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
        <>
            {error ? (
                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {error}
                    </div>
                </div>
            ) : null}

            <ProductGallery products={products} title="Nuestros Productos" />
        </>
    );
}
