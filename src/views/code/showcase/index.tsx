import { useEffect, useState } from "react";
import styles from "./showcase.module.scss";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CodeShowcaseView = () => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [search, setSearch] = useState(""); // State for search input
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger data refresh
  const { data }: any = useSession();

  const fetchData = () => {
    setIsLoading(true);
    fetch("/api/code/codes")
      .then((res) => res.json())
      .then((response) => {
        setDatas(response.data);
        setFilteredData(response.data); // Initialize filteredData with all data
        setIsLoading(false);
      });
  };

  // Effect to fetch data whenever refreshTrigger changes
  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  // Effect to filter data whenever search input changes
  useEffect(() => {
    const filtered = datas.filter((i: any) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, datas]);

  // Function to trigger data refresh
  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev); // Toggle refreshTrigger to force re-fetch
  };

  const handeDeleteCodeById = async (id: string) => {
    const response = await fetch(`/api/code/codes/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // setRefreshTrigger((prev) => !prev);
      fetchData();
    }
  };

  return (
    <div className={styles.showcase}>
      <div className={styles.showcase__senderamount}>
        Jumlah yang mengirim : {filteredData.length}
      </div>
      <h1 className={styles.showcase__title}>Code Showcase!</h1>
      <p className="my-3">
        Kirim kodinganmu{" "}
        <Link className="text-blue-600 hover:text-purple-700" href={"/"}>
          disini!
        </Link>
      </p>
      <div>
        {data && (
          <>
            <input
              type="text"
              className="bg-slate-200 w-[300px] p-2"
              placeholder="Search by name"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <button
              onClick={handleRefresh}
              className="bg-blue-500 text-white p-2 ml-4"
            >
              Refresh Data
            </button>
          </>
        )}
      </div>
      {isLoading ? (
        <div className="mt-10">Loading...</div>
      ) : filteredData.length > 0 ? (
        filteredData.map((i: any) => (
          <div className={styles.showcase__codes} key={i.id}>
            <div className="flex justify-between">
              <h2 className={styles.showcase__codes__sender}>{i.name}</h2>
            </div>
            <code>
              <div
                className={styles.showcase__codes__code}
                dangerouslySetInnerHTML={{ __html: i.code }}
              />
            </code>
            {data && (
              <button
                className="w-[100%] mt-3 p-2 bg-red-600 text-white"
                onClick={() => handeDeleteCodeById(i.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="mt-10">No matched data</div>
      )}
    </div>
  );
};

export default CodeShowcaseView;
