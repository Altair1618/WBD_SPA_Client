import { Navbar } from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/ui/card";
import SearchBar from "@/components/ui/searchBar";
import { UserTypes } from "@/lib/userTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationController from "@/components/ui/pagination";

export function Courses() {
  const navigate = useNavigate();

  const [coursesData, setCoursesData] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(`${import.meta.env.VITE_REST_SERVICE}/courses`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("search", search);
        const response = await fetch(url.href, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        setTotalPages(result.data.total_page);
        setCoursesData(result.data.courses);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchData();
  }, [refreshKey, page, search]);

  return (
    <>
      <Navbar role={UserTypes.pengajar} />
      <div className="w-full h-full mt-16 px-5 py-3 flex flex-col items-start gap-3 flex-1 self-stretch">
        <p className="text-xs">Mata Kuliah Saya</p>
        <div className="w-full flex flex-start gap-3">
          <SearchBar placeholder="Ketikkan username" onChange={(term) => setSearch(term)}></SearchBar>
          <Button className="bg-green-500 rounded-[30px]" onClick={(_) => navigate("/courses/create")}>
            Tambah
          </Button>
        </div>
        <div className="flex p-3 justify-center items-start content-start gap-y-5 self-stretch flex-wrap">
          {coursesData.length < 1
            ? <p className='w-full text-center mt-4'>Tidak ada data mata kuliah</p>
            : coursesData.map((course) => (
              <CourseCard kode={course.kode} name={course.nama} id={course.id} onAction={() => setRefreshKey(refreshKey + 1)}></CourseCard>
            ))}
        </div>
        <PaginationController currentPage={page} totalPages={Math.ceil(coursesData.length / 10)} onPageChange={(p) => setPage(p)}></PaginationController>
      </div>
    </>
  );
}
