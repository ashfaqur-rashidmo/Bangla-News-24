// import Link from 'next/link';
// import React from 'react';

// interface MostReadNews {
//     id: string;
//     title: string;

// }

// const MostRead = async() => {
//     const res = await fetch ("https://news-api-v2.vercel.app/api/news/most-read");
//     const data = await res.json();
//     const mostRead: MostReadNews[] = data.data;
//     console.log("Most Read News: ",mostRead);

//     return (
//         <div className='card p-2 bg-base-100 border border-gray-300'>
//             <h1 className='font-bold text-red-700 mb-3'>সর্বাধিক পঠিত</h1>

//             <div className='grid gap-3'>
//                 {
//                     mostRead.map((mr,i) => <Link href={`/news/${mr.id}`} className='flex gap-2 items-center hover:underline' key={mr.id}>
//                         <p className="font-bold text-red-600 text-2xl">{i + 1}</p>
//                         <h2>{mr.title}</h2>
//                     </Link>
//                     )}
//             </div>
//         </div>
//     );
// };

// export default MostRead;



import Link from "next/link";
import React from "react";

interface MostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  const data = await res.json();

  const mostRead: MostReadNews[] = data.data;

  return (
    <div className="card border border-gray-300 bg-base-100 p-3 shadow-sm">
      <h1 className="mb-4 border-b border-gray-200 pb-3 font-bold text-red-700">
        সর্বাধিক পঠিত
      </h1>

      <div className="grid gap-4">
        {mostRead.map((mr, i) => (
          <Link
            href={`/news/${mr.id}`}
            className="group flex items-start gap-3"
            key={mr.id}
          >
            <p className="min-w-7 text-2xl font-bold text-red-600">
              {i + 1}
            </p>

            <h2 className="text-sm leading-6 transition-colors group-hover:text-red-700">
              {mr.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;