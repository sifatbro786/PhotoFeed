"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const languages = [
        {
            code: "en",
            language: "English",
        },
        {
            code: "bn",
            language: "Bangla",
        },
    ];
    const found = languages.find((lang) => pathname.includes(lang.code));
    const [selectedLanguage, setSelectedLanguage] = useState(found ?? languages[0]);
    const [showManu, setShowManu] = useState(false);

    const handleLanguageChange = (lang) => {
        setSelectedLanguage({
            ...selectedLanguage,
            code: lang,
            language: lang === "en" ? "English" : "Bangla",
        });
        setShowManu(false);
        router.push(`/${lang}`);
    };

    return (
        <div className="flex gap-4 items-center">
            <div className="relative">
                <button className="flex items-center gap-2" onClick={() => setShowManu(!showManu)}>
                    <Image
                        className="max-w-8"
                        src={
                            selectedLanguage.language === "English"
                                ? "/images/usa.png"
                                : "/images/bd.png"
                        }
                        alt="language-icon"
                        height={100}
                        width={165}
                    />
                    {selectedLanguage.language}
                </button>
                {showManu && (
                    <div className="absolute right-0 top-full mt-2 w-40 rounded-md bg-white p-2 z-10 shadow-lg">
                        <li
                            onClick={() => handleLanguageChange(languages[0].code)}
                            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                className="max-w-8"
                                src="/images/usa.png"
                                alt="usa-flag"
                                height={100}
                                width={165}
                            />
                            {languages[0].language}
                        </li>
                        <li
                            onClick={() => handleLanguageChange(languages[1].code)}
                            className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            <Image
                                className="max-w-8"
                                src="/images/bd.png"
                                alt="bangladesh-flag"
                                height={100}
                                width={165}
                            />
                            {languages[1].language}
                        </li>
                    </div>
                )}
            </div>
        </div>
    );
}
