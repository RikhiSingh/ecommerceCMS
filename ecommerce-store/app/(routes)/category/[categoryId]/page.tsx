import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";
import ProductList from "@/components/product-list";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        sizeId: string;
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    // console.log("CategoryPage component loaded");
    const products = await getProducts({
        categoryId: params.categoryId,
        // sizeId: searchParams.sizeId
    }) || []; // Ensure products is always an array

    // console.log("Fetched products:", products); 

    const sizes = await getSizes();
    const category = await getCategory(params.categoryId);

    const featuredProducts = await getProducts({ isFeatured: true });

    return (
        <Container>
            <div className="bg-white dark:bg-black">
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="h-[150px] bg-green-800 rounded-b-xl flex justify-center items-center text-white p-10 mb-4">
                        <p className="text-6xl font-extrabold">
                            {category.name}
                        </p>
                    </div>
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} />
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
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

export default CategoryPage;
