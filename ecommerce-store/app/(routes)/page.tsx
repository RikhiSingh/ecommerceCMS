import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container"
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
    // this is the landing page so show the featured
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("1aaa49cc-b8ab-4bd5-a528-316bedeba31f");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;