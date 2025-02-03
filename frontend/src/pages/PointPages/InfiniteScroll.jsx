import React, { useState, useEffect, useRef } from "react";

const InfiniteScrollWithObserver = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const fetchMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 20 })]);
      setIsLoading(false);
    }, 1000); // 데이터를 가져오는 시뮬레이션
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Infinite Scroll with Intersection Observer</h1>
      <ul>
        {items.map((_, index) => (
          <li key={index}>Item {index + 1}</li>
        ))}
      </ul>
      <div ref={loader} style={{ height: "50px", background: "lightgray" }}>
        {isLoading && <p>Loading more items...</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollWithObserver;
