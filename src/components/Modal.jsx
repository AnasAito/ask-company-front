import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import Typewriter from 'typewriter-effect'
export default function Modal({ pageMeta, setPageMeta }) {
  //   const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={pageMeta ? true : false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setPageMeta(null)}
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
                      {get(pageMeta, 'title', null) ? pageMeta.title : ''}
                    </Dialog.Title>
                    <div className="grid grid-cols-1 ">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          {get(pageMeta, 'description', null)
                            ? pageMeta.description
                            : ''}
                        </p>
                      </div>
                      <div>
                        <>
                          {[
                            { keyword: 'test', count: 10 },
                            // { keyword: 'test', count: 10 },
                            // { keyword: 'test', count: 10 },
                          ].map((concept) => {
                            let max_ = [{ keyword: 'test', count: 10 }]
                              .map((c) => c.count)
                              .reduce((x, y) => x + y, 0)

                            return (
                              <div
                                key={concept.keyword}
                                className="animate__animated animate__fadeIn flex items-start justify-between font-mono text-xs leading-none"
                              >
                                <div className="flex-1">
                                  <div
                                    className="mb-1 h-1 rounded bg-gradient-to-r from-blue-400 to-blue-200"
                                    style={{
                                      width: `${parseInt(
                                        (concept.count / max_) * 100
                                      )}%`,
                                    }}
                                  ></div>{' '}
                                  <p className="text-left">{concept.keyword}</p>
                                </div>{' '}
                                <p className="pl-2">
                                  {Math.round((concept.count / max_) * 100)} %
                                </p>{' '}
                              </div>
                            )
                          })}
                        </>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <a
                    href={get(pageMeta, 'href', null)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-yellow-500"
                    // onClick={() => setOpen(false)}
                  >
                    Extract keywords
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
