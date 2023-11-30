import Admin from "@/components/Admin";
import { useAuth } from "@/context/Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admindashboard = () => {
  const router = useRouter();
  const [auth]=useAuth();  
  
  return <>
  {auth?.user?.role===1 && <Admin />}
  {auth?.user?.role!==1 &&  <Link href={"/"}><h1 className="mt-[130px] text-center text-3xl font-bold">You Can Not Acceess This Page</h1><h1 className="mt-4 text-center text-blue-500 text-2xl font-bold">GO BACK</h1> </Link> }
  </>;
};

export default Admindashboard;
