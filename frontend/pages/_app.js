import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import NavbarComp from "../components/Manager/NavbarComp";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavbarComp />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
