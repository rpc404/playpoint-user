import React from "react";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "LXWpCfjUQcjnwjcDmtVwzA";
console.log(import.meta.env.VITE_i18n_API_KEY);
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: [
      "en",
      "es",
      "en-AU",
      "en-CA",
      "en-GB",
      "ja",
      "hi",
      "zh",
      "fr",
      "tl",
    ],
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },

    backend: {
      loadPath: loadPath,
    },
  });
