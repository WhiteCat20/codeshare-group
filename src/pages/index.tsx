import Navbar from "@/components/layouts/Navbar";
import FrontFormView from "@/views/code";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {/* <div>Hello oke mantap</div> */}
      <FrontFormView />
    </div>
  );
}
