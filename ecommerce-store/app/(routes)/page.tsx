import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container"
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
    // this is the landing page so show the featured
    const products = await getProducts({ isFeatured: true });
    // copy billboard Id and paste it here
    const billboard = await getBillboard("8c0e2ebf-f228-4b8f-93d4-6ab94f329dce");

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