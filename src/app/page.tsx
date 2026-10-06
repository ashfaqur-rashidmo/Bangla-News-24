// import MainNews from "@/components/MainNews";
// import Marquee from "@/components/Marquee";
// import MostRead from "@/components/MostRead";
// import NewsCard from "@/components/NewsCard";
// import Image from "next/image";

// interface otherSectionType {
//   curationId: string;
//   title: string;
//   articles: {
//     id: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     category: string;
//     imageAlt: string;
//   }[];
// }

// export default async function Home() {
//   const res = await fetch("https://news-api-v2.vercel.app/api/news/sections")
//   const data = await res.json();
//   const sections = data.data;
//   const mainNews = sections[0].articles;
//   // console.log("Section Newses: ",sections);
//   // console.log("Main News: ",mainNews);

//   const otherSections: otherSectionType[] = sections.slice(1);
//     console.log("others News: ",otherSections);
  
//   return (
//     <div >
      

//       <div className="grid gap-5 grid-cols-3 mt-5">
//       {/* News Section */}
      
//       <div className="col-span-2">
//         <MainNews news={mainNews}/>

//        <div className="grid gap-5 mt-5">
//          {
//           otherSections.map(os => <div className="" key={os.curationId}
//           >
//             <h1 className="font-bold border-b-2 border-red-700 pb-2">{os.title}</h1>

//             <div className="grid mt-3 grid-cols-3 gap-5">
//               {
//               os.articles.map(news => (<NewsCard key={news.id} news={news}/>))
//             }
//             </div>
//           </div>
//         )}
//        </div>
//       </div>
      
//       {/* Most Read Section */}
//       <div className="">
//       <MostRead />
//       </div>

//       </div>
//     </div>
//   );
// }



import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface OtherSectionType {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();

  const sections = data.data;

  const mainNews = sections[0].articles;

  const otherSections: OtherSectionType[] = sections.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* News Section */}
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="mt-8 grid gap-8">
            {otherSections.map((os) => (
              <section key={os.curationId}>
                <h1 className="border-b-2 border-red-700 pb-2 text-xl font-bold">
                  {os.title}
                </h1>

                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Most Read */}
        <aside className="lg:col-span-1">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}