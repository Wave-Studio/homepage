import Wrapper from "../../components/wrapper";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

export default function jsboard() {
  return (
    <>
      <Wrapper name="JSBoard">
        <header className="grid place-items-center lg:h-[55vh]">
          <div className="rounded-md grid place-items-center">
            <Image
              src="/logos/jsboard.png"
              alt="JSboard Logo"
              width={250}
              height={250}
              className="rounded"
              quality={100}
            />
            <div className="my-4 flex text-gray-800 space-x-4">
              <a
                href="https://github.com/wave-studio/JSBoard"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-10 p-2 bg-gray-200 rounded-md bg-opacity-20 cursor-pointer hover:bg-opacity-30 transition duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <BookOpenIcon className="w-10 p-2 bg-gray-200 rounded-md bg-opacity-20 cursor-pointer hover:bg-opacity-30 transition duration-300" />
              {/*<ExternalLinkIcon className="w-10 p-2 bg-gray-200 rounded-md bg-opacity-20 cursor-pointer hover:bg-opacity-30 transition duration-300" />
							We're working on a live page for this project. Stay tuned, we'll update this when we have one!*/}
            </div>
            <h2 className=" text-center font-medium">
              JSBoard is a community-first forum software built for the modern
              web.
            </h2>
          </div>
        </header>
        <div>
          <div className="space-y-16 mt-10 mx-3">
            <PromoBox name="A better way to run a community" desc="Easily allow users to engage with and grow your community. Create frictionless community support boards, connect users to people like them, post important announcements, and create a welcoming place for new and old users alike." button={<>Grow your community <ChevronRightIcon className="h-5 mt-[0.19rem] ml-1.5 group-hover:transform group-hover:translate-x-1 transition duration-300" /></>}>
            <div className="relative">
                <div className="bg-[#9c9ca4] p-[0.1rem] rounded-xl">
                  <div className="pt-3 px-3 pb-2 rounded-xl bg-black nightwind-prevent">
                    <Image
                      src="/assets/jsboard-website.png"
                      alt="JSboard Screenshot"
                      width={600}
                      height={350}
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-6 shadow-2xl rounded-2xl">
                  <Image
                    src="/assets/jsboard-mobile.png"
                    alt="JSboard Screenshot"
                    width={141}
                    height={289}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </PromoBox>
            
          </div>
        </div>
      </Wrapper>
    </>
  );
}

function PromoBox(props) {
  return (
    <section className={"flex justify-between " + (props.backwards ? "flex-row-reverse" : "")}>
              <div>
                <h3 className="text-3xl tracking-wide font-medium">
                  {props.name}
                </h3>
                <DotsHorizontalIcon className="h-8" />
                <p className="text-gray-800 max-w-lg font-light text-lg">
                  {props.desc}
                </p>
                <button className="btn flex group font-semibold tracking-wide mt-6 bg-[#1757e3] text-gray-200 nightwind-prevent rounded-md"> {props.button} </button>
              </div>
              {props.children}
            </section>
  );
}