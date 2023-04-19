import React, { useState } from 'react'
import Head from 'next/head'
import { Footer } from '@/components/Footer'
import { Playground } from '@/components/Playground'
import { Header } from '@/components/Header'

export default function Home() {
  // const client = createApolloClient(
  //   'LaddHnRyCgECD2Y3hd2zVpTxlZPuvBic0S2ucvnd1YQX0ynOLHyyjpxAT13HhGvN'
  // )
  const [openPanel, setOpenPanel] = useState(false)
  const [strategy, setStrategy] = useState([])
  return (
    <div className="flex min-h-screen flex-col  justify-between bg-slate-50 dark:bg-slate-800 ">
      <Head>
        <title>M&A enricher</title>
        <meta
          name="description"
          content="find relevant keywords for your next M&A operation  "
        />
      </Head>
      <Header
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        strategy={strategy}
      />
      <main>
        <Playground
          openPanel={openPanel}
          setOpenPanel={setOpenPanel}
          setStrategy={setStrategy}
        />
      </main>
      <Footer />
    </div>
  )
}
