import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "en";
let locales = ["bn", "en"];

//! get the preferred locale, similar to above or using a library:
function getLocale(request) {
    const acceptedLanguage = request.headers.get("accept-language") ?? undefined;

    let headers = { "accept-language": acceptedLanguage };
    let languages = new Negotiator({ headers }).languages();

    return match(languages, locales, defaultLocale); //* -> 'en-US'
}

export function middleware(request) {
    //? check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    //? Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        //* e.g. incoming request is /photos
        //* The new URL is now /en-US/photos
        return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
    }
}

export const config = {
    matcher: [
        //? Skip all internal paths (_next, assets, api)
        //* Optional: only run on root (/) URL
        "/((?!api|assets|.*\\..*|_next).*)",
    ],
};
