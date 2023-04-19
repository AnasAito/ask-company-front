import React, { useState } from 'react'
import Head from 'next/head'
import { Footer } from '@/components/Footer'
import { Playground } from '@/components/Playground'
import { Header } from '@/components/Header'

// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache,
//   HttpLink,
// } from '@apollo/client'

// const createApolloClient = (authToken) => {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: 'https://tops-dane-86.hasura.app/v1/graphql',
//       headers: {
//         'x-hasura-admin-secret': authToken,
//       },
//     }),
//     cache: new InMemoryCache(),
//   })
// }

export default function Home() {
  // const client = createApolloClient(
  //   'LaddHnRyCgECD2Y3hd2zVpTxlZPuvBic0S2ucvnd1YQX0ynOLHyyjpxAT13HhGvN'
  // )
  const [openPanel, setOpenPanel] = useState(false)
  // const [description, setDescription] = useState(null)
  return (
    <div className="flex min-h-screen flex-col  justify-between bg-slate-50 dark:bg-slate-800 ">
      <Head>
        <title>M&A enricher</title>
        <meta
          name="description"
          content="find relevant keywords for your next M&A operation  "
        />
      </Head>
      <Header openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <main>
        <Playground openPanel={openPanel} setOpenPanel={setOpenPanel} />
      </main>
      <Footer />
    </div>
  )
}
