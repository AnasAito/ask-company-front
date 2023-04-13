import Image from 'next/future/image'
import { useEffect, useState } from 'react'
import { get } from 'lodash'
import empty from '@/images/logos/empty.png'
import Modal from './Modal'

const enrich = (page_url) => {
  return fetch(
    `https://asklandingpage-1-g1623631.deta.app/enrich/?page_url=${page_url}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((data) => data.json())
}

const TextTitle = () => (
  <div className=" super text-super selection:bg-super mb-3  flex items-center space-x-[11px] font-sans text-base selection:bg-opacity-70 selection:text-white dark:selection:bg-opacity-50">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fass"
      data-icon="arrow-down-right"
      className=" w-4  text-yellow-500 "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="currentColor"
        d="M302 416h32V384 160 128H270v32V306.7L68.6 105.4 46 82.7 .7 128l22.6 22.6L224.7 352H78 46v64H78 302z"
      ></path>
    </svg>
    <div className="super text-super selection:bg-super font-mono text-xs font-bold uppercase leading-none tracking-widest selection:bg-opacity-70 selection:text-white dark:selection:bg-opacity-50">
      Result
    </div>
  </div>
)
const ResTitle = ({ count }) => (
  <div className=" super text-super selection:bg-super mb-3  flex items-center space-x-[11px] font-sans text-base selection:bg-opacity-70 selection:text-white dark:selection:bg-opacity-50">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fass"
      data-icon="brackets-square"
      className=" w-4  text-yellow-500 "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M416 32h32V64 448v32H416 320 288V416h32 64V96H320 288V32h32 96zM32 32h96 32V96H128 64V416h64 32v64H128 32 0V448 64 32H32z"
      ></path>
    </svg>
    <div className="super text-super selection:bg-super font-mono text-xs font-bold uppercase leading-none tracking-widest selection:bg-opacity-70 selection:text-white dark:selection:bg-opacity-50">
      {count} Sources
    </div>
  </div>
)

const fomrat_link = (homepageUrl, link) => {
  if (link.includes('http')) {
    return link
  }
  console.log(`${homepageUrl}${link}`)
  return `${homepageUrl}${link}`
}
function containsObject(obj, list) {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true
    }
  }

  return false
}
export function NodeCard({
  nodeContent,
  key,
  homepageUrl,
  setSnippets,
  snippets,
}) {
  const [page_url, setPageUrl] = useState(null)
  const [pageMeta, setPageMeta] = useState(null)

  useEffect(() => {
    if (page_url) {
      let mounted = true

      enrich(fomrat_link(homepageUrl, page_url))
        .then((items) => {
          if (mounted) {
            // setPageMeta(items)
            const res = items
            if (res['enriched']) {
              let obj = {
                href: fomrat_link(homepageUrl, page_url),
                title: res['title'],
                description: res['description'],
              }
              if (containsObject(obj, snippets)) {
              } else {
                setSnippets((oldArray) => [
                  {
                    href: fomrat_link(homepageUrl, page_url),
                    title: res['title'],
                    description: res['description'],
                  },
                  ...oldArray,
                ])
              }

              // setSnippets()
            }
            // else {
            //   setPageMeta({
            //     href: fomrat_link(homepageUrl, page_url),
            //     title: null,
            //     description: null,
            //   })
            // }
            console.log(pageMeta)
          }
        })
        .catch((error) => {
          alert(error.message)
        })
      return () => (mounted = false)
    }
  }, [page_url])
  return (
    <>
      {/* <Modal pageMeta={pageMeta} setPageMeta={setPageMeta} /> */}
      <div
        key={key}
        // href={''}
        target="_blank"
        rel="noreferrer"
        // className=" transform   transition duration-500 ease-in-out hover:scale-105"
      >
        <figure className="relative rounded-2xl  bg-white p-6 text-slate-900 shadow-xl shadow-slate-900/10 dark:bg-slate-900 dark:text-white">
          {/* <QuoteIcon className="absolute top-6 left-6 fill-slate-100 dark:fill-slate-800" /> */}

          <figcaption className="relative  flex items-center justify-between  border-slate-100 pt-6 dark:border-slate-800">
            <div className=" text-lg tracking-tight ">
              <ResTitle count={nodeContent['links'].length} />
              {nodeContent['links'].map((link) => (
                <a
                  key={link['href']}
                  // href={link['href']}
                  // target="_blank"
                  onClick={() => setPageUrl(link['href'])}
                  className="transform cursor-pointer ease-in-out hover:scale-110"
                  // className="m-1 inline-flex  transform cursor-pointer items-center  rounded-full bg-yellow-700 px-4 py-0.5  text-xl font-bold text-white duration-100  ease-in-out hover:scale-105 "
                >
                  <span className=" m-1 inline-flex items-center rounded-md bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800 dark:bg-yellow-700 dark:text-white">
                    <svg
                      className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400 dark:text-yellow-100"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    {link['text_payload'].length > 0
                      ? link['text_payload'].sort(function (a, b) {
                          return (
                            a.length - b.length || // sort by length, if equal then
                            a.localeCompare(b)
                          ) // sort by dictionary order
                        })[0]
                      : link['href']}
                  </span>
                </a>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  )
}
