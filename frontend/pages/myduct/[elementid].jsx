import { useRouter } from "next/router";
import UpdateDuctPage from "../../components/DuctComp/UpdateDuctPage";
import { useEffect, useState } from "react";

export default function UpdateBankDetails() {
  // const { query } = useRouter();
  // const [ductData, setDuctData] = useState([]);
  // const queryString = Array.isArray(query?.elementid)
  //   ? query?.elementid[0]
  //   : query?.elementid;
  // useEffect(() => {
  //   if (query) {
  //     fetchDuctData();
  //   }
  // }, [query]);

  // const fetchDuctData = () => {
  //   fetch(`http://localhost:3000/api/duct/get/${query}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setDuctData(data.data);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // console.log("Idd", ductData);
  return <>
    {/* {queryString && <UpdateDuctPage query={queryString} />} */}
    test
  </>;
}
