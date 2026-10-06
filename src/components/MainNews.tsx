// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// interface News {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   category: string;
//   imageAlt: string;
// }

// const MainNews = ({ news }: { news: News[] }) => {
//   console.log("Main News: ", news);

//   const firstNews = news[0];
//   const othersNews = news.slice(1);

//   if (!firstNews) {
//     return null;
//   }

//   return (
//     <div className="flex gap-2">
//       {/* First News */}
//       <Link
//         href={`/news/${firstNews.id}`}
//         className="card bg-base-100 shadow-sm"
//       >
//         <figure>
//           <Image
//             src={firstNews.imageUrl}
//             height={600}
//             width={600}
//             className="rounded-xl"
//             alt={firstNews.imageAlt}
//           />
//         </figure>

//         <div className="card-body">
//           <h2 className="card-title">{firstNews.title}</h2>
//           <p>{firstNews.description}</p>
//         </div>
//       </Link>

//       {/* Other News */}
//       <div className="grid gap-5">
//         {othersNews.slice(0, 4).map((on) => (
//           <div
//             className="card bg-base-100 border border-gray-300 p-5"
//             key={on.id}
//           >
//             <Link href={`/news/${on.id}`}>
//               <p className="text-red-600 font-semibold">{on.category}</p>

//               <h2>{on.title}</h2>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainNews;


import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  const firstNews = news[0];
  const othersNews = news.slice(1);

  if (!firstNews) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-2">
      {/* First News */}
      <Link
        href={`/news/${firstNews.id}`}
        className="group card bg-base-100 shadow-sm md:flex-1"
      >
        <figure className="overflow-hidden">
          <Image
            src={firstNews.imageUrl}
            height={600}
            width={600}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-80"
            alt={firstNews.imageAlt}
          />
        </figure>

        <div className="card-body p-4 md:p-5">
          <p className="text-sm font-semibold text-red-600">
            {firstNews.category}
          </p>

          <h2 className="card-title text-xl leading-8 group-hover:text-red-700 md:text-2xl">
            {firstNews.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
            {firstNews.description}
          </p>
        </div>
      </Link>

      {/* Other News */}
      <div className="grid gap-3 md:w-[42%] md:gap-5">
        {othersNews.slice(0, 4).map((on) => (
          <Link
            href={`/news/${on.id}`}
            className="group rounded-lg border border-gray-300 bg-base-100 p-4 transition-all hover:border-red-300 hover:shadow-sm md:p-5"
            key={on.id}
          >
            <p className="mb-1 text-sm font-semibold text-red-600">
              {on.category}
            </p>

            <h2 className="font-semibold leading-7 group-hover:text-red-700">
              {on.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;