import ProductImage from "../atoms/product/ProductImage";
import ProductTitle from "../atoms/product/ProductTitle";
import ProductRate from "../atoms/product/ProductRate";
import ProductPrice from "../atoms/product/ProductPrice";
import { imageMap } from "../../assets/imageMap";
import { Link } from "react-router-dom";

function joinClassNames(...parts) {
    return parts.filter(Boolean).join(' ');
}

function ProductCard({ product }) {
    const resolvedImage = imageMap[product.image] ?? product.image;

    return (
        <Link
            to={`/product/${product.id}`}
            className={joinClassNames(
                'group block w-full max-w-[240px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
            )}
        >
            <div className="overflow-hidden rounded-2xl bg-slate-100">
                <ProductImage src={resolvedImage} alt={product.title} />
            </div>
            <div className="mt-4 space-y-2">
                <ProductTitle title={product.title} />
                <ProductPrice price={product.price} />
                <ProductRate rate={product.rate} />
            </div>
        </Link>
    );
}
export default ProductCard;

