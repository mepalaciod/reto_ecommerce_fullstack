import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import Button from "../atoms/Button";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";
import useCartStore from '../../store/cartStore';

function joinClassNames(...parts) {
    return parts.filter(Boolean).join(' ');
}

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product, 1);
    };

    return (
        <article className={joinClassNames('group flex w-full max-w-xs flex-col overflow-hidden rounded-dna bg-white card-dna p-0')}>
            <Link to={`/product/${product.id}`} className="block overflow-hidden">
                <div className="relative overflow-hidden bg-gradient-to-br from-brand-light to-brand-card h-72 flex items-center justify-center transition-all duration-300">
                    <ProductImage src={resolvedImage} alt={product.title} className="transform transition-transform duration-400 group-hover:-translate-y-8 group-hover:scale-110" />
                </div>
            </Link>

            <div className="flex flex-col flex-1 p-6 space-y-4">
                <div className="space-y-3 flex-1">
                    <ProductTitle title={product.title} />
                    <ProductPrice price={product.price} />
                    <ProductRate rate={product.rate} />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button as={Link} to={`/product/${product.id}`} variant="ghost" size="sm" className="w-full text-brand-dark hover:text-brand-dark hover:bg-brand-light font-medium">
                        View
                    </Button>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 rounded-full bg-brand-yellow text-brand-dark font-bold py-3 px-4 shadow-dna hover:shadow-dna-lg hover:scale-105 active:scale-95 transition-all duration-300 text-sm"
                    >
                        🛒 Add
                    </button>
                </div>
            </div>
        </article>
    );
}
export default ProductCard;

