import Image from 'next/future/image'
import Queries from '../api/queries/index'
import { get } from 'lodash'
import empty from '@/images/logos/empty.png'
import { useState, useEffect } from 'react'
const logo_mapper = Queries['logo.get.many']
function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

const render_occurence = (content, skill) => {
  const splitted_content = content.toLowerCase().split(skill)

  return (
    <>
      {splitted_content[0]}{' '}
      <span className="text-xl font-bold underline decoration-yellow-400 ">
        {skill}
      </span>
      {splitted_content.slice(1).join(' ')}
    </>
  )
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export function ArticleCard({ article, key }) {
  const defaultCompany = {
    logo: empty,
    name: '',
  }
  const [show, setShow] = useState(false)
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await delay(4000)
      setKeywords([
        { label: article.title.split('|')[0], id: article.title.split('|')[0] },
      ])
    }
    // setKeywords([{ label: 'machines', id: 'test' }])
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [show])

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
            <p className="mb-6 text-xl font-semibold ">
              {article.title.split('|')[0]}
            </p>
            <p className="text-lg tracking-tight ">
              ... {render_occurence(article.description, null)} ...
            </p>
          </blockquote>
          {show && (
            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                {keywords.length == 0 ? (
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
                    {keywords.map((keyword) => {
                      // if (item.label.length >= 3) {
                      return (
                        <span
                          key={keyword.id}
                          // onClick={() => setNodeId(item.id)}
                          className={`  m-1 inline-flex transform  cursor-pointer items-center rounded-full bg-white  px-4 py-0.5  font-bold 
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
