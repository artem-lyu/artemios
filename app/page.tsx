// import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
// import dynamic from "next/dynamic";
// import { useState, useEffect } from "react";

// const Chat = dynamic(() => import("@/components/Chat"), {
//   ssr: false,
// });

// export default async function Page() {
//   const accessToken = await getHumeAccessToken();

//   if (!accessToken) {
//     throw new Error();
//   }


//   return (
//     <div className={"grow flex flex-col"}>
//       <Chat accessToken={accessToken} />
//     </div>
//   );
// }


// app/page.tsx
"use client"
import { useEffect, useState } from 'react';

type Result = {
  result?: any;
  error?: string;
};

export default function Home() {
  const [data, setData] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/create-table')
      .then((response) => response.json())
      .then((data: Result) => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      });
  }, []);

  return (
    <div>
      <h1>PostgreSQL Table Creation</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
