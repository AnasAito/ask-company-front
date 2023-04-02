import { Fragment, useState, useEffect, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'
import Queries from '../api/queries/index'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ClipLoader from 'react-spinners/ClipLoader'

import {
  CommandLineIcon,
  BriefcaseIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SearchNew({ setSkillId, skillId }) {
  const [query, setQuery] = useState('')

  const [open, setOpen] = useState(false)

  return (
    <div className=" mx-auto w-full transform divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-xl bg-white py-1 text-left shadow-2xl ring-4 ring-yellow-600 ring-opacity-50   dark:divide-slate-900 dark:bg-slate-900   lg:w-3/4">
      <Combobox onChange={(item) => (window.location = item.url)}>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="hidden h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-slate-50 sm:text-sm lg:block"
            placeholder="Tap a company homepage url ..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={() => setSkillId(query)}
            className="absolute top-1  right-4 rounded-lg bg-yellow-700 px-4  py-2 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Search
          </button>
        </div>
      </Combobox>
    </div>
  )
}
