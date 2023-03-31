import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

export function Banner({ show, setShow }) {
  return (
    <>
      {show && (
        <div className="bg-yellow-600">
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <span className="flex rounded-lg bg-yellow-800 p-2">
                  <MegaphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 truncate font-medium text-white">
                  {/* <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">Big news! We're excited to announce a brand new product.</span> */}
                  <span className="md:hidden">
                    Check{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold underline"
                      href="https://github.com/AnasAito/SkillNER"
                    >
                      SKILLNER
                    </a>
                    !
                  </span>
                  <span className="hidden md:inline">
                    Info! Tech signal is powered by{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold underline"
                      href="https://github.com/AnasAito/SkillNER"
                    >
                      SKILLNER
                    </a>{' '}
                    an open source skill extractor (Tech,business, languages
                    ...) from text.
                  </span>
                </p>
              </div>
              {/* <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-yellow-600 shadow-sm hover:bg-yellow-50"
            >
              Learn more
            </a>
          </div> */}
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  type="button"
                  className="-mr-1 flex rounded-md p-2 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                  onClick={() => setShow(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
