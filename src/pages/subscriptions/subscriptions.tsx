import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import PaginationController from "@/components/ui/pagination";
import SearchBar from "@/components/ui/searchBar";
import ActionTable from "@/components/ui/table";
import { UserTypes } from "@/lib/userTypes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Subscriptions() {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const approve = (id: string) => {
    fetch(`${import.meta.env.VITE_REST_SERVICE}/subscription/accept/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
          setRefreshKey(refreshKey + 1);
        } else {
          toast.error(res.message);
        }
      }).catch((error) => {
        toast.error(error);
      });
  };

  const reject = (id: string) => {
    fetch(`${import.meta.env.VITE_REST_SERVICE}/subscription/reject/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
          setRefreshKey(refreshKey + 1);
        } else {
          toast.error(res.message);
        }
      }).catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(`${import.meta.env.VITE_REST_SERVICE}/subscriptions`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("search", search);
        const response = await fetch(url.href, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        setTotalPages(result.data.maxPage);
        setTableData(result.data.users);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchData();
  }, [refreshKey, page, search]);

  const headers = { id: "ID", username: "Username" };
  const renderActions = (rowData: Record<string, any>) => (
    <div className="flex px-3 py-1 items-center gap-3">
      <Button
        className="flex w-8 h-8 p-1 justify-center items-center flex-shrink-0 bg-green-500 rounded-xl"
        onClick={() => {
          approve(rowData.id);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M13.7068 0.292923C14.0974 0.683487 14.0974 1.31776 13.7068 1.70833L5.70807 9.70708C5.3175 10.0976 4.68323 10.0976 4.29266 9.70708L0.293289 5.7077C-0.0972748 5.31714 -0.0972748 4.68286 0.293289 4.2923C0.683853 3.90173 1.31813 3.90173 1.70869 4.2923L5.00193 7.58241L12.2945 0.292923C12.6851 -0.097641 13.3194 -0.097641 13.7099 0.292923H13.7068Z" fill="white" />
        </svg>
      </Button>
      <Button
        className="flex w-8 h-8 p-1 justify-center items-center flex-shrink-0 bg-red-500 rounded-xl"
        onClick={() => {
          reject(rowData.id);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M9.70405 1.70779C10.0945 1.31735 10.0945 0.683273 9.70405 0.292831C9.3136 -0.0976105 8.67952 -0.0976105 8.28908 0.292831L5 3.58504L1.70779 0.295955C1.31735 -0.094487 0.683273 -0.094487 0.292831 0.295955C-0.0976105 0.686397 -0.0976105 1.32047 0.292831 1.71092L3.58504 5L0.295955 8.29221C-0.0944869 8.68265 -0.0944869 9.31673 0.295955 9.70717C0.686397 10.0976 1.32047 10.0976 1.71092 9.70717L5 6.41496L8.29221 9.70404C8.68265 10.0945 9.31673 10.0945 9.70717 9.70404C10.0976 9.3136 10.0976 8.67952 9.70717 8.28908L6.41496 5L9.70405 1.70779Z" fill="#FFFEFE" />
        </svg>
      </Button>
    </div>
  );

  return (
    <>
      <Navbar role={UserTypes.admin} />
      <div className="w-full h-full mt-16 px-5 py-3 flex flex-col items-start gap-3 flex-1 self-stretch">
        <p className="text-xs">Subscriptions</p>
        <SearchBar placeholder="Ketikkan username" onChange={(term) => setSearch(term)}></SearchBar>
        <div className="flex flex-col items-start justify-between flex-1 self-stretch bg-white px-5 py-8 rounded-lg">
          <ActionTable data={tableData} headers={headers} renderActions={renderActions} />
          <PaginationController currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)}></PaginationController>
        </div>
      </div>
    </>
  );
}
