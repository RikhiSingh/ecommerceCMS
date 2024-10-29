import Container from "@/components/ui/container"
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Banner from "@/components/banner";
import Hero from "@/components/hero";
import { Separator } from "@/components/ui/separator";
import { FAQSection } from "@/components/faq";
import StoreLocator from "@/components/store-locator";

export const revalidate = 0;

const HomePage = async () => {
    // this is the landing page so show the featured
    const products = await getProducts({ isFeatured: true });
    // console.log("products:", products);
    // copy billboard Id and paste it here

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <Banner />
                    <StoreLocator />
                    <Hero />
                    <Separator />
                    <ProductList title="Featured Products" items={products} />
                    <FAQSection />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;