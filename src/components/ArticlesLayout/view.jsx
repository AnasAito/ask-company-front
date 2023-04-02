import React, { useState } from 'react'
import { ArticleCardSkeleton } from '../ArticleCardSkeleton'
import { get } from 'lodash'
import Typewriter from 'typewriter-effect'
import { Container } from '../Container'
import { NodeCard } from '../NodeCard'
import { SearchNew } from '../SearchNew'

const getDomain = (url, subdomain = null) => {
  subdomain = subdomain || false

  url = url.replace(/(https?:\/\/)?(www.)?/i, '')

  if (!subdomain) {
    url = url.split('.')

    url = url.slice(url.length - 2).join('.')
  }

  if (url.indexOf('/') !== -1) {
    return url.split('/')[0]
  }

  return url
}
export function View({
  items,
  loading_node,
  setSkillId,
  skillId,
  articleCount,
  SkillName,
  nodeId,
  setNodeId,
  nodeContent,
}) {
  const [show, setShow] = useState(false)
  return (
    <section
      // id="testimonials"
      // aria-label="What our customers are saying"
      className="  bg-slate-50 font-mono text-slate-900 dark:bg-slate-800 dark:text-white"
    >
      {/* <Banner show={show} setShow={setShow} /> */}
      <Container className="pt-5 pb-16 text-center lg:pt-10">
        <h1
          onClick={() => setSkillId('')}
          className=" mx-auto max-w-4xl cursor-pointer font-display text-5xl font-medium tracking-tight   sm:text-7xl"
        >
          Structured{' '}
          <span className="relative whitespace-nowrap text-yellow-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-2/3 left-0 h-[0.58em] w-full fill-yellow-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Web</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 mb-2 max-w-4xl text-2xl  text-slate-700 dark:text-slate-400">
          Companies landing pages are complex to navigate and full of glassy
          CSS.{' '}
          <span className="font-bold text-black dark:text-white">
            Unfortunaly there is no one template to structure their textual
            data.
          </span>{' '}
          this is why we tend to scrap evrything and make sense of it after
          using complex nlp algorithms.{'  '}
          {!show && (
            <span
              onClick={() => setShow(!show)}
              className="cursor-pointer font-bold text-yellow-500 underline"
            >
              Read more ...
            </span>
          )}
        </p>
        {show && (
          <>
            <p className="mx-auto mt-1 mb-2 max-w-4xl text-2xl  text-slate-700 dark:text-slate-400">
              But wait! why does it look structured and organized when we look
              at it ? This is because of the HTML layout that give textual data
              a struture. Given this asumption i developped a simple algorthl
              that process a give hopelage html cleans it from irrelavant
              elements and transform it into graph. doing so we can identify
              relevant elements using graph centralities and cluster related
              items.{' '}
            </p>
            <p className="mx-auto mt-1 mb-2 max-w-4xl text-2xl  text-slate-700 dark:text-slate-400">
              Doing so, textual snippets are linked to their title, links also
              linked to theri scope and more ... Moreover we push this idea to
              utilise not only the graph but also rich objects found in links
              head to enrich internal links with usefull metadata.{' '}
              {show && (
                <span
                  onClick={() => setShow(!show)}
                  className="cursor-pointer font-bold text-yellow-500 underline"
                >
                  Read less ...
                </span>
              )}
            </p>
          </>
        )}

        <div className=" z-10 mt-10 flex justify-center gap-x-6">
          <SearchNew setSkillId={setSkillId} skillId={skillId} />
        </div>
        {articleCount != 0 && (
          <p className="mt-10 text-2xl ">
            {articleCount} relevant {articleCount == 1 ? 'Item' : 'Items'} found
            for <span className="font-bold">{getDomain(skillId)}</span>
          </p>
        )}
        {loading_node ? (
          <div className=" mt-10  flex items-center justify-center ">
            <ul
              role="list"
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-left sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
            >
              {[
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
              ].map((column, columnIndex) => (
                <li key={columnIndex}>
                  <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                    {column.map((article, articleIndex) => (
                      <ArticleCardSkeleton key={articleIndex} />
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul role="list" className=" mt-5 ">
            {items.map((item) => {
              if (item.label.length > 3) {
                return (
                  <span
                    onClick={() => setNodeId(item.id)}
                    className={`m-1 inline-flex transform  cursor-pointer items-center rounded-full text-xl  font-bold duration-100 ease-in-out hover:scale-105 ${
                      item.id == nodeId
                        ? 'bg-white text-yellow-700'
                        : 'bg-yellow-700 text-white '
                    } px-4 py-0.5 `}
                  >
                    {item.label}
                  </span>
                )
              }
            })}
          </ul>
        )}
        <div className="mt-10">
          {nodeContent.length != 0 && (
            <NodeCard nodeContent={nodeContent} key={1} />
          )}
        </div>
      </Container>
    </section>
  )
}
