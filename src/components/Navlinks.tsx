// import Link from 'next/link';
// import React from 'react';

// interface navs{
//     slug: string;
//     title: string;
//     topicId: string | null;
//     url: string;
//     scrapable: boolean;
// }

// const Navlinks = async () => {
//     const res = await fetch("https://news-api-v2.vercel.app/api/categories");
//     const categories = await res.json();
//     const nav: navs[] = categories.data
//     console.log(nav);

//     const filteredNav = nav.filter(category => category.scrapable)

//     return (
//         <div className='flex gap-5 justify-center mt-5'>
//             <Link href="/">হোম</Link>
//             {
//                 filteredNav.map((categories,i) => <Link key={i} 
//                 href={`/category/${categories.slug}`}>
//                     {categories.title}
//                     </Link>)
//             }
//         </div>
//     );
// };

// export default Navlinks;



import Link from "next/link";
import React from "react";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  const categories = await res.json();

  const nav: Navs[] = categories.data;

  const filteredNav = nav.filter((category) => category.scrapable);

  return (
    <nav className="mt-5 w-full border-y border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-3 text-sm font-medium whitespace-nowrap md:justify-center md:overflow-visible">
        <Link
          href="/"
          className="shrink-0 transition-colors hover:text-[#b30000]"
        >
          হোম
        </Link>

        {filteredNav.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="shrink-0 transition-colors hover:text-[#b30000]"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;