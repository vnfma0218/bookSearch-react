import { useEffect, useState } from 'react';
import axios from 'axios';
export default function useBookSearch(query, pageNumber, favoriteList) {
  const [loading, setLoading] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBookList([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    if (!query) return;
    setLoading(true);
    axios({
      method: 'GET',
      url: `https://dapi.kakao.com/v3/search/book`,
      params: {
        query: query,
        page: pageNumber,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KEY}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // setBookList(res.data.documents);
        //   setBookList((prev) =>
        //   prev.map((b) => {
        //     if (favoriteList.some((isbn) => isbn === b.isbn)) {
        //       return { ...b, marked: true };
        //     } else {
        //       return { ...b, marked: false };
        //     }
        //   })
        // );
        setBookList((prevBooks) => {
          const bookList = [...new Set([...prevBooks, ...res.data.documents])];
          return bookList.map((b) => {
            if (favoriteList.some((isbn) => isbn === b.isbn)) {
              return { ...b, marked: true };
            } else {
              return { ...b, marked: false };
            }
          });
        });
        setHasMore(!res.data.meta.is_end);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, favoriteList]);
  return { bookList, setBookList, hasMore, loading, error };
}

// axios
// .get(
//   `https://dapi.kakao.com/v3/search/book`,

//   {
//     params: {
//       query: query,
//       page: pageNumber,
//     },
//     headers: {
//       Authorization: `KakaoAK ${process.env.REACT_APP_KEY}`,
//     },
//   }
// )
