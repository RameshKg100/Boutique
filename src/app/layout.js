import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ScrollToTop from "@/components/ui/ScrollToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Sashaa Boutiques | Premium Fashion from Chennai",
  description:
    "Discover exquisite collections of Maxis, Sarees, Tops, and Kurtis at Sashaa Boutiques. Premium Chennai boutique offering custom tailoring, personal styling, and bridal curation services.",
  keywords:
    "boutique, fashion, sarees, kurtis, maxis, tops, Chennai, custom tailoring, bridal wear",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lato.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
