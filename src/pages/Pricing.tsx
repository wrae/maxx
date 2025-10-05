import React from "react";
import { Link } from "react-router-dom";
import { I18nContext } from "../App";

export default function Pricing() {
  const { t } = React.useContext(I18nContext);
  const plans = [
    { name: t("pricing.plans.basic"), price: "$129", cadence: t("pricing.plans.cadenceVisit"), features: t("pricing.plans.features.basic") as string[] },
    { name: t("pricing.plans.deep"), price: "$249", cadence: t("pricing.plans.cadenceVisit"), features: t("pricing.plans.features.deep") as string[], highlight: true },
    { name: t("pricing.plans.pro"), price: "Custom", cadence: t("pricing.plans.cadenceMonthly"), features: t("pricing.plans.features.pro") as string[] },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12" id="pricing" aria-labelledby="pricing-title">
      <h2 id="pricing-title" className="text-2xl sm:text-3xl font-bold tracking-tight">{t("pricing.heading")}</h2>
      <p className="mt-3 max-w-2xl text-gray-700">{t("pricing.note")}</p>
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-3xl p-5 sm:p-6 shadow ring-1 ring-gray-100 ${(p as any).highlight ? "bg-indigo-600 text-white" : "bg-white"}`}>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-extrabold">{p.price}</div>
            <div className={`text-sm ${(p as any).highlight ? "text-indigo-100" : "text-gray-500"}`}>{p.cadence}</div>
            <ul className="mt-4 sm:mt-6 space-y-2">
              {p.features.map((f: string) => (
                <li key={f} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${(p as any).highlight ? "bg-white" : "bg-indigo-600"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`mt-5 sm:mt-6 inline-block rounded-2xl px-4 py-2 ${(p as any).highlight ? "bg-white text-indigo-700" : "bg-indigo-600 text-white"}`}>
              {t("pricing.plans.getPlan")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
