import { useEffect, useState } from "react";
import useProductsStore from "../../../store/productsStore";
import ProductGallery from './ProductGallery';
import Input from '../../atoms/Input';

export default function Gallery() {
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);
    const error = useProductsStore((state) => state.error);
    const fetchProducts = useProductsStore((state) => state.fetchProducts);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
    });

    // Cálculos de paginación
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
    // Validar que currentPage no exceda totalPages (auto-ajuste cuando cambia búsqueda)
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Reset a página 1 cuando cambia la búsqueda
    // This is a valid pattern for resetting pagination on filter changes
    // See: https://react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern for resetting derived state
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900"></div>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <div className="bg-brand-green text-white shadow-dna relative overflow-hidden py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                            Beauty essentials
                        </span>
                        <h1 className="mt-5 font-heading text-5xl tracking-tight sm:text-6xl">Our Collection</h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                            Discover a curated edit of premium beauty products designed to feel warm, refined, and modern.
                        </p>
                    </div>
                </div>
            </div>

            {error ? (
                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-dna border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {error}
                    </div>
                </div>
            ) : null}

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-dna backdrop-blur sm:p-6">
                    <Input
                        label="Search"
                        type="text"
                        placeholder="Search by name, brand or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <p className="mt-4 text-sm text-brand-gray">
                        Found <span className="font-bold text-brand-green">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                        {totalPages > 1 && (
                            <> • Page <span className="font-semibold">{validCurrentPage}</span> of <span className="font-semibold">{totalPages}</span></>
                        )}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gray transition-colors hover:text-brand-green"
                    >
                        Reset filters
                    </button>
                </div>
            </div>

            {filteredProducts.length === 0 && searchQuery ? (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-dna border border-slate-200 bg-slate-50 p-12 text-center">
                        <p className="text-brand-gray">
                            No products found for <span className="font-semibold">"{searchQuery}"</span>
                        </p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-brand-green hover:text-brand-dark text-sm font-semibold transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <ProductGallery
                        products={paginatedProducts.length > 0 ? paginatedProducts : undefined}
                        title={searchQuery ? `Resultados de búsqueda para "${searchQuery}"` : "Nuestros Productos"}
                        description={searchQuery ? `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}` : ''}
                    />

                    {/* Controles de paginación */}
                    {totalPages > 1 && (
                        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center gap-2">
                                {/* Botón anterior */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={validCurrentPage === 1}
                                    className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-dna"
                                >
                                    ← Prev
                                </button>

                                {/* Números de página */}
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                                                validCurrentPage === page
                                                    ? 'bg-brand-green text-white shadow-dna'
                                                    : 'border border-slate-300 text-brand-dark hover:bg-brand-light'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                {/* Botón siguiente */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={validCurrentPage === totalPages}
                                    className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-dna"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
