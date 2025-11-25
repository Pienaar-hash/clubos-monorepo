import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="bg-blue-900 text-white p-4">
        <div className="container mx-auto">
          <a href="/" className="font-bold mr-6">
            ClubOS Admin
          </a>
          <a href="/bookings" className="mr-4 hover:underline">
            Bookings
          </a>
          <a href="/sales" className="mr-4 hover:underline">
            Sales
          </a>
          <a href="/staff" className="mr-4 hover:underline">
            Staff
          </a>
          <a href="/inventory" className="mr-4 hover:underline">
            Inventory
          </a>
          <a href="/marketing" className="hover:underline">
            Marketing
          </a>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}
