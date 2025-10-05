import React from "react";
import { I18nContext } from "../App";

export default function About() {
  const { t } = React.useContext(I18nContext);
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="text-2xl sm:text-3xl font-bold tracking-tight">{t("about.heading")}</h2>
      <p className="mt-3 max-w-3xl text-gray-700">{t("about.body")}</p>
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
        {(t("about.stats") as any[]).map((stat) => (
          <div key={stat.k} className="rounded-3xl bg-white p-5 sm:p-6 text-center shadow ring-1 ring-gray-100">
            <div className="text-xl sm:text-2xl font-extrabold text-indigo-700">{stat.v}</div>
            <div className="text-sm text-gray-600">{stat.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
