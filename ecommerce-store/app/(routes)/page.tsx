import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Banner from "@/components/banner";
import Hero from "@/components/hero";
import { Separator } from "@/components/ui/separator";
import { FAQSection } from "@/components/faq";
import StoreLocator from "@/components/store-locator";
import { Product } from "@/types";

export const revalidate = 0;

const HomePage = async () => {
  // this is the landing page so show the featured
  let products: Product[] = [];
  try {
    products = await getProducts({ isFeatured: true });
  } catch (error) {
    console.log("Error fetching featured products: " + error);
  }
  // console.log("products:", products);
  // copy billboard Id and paste it here

  return (
    <>
      <Banner />
      <Container>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <StoreLocator />
            <Hero />
            <Separator />
            <ProductList title="Featured Products" items={products} />
            <FAQSection />
          </div>
      </Container>
    </>
  );
};

export default HomePage;
