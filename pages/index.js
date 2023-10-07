import Categories from "@/components/Categories";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCart";
import Products from "@/components/Products";
import Wrapper from "@/components/wrapper";

export default function Home() {
  return (
    <main className="h-[100%]">
      <HeroSlider />
      <Categories />
      <Products />
      <Products />
      <Products />
    </main>
  );
}
