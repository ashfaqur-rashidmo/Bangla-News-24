// import React from 'react';
// import MarqueeText from "react-marquee-text"
// import "react-marquee-text/dist/styles.css"
// import Link from 'next/link';

// const Marquee = async() => {
//     const res = await fetch ("https://news-api-v2.vercel.app/api/news?limit=10");
//     const categories = await res.json();
//     const headlines = categories.data
   
//     console.log(categories);

//     interface headlines {
//         id: string;
//         title: string;
    
//     }


//     return (
//         <div className='bg-red-700 text-white'>

//            <div className="flex max-w-7xl mx-auto">
//              <div className='bg-red-800 py-1 px-5 font-bold'>সর্বশেষ</div>

//             <MarqueeText direction="right" duration={15}  className='bg-red-700 text-white py-0.5 px-4'>
//             {
//                 headlines.map((headline) => <Link href={`/news/${headline.id}`} key={headline.id} className='hover:underline'>
//                 <span>{headline.title}  </span>
//                <span className='mx-5'>•</span>
//                </Link>
//             )
                
//             }
//             </MarqueeText>
//            </div>
//         </div>
//     );
// };

// export default Marquee;



import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

interface Headline {
  id: string;
  title: string;
}

const Marquee = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10"
  );

  const data = await res.json();

  const headlines: Headline[] = data.data;

  return (
    <div className="w-full bg-red-700 text-white">
      <div className="mx-auto flex max-w-7xl items-stretch overflow-hidden">
        <div className="shrink-0 bg-red-800 px-4 py-2 text-sm font-bold sm:px-5">
          সর্বশেষ
        </div>

        <MarqueeText
          direction="right"
          duration={15}
          className="min-w-0 bg-red-700 px-3 py-1.5 text-sm sm:px-4"
        >
          {headlines.map((headline) => (
            <Link
              href={`/news/${headline.id}`}
              key={headline.id}
              className="hover:underline"
            >
              <span>{headline.title}</span>
              <span className="mx-5">•</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;