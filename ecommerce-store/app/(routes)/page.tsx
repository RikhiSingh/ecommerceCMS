import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container"
import Billboard from "@/components/billboard";

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard("1aaa49cc-b8ab-4bd5-a528-316bedeba31f");

    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            </div>
        </Container>
     );
}
 
export default HomePage;