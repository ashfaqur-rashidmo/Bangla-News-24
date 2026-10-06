import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface News {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    imageAlt: string;
}

const NewsCard = ({news}: {news: News}) => {
  console.log("News Card: ",news);

    return (
        <Link href={`/news/${news.id}`} className="card bg-base-100 shadow-sm">
          <figure>
            <Image
              src={news.imageUrl}
              height={600}
              width={600}
              className="rounded-xl"
              alt={news.imageAlt} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{news.title}</h2>
            <p>{news.description}</p>
            
          </div>
        </Link>
    );
};

export default NewsCard;