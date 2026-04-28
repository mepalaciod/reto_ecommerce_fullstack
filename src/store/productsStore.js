import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getProducts, getProductById as fetchProductById } from '../firebase/products';

const useProductsStore = create(
    persist(
        (set, get) => ({
            products: [],
            loading: false,
            error: null,

            fetchProducts: async () => {
                if (get().loading) {
                    return;
                }

                set({ loading: true, error: null });

                const products = await getProducts();

                set({
                    products,
                    loading: false,
                    error: products.length === 0 ? 'No se pudieron cargar los productos.' : null,
                });
            },

            fetchProductById: async (id) => {
                const cachedProduct = get().products.find((product) => String(product.id) === String(id));

                if (cachedProduct) {
                    return cachedProduct;
                }

                const product = await fetchProductById(id);

                if (product) {
                    set({
                        products: [...get().products.filter((item) => String(item.id) !== String(product.id)), product],
                    });
                }

                return product;
            },

            getProductById: (id) =>
                get().products.find((product) => String(product.id) === String(id)) ?? null,

            clearProducts: () => set({ products: [], error: null }),
        }),
        {
            name: 'reto-products-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ products: state.products }),
        },
    ),
);

export default useProductsStore;