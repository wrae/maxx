import React from "react";
import { Link } from "react-router-dom";
import { I18nContext } from "../App";

export default function Home() {
  const { t } = React.useContext(I18nContext);
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:py-12" id="home" aria-labelledby="home-title">
      <h2 id="home-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
        {t("home.headline")}
      </h2>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-gray-700 leading-relaxed">
            Life is busy and dust is relentless. Our trained, background-checked team uses eco-friendly products,
            hospital-grade disinfectants where needed, and a meticulous 50-point checklist to deliver a clean that
            feels like a fresh start.
          </p>

          <ul className="mt-5 grid grid-cols-1 gap-2 text-gray-800 sm:grid-cols-2">
            {(t("home.features") as string[]).map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-600" />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-indigo-50 p-5 sm:p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">{t("home.packagesHeading")}</h3>
          <p className="text-gray-700">{t("home.packagesText")}</p>
          <Link to="/pricing" className="mt-4 inline-block rounded-2xl bg-indigo-600 px-4 py-2 text-white">
            {t("home.viewPricing")}
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 sm:p-6 shadow ring-1 ring-gray-100">
        <h3 className="text-lg font-semibold">{t("home.areasHeading")}</h3>
        <p className="mt-2 text-gray-700">{t("home.areasText")}</p>
      </div>
    </section>
  );
}
