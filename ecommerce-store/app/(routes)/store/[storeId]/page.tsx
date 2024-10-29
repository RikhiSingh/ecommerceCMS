import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";
import getStoreProducts from "@/actions/stores/get-store";
import getProducts from "@/actions/get-products";
import getStoreName from "@/actions/stores/get-store-name";

export const revalidate = 0;

interface StoreProdcutPageProps {
    params: {
        storeId: string;
    }
}

const StoreProdcutPage: React.FC<StoreProdcutPageProps> = async ({
    params
}) => {

    const storeProducts = await getStoreProducts(params.storeId);
    const featuredProducts = await getProducts({ isFeatured: true });

    const storeName = await getStoreName(params.storeId);

    return (
        <Container>
            <div className="bg-white">
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="h-[150px] bg-red-300 rounded-b-xl flex justify-center items-center text-white p-10 mb-4">
                        <p className="text-6xl font-extrabold">
                            {storeName.name}
                        </p>
                    </div>
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {Array.isArray(storeProducts) && storeProducts.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="mb-4 mt-8">
                        <Separator className="mb-4" />
                        <ProductList title="Featured Products" items={featuredProducts} />
                    </div>
                </div>
            </div>
        </Container>

    );
}

export default StoreProdcutPage;
