import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"] });
const queryClient = new QueryClient();
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <motion.div
          className={montserrat.className}
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <Toaster position="top-center" reverseOrder={false} />
          <Component {...pageProps} />
        </motion.div>
      </CartProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
