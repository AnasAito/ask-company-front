import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
// import { TwitterShareButton, TwitterIcon } from 'react-share'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { ModeToggle } from '@/components/ModeToggle'
import { ModeToggleMobile } from '@/components/ModeToggleMobile'

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50 dark:bg-slate-700/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white  p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-white"
          >
            <MobileNavLink href="/about">About</MobileNavLink>
            <MobileNavLink href="/stats">Stats</MobileNavLink>
            <span className="rounded-md bg-slate-800 text-white dark:bg-white dark:text-slate-900">
              {' '}
              <MobileNavLink href="">
                <ModeToggleMobile />
              </MobileNavLink>
            </span>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({ openPanel, setOpenPanel, strategy }) {
  return (
    <header className="bg-slate-50 py-4 font-mono text-white dark:bg-slate-800 dark:text-white">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6 ">
              <NavLink href="/about">About</NavLink>
              {/* <NavLink href="/stats">Stats</NavLink> */}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button
              // href="https://github.com/sponsors/AnasAito"
              // target="_blank"
              // rel="noreferrer"
              onClick={() => setOpenPanel(true)}
              color="yellow"
            >
              <span>
                {/* <span className="hidden lg:inline"> Keep the App running!</span> */}
                <span className="inline">Add context</span>
              </span>
            </Button>
            <button
              type="button"
              aria-label="Toggle dark mode"
              className="group rounded-full bg-white/90 px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-slate-800/90 dark:ring-white/10 dark:hover:ring-white/20"
              onClick={() => alert(JSON.stringify(strategy))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                // stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
            <div className="hidden lg:inline">
              <ModeToggle />
            </div>

            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
