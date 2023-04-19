import React, { useState } from 'react'
import { View } from './view.js'
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
const prepare_cards = (articles) => {
  let cards = [{ id: 'addon' }]
  for (let article_idx in articles) {
    cards.push(articles[article_idx])
  }

  const new_cards = []
  console.log(cards.length)
  while (cards.length) new_cards.push(cards.splice(0, 3))
  //   console.log('test ', cards, new_cards)

  try {
    return new_cards[0].map((_, colIndex) =>
      new_cards.map((row) => row[colIndex])
    )
  } catch (e) {
    console.log(e)
    return []
  }
}

export function Playground({ openPanel, setOpenPanel }) {
  const [snippets, setSnippets] = useState([
    {
      id: 'test',

      description:
        'Forward integration through distribution of cleaning machines and all associated cleaning supplies and consumables',
      keywords: [],
    },
    {
      id: 'test_b',

      description:
        'Services that help customers effectively manage their waste and keep their facilities clean e.g., hazardous waste management',
      keywords: [],
    },
  ])

  // console.log('cards to render', prepare_cards(snippets))
  return (
    <View
      snippets_to_render={prepare_cards(snippets)}
      setSnippets={setSnippets}
      snippets={snippets}
      openPanel={openPanel}
      setOpenPanel={setOpenPanel}
    />
  )
}
