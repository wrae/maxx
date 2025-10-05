import React, { useState } from "react";
import { I18nContext } from "../App";

const SERVICE_KEYS = [
  "standard","deep","move","office","post","windows","carpets","disinfect","laundry","appliance","other"
] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  const p1 = d.slice(0, 3), p2 = d.slice(3, 6), p3 = d.slice(6, 10);
  if (d.length <= 3) return p1;
  if (d.length <= 6) return `(${p1}) ${p2}`;
  return `(${p1}) ${p2}-${p3}`;
}

export default function Contact() {
  const { t, lang } = React.useContext(I18nContext);
  const [first, setFirst] = useState(""); const [last, setLast] = useState("");
  const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState<ServiceKey[]>([]); const [otherText, setOtherText] = useState("");
  const [sending, setSending] = useState(false); const [done, setDone] = useState(false);

  const isOther = checked.includes("other");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/.test(phone);
  const nameValid = first.length > 0 && last.length > 0 && first.length <= 50 && last.length <= 50;
  const servicesValid = checked.length > 0 && (!isOther || (otherText.length >= 25 && otherText.length <= 50));
  const formValid = nameValid && emailValid && phoneValid && servicesValid;

  const handleToggle = (s: ServiceKey) => setChecked((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;
    setSending(true);
    try {
      const payload = { firstName: first, lastName: last, email, phone, services: checked, other: isOther ? otherText : undefined, lang };
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setDone(true); setFirst(""); setLast(""); setEmail(""); setPhone(""); setChecked([]); setOtherText("");
    } catch (err) {
      console.error("Failed to submit form", err);
      alert(lang === "en" ? "We couldn't send your request right now. Please try again later or call us." : "No pudimos enviar tu solicitud. Inténtalo más tarde o llámanos.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="text-2xl sm:text-3xl font-bold tracking-tight">{t("contact.heading")}</h2>
      <p className="mt-3 max-w-2xl text-gray-700">{t("contact.blurb")}</p>

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 grid gap-6 rounded-3xl bg-white p-5 sm:p-6 shadow ring-1 ring-gray-100 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("contact.first")}</label>
            <input required maxLength={50} value={first} onChange={(e) => setFirst(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3" placeholder="Jane" />
            <p className="mt-1 text-xs text-gray-500">{t("contact.max50")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("contact.last")}</label>
            <input required maxLength={50} value={last} onChange={(e) => setLast(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3" placeholder="Doe" />
            <p className="mt-1 text-xs text-gray-500">{t("contact.max50")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("contact.email")}</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3" placeholder="name@example.com" />
            <p className={`mt-1 text-xs ${emailValid ? "text-gray-500" : "text-red-600"}`}>{t("contact.emailHelp")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("contact.phone")}</label>
            <input
              required inputMode="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
              pattern="^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$"
              className="mt-1 w-full rounded-xl border px-3 py-3" placeholder="(555) 123-4567" title="Enter a valid 10-digit US phone number"
            />
            <p className={`mt-1 text-xs ${phoneValid ? "text-gray-500" : "text-red-600"}`}>{t("contact.phoneHelp")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">{t("contact.servicesLegend")}</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICE_KEYS.map((k) => (
                <label key={k} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={checked.includes(k)} onChange={() => handleToggle(k)} className="h-5 w-5 rounded border-gray-300" />
                  {t(`services.list.${k}`)}
                </label>
              ))}
            </div>
          </fieldset>

          {isOther && (
            <div>
              <label className="block text-sm font-medium text-gray-700">{t("contact.otherLabel")}</label>
              <input
                required minLength={25} maxLength={50} value={otherText} onChange={(e) => setOtherText(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-3"
                placeholder={lang === "en" ? "Briefly describe your request" : "Describe brevemente tu solicitud"}
              />
            </div>
          )}

          <button type="submit" disabled={!formValid || sending} className={`w-full rounded-2xl px-4 py-3 font-semibold text-white transition ${!formValid || sending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            {sending ? (lang === "en" ? "Sending…" : "Enviando…") : t("contact.submit")}
          </button>

          {done && <p className="text-sm text-green-700">{t("contact.thanks")}</p>}
        </div>
      </form>

      <div className="mt-8 text-sm text-gray-600">
        <p>{t("contact.privacy")}</p>
      </div>
    </section>
  );
}
