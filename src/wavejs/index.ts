/**
 * WaveJS
 *
 * Developed by Wave Studios
 */

// Hopefully the last time I'll be rewriting this

export class WJSApp {
	render?(): unknown {
		return;
	}

	renderRawHTML?(): string {
		return "";
	}
}

function isCorrectRoute(route: string, toCheck: string) {
	route = WaveJS.utils.removeExt(route);
	toCheck = WaveJS.utils.removeExt(toCheck);

	return route.toLowerCase() == toCheck.toLowerCase();
}

export function WJSPage({
	title = "WaveJS Page",
	route = window.location.pathname,
}: {
	title?: string;
	route?: string;
}) {
	// Only way I could find to get this to not error
	// deno-lint-ignore ban-types
	return function wjsPage<T extends Function>({
		prototype: { render, renderRawHTML },
	}: T) {
		route = WaveJS.utils.removeExt(route);
		WaveJS.wjsPageCache.set(route, {
			title,
			page: render ?? renderRawHTML,
		});
		if (isCorrectRoute(route, window.location.pathname)) {
			if (render == undefined && renderRawHTML == undefined) {
				throw new Error("Page does not have render function");
			} else {
				WaveJS.page({ title, route }, render ?? renderRawHTML);
			}
		}
	};
}

export class WaveJS {
	static utils = {
		removeExt(r: string) {
			if (r.endsWith(".html")) {
				r = r.slice(0, -5);
			}
			if (r.endsWith(".htm")) {
				r = r.slice(0, -4);
			}
			if (r.includes("#")) {
				r = r.split("#")[0];
			}
			if (r.includes("?")) {
				r = r.split("?")[0];
			}
			if (r.startsWith("/dist")) {
				r = r.substring(6);
			}
			if (r.startsWith("/")) {
				r = r.substring(1);
			}
			return r;
		},
	};
	static wjsPageCache: Map<
		string,
		{
			title: string;
			page: () => unknown | string;
		}
	> = new Map();
	static get f(): DocumentFragment {
		return document.createDocumentFragment();
	}
	// Yw lukas
	static page(
		{
			title = "WaveJS Page",
			route = window.location.pathname,
		}: {
			title?: string;
			route?: string;
		},
		page: () => unknown | string
	) {
		route = WaveJS.utils.removeExt(route);
		WaveJS.wjsPageCache.set(route, {
			title,
			page,
		});
		if (isCorrectRoute(route, window.location.pathname)) {
			if (
				page.prototype.render == undefined &&
				page.prototype.renderRawHTML == undefined && 
				page == undefined
			) {
				throw new Error("Page does not have render function");
			} else {
				WaveJS.renderPage();
			}
		}
	}
	static renderPage() {
		const page = WaveJS.wjsPageCache.get(
			WaveJS.utils.removeExt(window.location.pathname)
		);
		if (page == undefined) throw new Error("Page not found");
		const result = page.page();
		document.title = page.title;
		if (typeof result == "string") {
			document.getElementById("app")!.innerHTML = result;
		} else {
			document.getElementById("app")!.appendChild(result as Node);
		}
	}
	static h(
		tagName:
			| string
			| ((...args: (string | JSX.AttributeCollection)[]) => Element | DocumentFragment)
			| DocumentFragment,
		attributes: JSX.AttributeCollection | null,
		...children: string[]
	): Element | DocumentFragment {
		if (
			typeof tagName === "function" &&
			!(tagName instanceof DocumentFragment)
		) {
			return tagName(attributes ?? { children });
		} else {
			const element =
				tagName instanceof DocumentFragment
					? tagName
					: document.createElement(tagName);

			if (attributes == undefined) {
				attributes = { children: ""};
			}

			if (element instanceof HTMLElement) {
				for (const attribue in attributes) {
					if (attribue.startsWith("on")) {
						element.addEventListener(
							attribue.substring(2).toLowerCase() as keyof HTMLElementEventMap,
							attributes[attribue] as unknown as () => void
						);
					} else {
						if (attribue === "style") {
							let styles = "";
							for (const style in attributes[attribue] as WJSCssClasses) {
								// @ts-ignore it should work
								styles += `${style}: ${attributes[attribue]![style]};`;
							}
							attributes[attribue] = styles;
						}
						element.setAttribute(
							attribue.toLowerCase() === "classname" ? "class" : attribue,
							attributes[attribue] as string
						);
					}
				}
			}

			const appendChild = (parent: Node, child: Node | string) => {
				if (child == undefined) {
					return;
				}

				if (Array.isArray(child)) {
					for (const value of child) {
						appendChild(parent, value);
					}
				} else if (typeof child === "string") {
					parent.appendChild(document.createTextNode(child));
				} else if (child instanceof Node) {
					parent.appendChild(child);
				} else if (typeof child !== "boolean") {
					parent.appendChild(document.createTextNode(String(child)));
				}
			};

			for (const child of children) {
				appendChild(element, child);
			}

			return element;
		}
	}
}

export default WaveJS;