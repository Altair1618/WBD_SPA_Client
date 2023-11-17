import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import PaginationController from "@/components/ui/pagination";
import SearchBar from "@/components/ui/searchBar";
import ActionTable from "@/components/ui/table";
import { UserTypes } from "@/lib/userTypes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Course() {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const sendEmail = (email: string, name: string) => {
    fetch(`${import.meta.env.VITE_REST_SERVICE}/certificate/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ email, name }),
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
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
        const url = new URL(`${import.meta.env.VITE_REST_SERVICE}/courses/${localStorage.getItem("courseId")}/students`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("search", search);
        const response = await fetch(url.href, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        // console.log(result);

        if (result.status === "success") {
          setTotalPages(result.data.students.max_page);
          setTableData(result.data.students.students);
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchData();
  }, [page, search]);

  const headers = { username: "Username", email: "Email" };
  const renderActions = (rowData: Record<string, any>) => (
    <div className="flex px-3 py-1 items-center gap-3">
      <Button
        className="flex w-8 h-8 p-1 justify-center items-center flex-shrink-0 bg-green-500 rounded-xl"
        onClick={() => {
          sendEmail(rowData.email, rowData.nama);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M9.875 0.5C9.35645 0.5 8.9375 0.918945 8.9375 1.4375C8.9375 1.95605 9.35645 2.375 9.875 2.375H12.2979L6.40039 8.27539C6.03418 8.6416 6.03418 9.23633 6.40039 9.60254C6.7666 9.96875 7.36133 9.96875 7.72754 9.60254L13.625 3.70215V6.125C13.625 6.64355 14.0439 7.0625 14.5625 7.0625C15.0811 7.0625 15.5 6.64355 15.5 6.125V1.4375C15.5 0.918945 15.0811 0.5 14.5625 0.5H9.875ZM2.84375 1.4375C1.54883 1.4375 0.5 2.48633 0.5 3.78125V13.1562C0.5 14.4512 1.54883 15.5 2.84375 15.5H12.2188C13.5137 15.5 14.5625 14.4512 14.5625 13.1562V9.875C14.5625 9.35645 14.1436 8.9375 13.625 8.9375C13.1064 8.9375 12.6875 9.35645 12.6875 9.875V13.1562C12.6875 13.4141 12.4766 13.625 12.2188 13.625H2.84375C2.58594 13.625 2.375 13.4141 2.375 13.1562V3.78125C2.375 3.52344 2.58594 3.3125 2.84375 3.3125H6.125C6.64355 3.3125 7.0625 2.89355 7.0625 2.375C7.0625 1.85645 6.64355 1.4375 6.125 1.4375H2.84375Z" fill="white" />
        </svg>
      </Button>
    </div>
  );

  return (
    <>
      <Navbar role={UserTypes.pengajar} />
      <div className="w-full h-full mt-16 px-5 py-3 flex flex-col items-start gap-3 flex-1 self-stretch">
        <p className="text-xs">Enrolled</p>
        <SearchBar placeholder="Ketikkan username" onChange={(term) => setSearch(term)}></SearchBar>
        <div className="flex flex-col items-start justify-between flex-1 self-stretch bg-white px-5 py-8 rounded-lg">
          <ActionTable data={tableData} headers={headers} renderActions={renderActions} />
          <PaginationController currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)}></PaginationController>
        </div>
      </div>
    </>
  );
}
