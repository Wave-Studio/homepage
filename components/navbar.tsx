import Head from "next/head";
import { LocLink } from "./misc";
import nightwind from "nightwind/helper"



export default function navbar(props) {
  const pageName = (props.name + " | Wave Studios") || "Wave Studios";
  return (
	<>
	  <Head>
		<title>{pageName}</title>
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
	  </Head>
	  <nav className="sticky top-0 z-30 bg-opacity-50 h-[4.5rem] bg-gray-900 backdrop-filter backdrop-blur w-full">
		<div className="flex h-full items-center mx-auto justify-between max-w-screen-xl px-4 border-b-2 border-opacity-50 border-gray-400 text-gray-200 font-semibold">
		  <LocLink href="/">
			  <img
				className="rounded-full hover:ring transition h-10" 
				src="/logo.png"
				width="40"
				height="40"
				//quality="100"
				alt="Wave Studios Logo"
			  />
		  </LocLink>
		  <ul className="gap-8 flex text-gray-300">
			<li>JSBoard</li>
			<li>Case Studys</li>
			<li>Open Source</li>
		  </ul>
		  <div className="">Hire Us!</div>
		</div>
	  </nav>
	</>
  );
}
