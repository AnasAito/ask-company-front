import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import Typewriter from 'typewriter-effect'
export function Modal({ pageMeta, setPageMeta, setStrategy }) {
  const [alts, setAlts] = useState([])
  const get_alt_labels = (text, keyword) => {
    return fetch(
      `https://mademoapi-1-p0601624.deta.app/get_alts?text=${text}&keyword=${keyword}`,
      {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    ).then((data) => data.json())
  }
  useEffect(() => {
    // setAlts(
    //   get(pageMeta, 'alts', []).map((alt) => {
    //     return { label: alt, disable: false }
    //   })
    // )

    let keyword = get(pageMeta, 'label', null)
    let context = get(pageMeta, 'context', null)
    if (keyword) {
      get_alt_labels(context, keyword).then((items) => {
        let keywords = items.payload.map((keyword) => keyword.trim())

        setAlts(
          keywords.map((alt) => {
            return { label: alt, disable: false }
          })
        )
      })
    }
  }, [pageMeta])

  return (
    <Transition.Root show={pageMeta ? true : false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setPageMeta(null)
          setAlts([])
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-slate-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div> */}

                  <div className="mt-3   text-center sm:mt-5 ">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      {get(pageMeta, 'label', null) ? pageMeta.label : ''}
                    </Dialog.Title>
                    {/* <div className="grid grid-cols-1 ">
                      {get(pageMeta, 'alts', []).map((alt) => (
                        <p className="dark:text-white">{alt}</p>
                      ))}
                    </div> */}
                    <ul role="list" className="mt-4">
                      {alts.length == 0 ? (
                        <p className="dark:text-white">loading ...</p>
                      ) : (
                        alts.map((keyword) => {
                          // if (item.label.length >= 3) {
                          return (
                            <span
                              key={keyword.label}
                              onClick={() =>
                                setAlts((alts) =>
                                  alts.map((alt) => {
                                    if (alt == keyword) {
                                      return {
                                        label: alt.label,
                                        disable: !alt.disable,
                                      }
                                    } else {
                                      return alt
                                    }
                                  })
                                )
                              }
                              className={`  m-1 inline-flex transform  cursor-pointer items-center rounded-full ${
                                keyword.disable ? 'bg-slate-400' : 'bg-white'
                              }  px-4 py-0.5  font-bold 
                            text-yellow-700 duration-100 ease-in-out hover:scale-105 `}
                            >
                              {keyword.label}
                            </span>
                          )
                          // }
                        })
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    // href={get(pageMeta, 'href', null)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 dark:hover:bg-yellow-500"
                    onClick={() => {
                      setStrategy((oldStrategy) => [
                        ...oldStrategy,
                        { label: get(pageMeta, 'label', null), alts: alts },
                      ])

                      setPageMeta(null)
                      setAlts([])
                    }}
                  >
                    Add to strategy
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
