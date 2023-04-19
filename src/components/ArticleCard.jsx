import Image from 'next/future/image'
import Queries from '../api/queries/index'
import { get } from 'lodash'
import empty from '@/images/logos/empty.png'
import { useState, useEffect } from 'react'
const logo_mapper = Queries['logo.get.many']
// const { Configuration, OpenAIApi } = require('openai')
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)
// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds))
// }

const enrich_simple_text = (text) => {
  return fetch(
    `https://mademoapi-1-p0601624.deta.app/enrich_simple?text=${text}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((data) => data.json())
}
const enrich_complex_text = (text) => {
  return fetch(
    `https://mademoapi-1-p0601624.deta.app/enrich_custom?text=${text}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((data) => data.json())
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export function ArticleCard({
  article,
  key,
  setSnippets,
  snippets,
  description,
}) {
  const defaultCompany = {
    logo: empty,
    name: '',
  }
  const [show, setShow] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const dedup = (keywords) => {
    const uniqueKeywords = Array.from(new Set(keywords.map((a) => a.id))).map(
      (id) => {
        return keywords.find((a) => a.id === id)
      }
    )
    return uniqueKeywords
  }
  useEffect(() => {
    if (show) {
      let mounted = true

      if (description) {
        enrich_complex_text(article.description).then((items) => {
          if (mounted) {
            let keywords = items.payload.map((keyword) => {
              return {
                label: keyword.trim(),
                id: keyword.trim(),
                type: 'custom',
              }
            })

            let newState = snippets.map((obj) => {
              if (obj.id === article.id) {
                let new_keywords = []
                if (obj.keywords) {
                  new_keywords = obj.keywords.concat(keywords)
                } else {
                  new_keywords = keywords
                }

                return { ...obj, keywords: dedup(new_keywords) }
              }

              return obj
            })

            setSnippets(newState, () => {
              console.log('dealersOverallTotal1')
            })
            setRefresh(false)

            // console.log('keywords', items.payload, snippets)
          }
        })
      } else {
        enrich_simple_text(article.description).then((items) => {
          if (mounted) {
            let keywords = items.payload.map((keyword) => {
              return { label: keyword.trim(), id: keyword.trim() }
            })

            let newState = snippets.map((obj) => {
              if (obj.id === article.id) {
                return { ...obj, keywords: keywords }
              }

              return obj
            })

            setSnippets(newState, () => {
              console.log('dealersOverallTotal1')
            })
            setRefresh(false)

            // console.log('keywords', items.payload, snippets)
          }
        })
      }
      return () => (mounted = false)
    }
  }, [show, article.id])

  useEffect(() => {
    if (description) {
      setRefresh(true)
      setShow(false)
    }
  }, [description])

  return (
    <>
      <div
        key={key}
        onClick={() => setShow(true)}
        className="transform cursor-pointer  text-left transition duration-500 ease-in-out hover:scale-105"
      >
        <figure className="relative rounded-2xl  bg-white p-6 text-slate-900 shadow-xl shadow-slate-900/10 dark:bg-slate-900 dark:text-white">
          {/* <QuoteIcon className="absolute top-6 left-6 fill-slate-100 dark:fill-slate-800" /> */}
          <blockquote className="relative">
            {refresh && (
              <p className=" text-xl-200 mb-6 flex  items-end justify-end  font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-yellow-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </p>
            )}
            <p className="text-lg tracking-tight ">
              {/* {render_occurence(article?.description, null)} */}
              {article?.description}
            </p>
          </blockquote>
          {(show || article.keywords.length != 0) && (
            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                {article.keywords.length == 0 ? (
                  <ul role="list" className="  ">
                    {[...Array(4).keys()].map((item) => (
                      <span
                        key={item}
                        // onClick={() => setNodeId(item.id)}
                        className={` inline-flex transform animate-pulse   cursor-pointer items-center gap-1 rounded-full bg-white px-4  py-0.5  text-xl  font-bold text-slate-900  duration-100 ease-in-out  hover:scale-105  dark:bg-slate-900 dark:text-white `}
                      >
                        <div className="   h-5  w-32 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                      </span>
                    ))}
                  </ul>
                ) : (
                  <ul role="list" className="  ">
                    {article.keywords.map((keyword) => {
                      // if (item.label.length >= 3) {
                      return (
                        <span
                          key={keyword.id}
                          // onClick={() => setNodeId(item.id)}
                          className={`  m-1 inline-flex transform  cursor-pointer items-center rounded-full ${
                            keyword.type ? 'bg-slate-400' : 'bg-white'
                          }  px-4 py-0.5  font-bold 
                            text-yellow-700 duration-100 ease-in-out hover:scale-105 `}
                        >
                          {keyword.label}
                        </span>
                      )
                      // }
                    })}
                  </ul>
                )}
              </div>
            </figcaption>
          )}
        </figure>
      </div>
    </>
  )
}
