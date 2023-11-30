import Categories from "@/components/Categories";
import HeroSlider from "@/components/HeroSlider";
import Products from "@/components/Products";
import Wrapper from "@/components/wrapper";
import Poster from "@/components/Poster";
import Testimonial from "@/components/Testimonial";
import Gallery from "@/components/Gallery ";


export default function Home() {
  const category1 = {
    name: "Rings",
    slug: "rings",
  };
  const category2 = {
    name: "Earrings",
    slug: "earrings",
  };
  const category3 = {
    name: "Bracelets",
    slug: "bracelet",
  };
  
  return (
    
    <main className="h-[100%]">
      <HeroSlider />
      <Categories />
      <section>
      <Poster poster={"../poster/3.png"}/>
        <Wrapper className={`max-w-[1860px]`}>
          <Products category={category1}/>
        </Wrapper>
      </section>
      <section>
      <Poster poster={"../poster/1.png"}/>
        <Wrapper className={`max-w-[1860px]`}>
          <Products category={category2}/>
        </Wrapper>
      </section>
      <section>
        <Poster poster={"../poster/2.png"}/>
        <Wrapper className={`max-w-[1860px]`}>
          <Products category={category3}/>
        </Wrapper>
      </section>
      <Testimonial />
      <Gallery />
    </main>
   
  );
}
