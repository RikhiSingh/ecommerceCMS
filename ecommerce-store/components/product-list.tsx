import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
    title: string;
    items: Product[]; // Define items as an array of Product
}

const ProductList: React.FC<ProductListProps> = ({
    title,
    items = [] // Default to empty array if items is undefined
}) => {

    const safeItems = items ?? [];
    return ( 
        <div className="space-y-4">
            <h3 className="font-bold text-3xl">
                {title}
            </h3>
            {safeItems.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {safeItems.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
