

import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data.success || !data.data) {
    notFound();
  }

  const newsDetails = data.data;

  return (
    <article className="mx-auto max-w-4xl px-4">
      <h1 className="text-2xl font-bold leading-9 md:text-4xl md:leading-[1.3]">
        {newsDetails.title}
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        {newsDetails.firstPublished}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl">
        <Image
          src={newsDetails.imageUrl}
          alt={newsDetails.imageAlt || newsDetails.title}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-6 text-base leading-8 text-neutral-800 md:text-lg">
        <p>{newsDetails.text}</p>
      </div>
    </article>
  );
};

export default NewsDetailsPage;
