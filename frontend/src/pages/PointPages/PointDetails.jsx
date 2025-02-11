import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useTable } from "react-table";
import { mokiApi } from "../../services/loginApi";
import { useParams } from "react-router-dom";

const PointDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { store_id, phone_num } = useParams();
  const size = 10;
  const observerRef = useRef(null);

  // ✅ `fetchData`를 useCallback으로 최적화
  const fetchData = useCallback(
    async (currentPage) => {
      if (currentPage > totalPages) {
        setHasMore(false);
        return;
      }

      try {
        const response = await mokiApi.get(
          `/api/point/details?store_id=${store_id}&phone_num=${phone_num}&page=${currentPage}&size=${size}`
        );

        if (response.data && Array.isArray(response.data.data)) {
          // ✅ 페이지 정보 업데이트
          const { page: pageInfo, data: newData } = response.data;
          if (newData.length === 0) {
            setHasMore(false);
          } else {
            setData((prev) => [...prev, ...newData]); // ✅ 기존 데이터에 추가
            setTotalPages(pageInfo.totalPages); // ✅ 전체 페이지 업데이트
            setPage(pageInfo.pageNo + 1); // ✅ 다음 페이지 번호 설정
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
        setHasMore(false);
      }
    },
    [store_id, phone_num, totalPages]
  );

  // ✅ Intersection Observer 설정 (무한 스크롤)
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(page);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, hasMore]);

  // ✅ 테이블 컬럼 설정
  const columns = useMemo(
    () => [
      {
        Header: "적립내용",
        accessor: "details",
        Cell: ({ value }) => (
          <span style={{ fontWeight: "bold" }}>{value}</span>
        ),
      },
      {
        Header: "포인트",
        accessor: "points",
        Cell: ({ row }) => {
          const { details, points } = row.original;
          const style =
            details === "적립"
              ? { color: "red" }
              : details === "차감"
              ? { color: "blue" }
              : { color: "black", textDecoration: "line-through" };
          const pointValue = details === "적립" ? `+${points}` : `${points}`;

          return <span style={style}>{pointValue}P</span>;
        },
      },
      {
        Header: "날짜",
        accessor: "date",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="point_details">
      <table {...getTableProps()} className="point_details_table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ 무한 스크롤 감지하는 요소 */}
      {hasMore && (
        <div
          ref={observerRef}
          style={{
            height: "50px",
            textAlign: "center",
          }}
        ></div>
      )}
    </div>
  );
};

export default PointDetails;
