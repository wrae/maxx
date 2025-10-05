import React from "react";
import { I18nContext } from "../App";

const SERVICE_KEYS = [
  "standard","deep","move","office","post","windows","carpets","disinfect","laundry","appliance"
] as const;

export default function Services() {
  const { t, lang } = React.useContext(I18nContext);
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
        {t("services.heading")}
      </h2>
      <p className="mt-3 max-w-2xl text-gray-700">
        {lang === "en"
          ? "Build a plan that fits your home or business. One-time deep cleans, recurring schedules, and custom add-ons are all welcome."
          : "Arma un plan que se ajuste a tu hogar o negocio. Limpiezas puntuales, recurrencias y complementos personalizados son bienvenidos."}
      </p>
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KEYS.map((k) => (
          <div key={k} className="rounded-3xl bg-white p-5 sm:p-6 shadow ring-1 ring-gray-100">
            <h3 className="text-lg font-semibold">{t(`services.list.${k}`)}</h3>
            <p className="mt-2 text-gray-700">{t(`services.blurbs.${k}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
