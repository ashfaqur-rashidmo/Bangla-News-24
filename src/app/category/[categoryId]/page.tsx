// import NewsCard from '@/components/NewsCard';
// import React from 'react';

// interface CategoryNews {
//     id: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     category: string;
//     imageAlt: string;
// }

// const CategoryNewspage = async ({params}) => {
//     const {categoryId} = await params;
//     // console.log("Category ID: ",categoryId);

//     // https://news-api-v2.vercel.app/api/categories/${categoryid}

//     const res = await fetch (`https://news-api-v2.vercel.app/api/category/${categoryId}`);
//     const data = await res.json();
//     console.log("API News: ",data);

//     const categoryNews: CategoryNews[] = data.data;
//     console.log("Category News: ",categoryNews);

//     return (
//         <div>

//             <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">{data.title}</h1>

//             <div className="grid grid-cols-3 gap-10">
//                 {
//                     categoryNews.map(news => <NewsCard key={news.id} news={news}/>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default CategoryNewspage;



import NotFound from "@/app/not-found";
import NewsCard from "@/components/NewsCard";
import React from "react";

interface CategoryNews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

const CategoryNewsPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  const data = await res.json();

  const categoryNews: CategoryNews[] = data.data;

  if (!categoryNews) {
    NotFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="mb-5 border-b-2 border-red-700 pb-2 text-2xl font-bold">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNewsPage;