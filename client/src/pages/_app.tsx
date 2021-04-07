import "../../styles/globals.css";
import "tailwindcss/tailwind.css";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_ENDPOINT_SERVER;
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex items-center justify-center h-screen font-serif bg-blue-light">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
