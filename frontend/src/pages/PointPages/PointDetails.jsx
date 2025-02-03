import React, { useMemo } from "react";
import { useTable } from "react-table";

const PointDetails = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        details: "사용",
        points: 100,
        date: "2025-01-15",
      },
      {
        id: 2,
        details: "사용 취소",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 3,
        details: "사용",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 4,
        details: "적립",
        points: 321,
        date: "2025-01-08",
      },
      {
        id: 5,
        details: "적립 취소",
        points: 123,
        date: "2025-01-06",
      },
      {
        id: 6,
        details: "적립",
        points: 123,
        date: "2025-01-06",
      },
      {
        id: 7,
        details: "사용",
        points: 100,
        date: "2025-01-15",
      },
      {
        id: 8,
        details: "사용 취소",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 9,
        details: "사용",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 10,
        details: "적립",
        points: 321,
        date: "2025-01-08",
      },
      {
        id: 11,
        details: "적립 취소",
        points: 123,
        date: "2025-01-06",
      },
      {
        id: 12,
        details: "적립",
        points: 123,
        date: "2025-01-06",
      },
      {
        id: 13,
        details: "사용",
        points: 100,
        date: "2025-01-15",
      },
      {
        id: 14,
        details: "사용 취소",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 15,
        details: "사용",
        points: 222,
        date: "2025-01-13",
      },
      {
        id: 16,
        details: "적립",
        points: 321,
        date: "2025-01-08",
      },
      {
        id: 17,
        details: "적립 취소",
        points: 123,
        date: "2025-01-06",
      },
      {
        id: 18,
        details: "적립",
        points: 123,
        date: "2025-01-06",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "적립내용",
        accessor: "details",
      },
      {
        Header: "포인트",
        accessor: "points",
        Cell: ({ row }) => {
          const { details, points } = row.original;
          const style =
            details === "적립"
              ? { color: "red" }
              : details === "사용"
              ? { color: "blue" }
              : { color: "black", textDecoration: "line-through" };
          const pointValue =
            details === "적립" || details === "적립 취소"
              ? `+${points}`
              : `-${points}`;

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
    </div>
  );
};

export default PointDetails;

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { useTable } from "react-table";

// const PointDetails = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const loader = useRef(null);

//     const fetchPageData = (page) => {
//         // 가상 데이터 생성 또는 API 호출
//         const pageSize = 5;
//         const newItems = Array.from({ length: pageSize }).map((_, index) => ({
//             id: (page - 1) * pageSize + index + 1,
//             details: ["사용", "사용 취소", "적립", "적립 취소"][Math.floor(Math.random() * 4)],
//             points: Math.floor(Math.random() * 500) + 100,
//             date: `2025-01-${Math.floor(Math.random() * 31) + 1}`,
//         }));

//         return new Promise((resolve) => {
//             setTimeout(() => resolve(newItems), 1000); // 딜레이 시뮬레이션
//         });
//     };

//     const loadMoreData = async () => {
//         if (!hasMore) return;
//         const newData = await fetchPageData(page);

//         if (newData.length === 0) {
//             setHasMore(false);
//         } else {
//             setData((prev) => [...prev, ...newData]);
//             setPage((prev) => prev + 1);
//         }
//     };

//     useEffect(() => {
//         loadMoreData();
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && hasMore) {
//                     loadMoreData();
//                 }
//             },
//             { threshold: 1.0 }
//         );

//         if (loader.current) {
//             observer.observe(loader.current);
//         }

//         return () => {
//             if (loader.current) {
//                 observer.unobserve(loader.current);
//             }
//         };
//     }, [loader, hasMore]);

//     const columns = useMemo(
//         () => [
//             {
//                 Header: "적립내용",
//                 accessor: "details",
//             },
//             {
//                 Header: "포인트",
//                 accessor: "points",
//                 Cell: ({ row }) => {
//                     const { details, points } = row.original;
//                     const style =
//                         details === "적립"
//                             ? { color: "red" }
//                             : details === "사용"
//                             ? { color: "blue" }
//                             : { color: "black", textDecoration: "line-through" };
//                     const pointValue =
//                         details === "적립" || details === "적립 취소"
//                             ? `+${points}`
//                             : `-${points}`;

//                     return <span style={style}>{pointValue}P</span>;
//                 },
//             },
//             {
//                 Header: "날짜",
//                 accessor: "date",
//             },
//         ],
//         []
//     );

//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//         useTable({ columns, data });

//     return (
//         <div className="point_details">
//             <table {...getTableProps()} className="point_details_table">
//                 <thead>
//                     {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {rows.map((row) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()}>
//                                 {row.cells.map((cell) => (
//                                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                                 ))}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             {hasMore && (
//                 <div ref={loader} style={{ height: "50px", background: "lightgray", textAlign: "center" }}>
//                     Loading more...
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PointDetails;
