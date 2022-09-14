import Head from "next/head";
import { TableComponent } from "../components/Manager/Table";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Home.getInitialProps = async (context) => {
//   const { data } = await buildClient(context).get(
//     "http://localhost:5000/api/users/currentuser"
//   );

//   console.log(data);
//   return data;
// };

export default function Home({ data }) {
  const router = useRouter();
  const [empList, setEmplist] = useState([]);

  const getProps = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.push("/auth/signin");
    }
    const { data } = await axios.put(
      "http://localhost:5000/api/users/currentuser",
      {
        jwt,
      }
    );

    const { currentUser } = data;
    console.log(currentUser);
    if (!currentUser) {
      router.push("/auth/signin");
    }

    const { data: data1 } = await axios.get(
      "http://localhost:5000/api/emp/all"
    );
    setEmplist(data1);
  };
  useEffect(() => {
    getProps();
  }, []);

  return (
    <>
      <Head>
        <title>KinderPass</title>
      </Head>
      <main className="container mt-10">
        <TableComponent emp={empList} />
      </main>
    </>
  );
}
