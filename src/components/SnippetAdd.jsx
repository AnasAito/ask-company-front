import React, { useState } from 'react'
import { Fragment } from 'react'

export function SnippetAdd({ setSnippets }) {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(null)
  return (
    <>
      {edit ? (
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <form action="#" className="relative">
              <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-yellow-600">
                <label htmlFor="comment" className="sr-only">
                  Add your snippet
                </label>
                <textarea
                  rows={6}
                  name="comment"
                  id="comment"
                  className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-slate-400 sm:text-sm sm:leading-6"
                  placeholder="Add your comment..."
                  defaultValue={''}
                  onChange={(e) => setText(e.target.value)}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div className="py-2" aria-hidden="true">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute  inset-x-0 bottom-0 flex justify-end  py-2 pl-3 pr-2 ">
                <div className="flex-shrink-0 ">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                    onClick={() => {
                      setSnippets((prevSnippets) => [
                        { id: text, description: text, keywords: [] },
                        ...prevSnippets,
                      ])
                      setEdit(false)
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setEdit(true)}
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              // stroke-linecap="round"
              // stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-white">
            Add a new snippet
          </span>
        </button>
      )}
    </>
  )
}
