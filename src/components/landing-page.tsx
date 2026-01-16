"use client";

import { useMemo, useState } from "react";
import { copy, type Locale } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>("uz");
  const [activeTab, setActiveTab] = useState<"students" | "centers">(
    "students",
  );
  const [studentEmail, setStudentEmail] = useState("");
  const [studentStatus, setStudentStatus] = useState<FormStatus>("idle");
  const [studentError, setStudentError] = useState<string | null>(null);
  const [centerStatus, setCenterStatus] = useState<FormStatus>("idle");
  const [centerErrors, setCenterErrors] = useState<Record<string, string>>({});
  const [centerForm, setCenterForm] = useState({
    name: "",
    center: "",
    email: "",
    phone: "",
    message: "",
  });

  const t = useMemo(() => copy[locale], [locale]);

  const inputBase =
    "mt-2 w-full rounded-xl border border-navy/10 bg-card/90 px-4 py-3 text-sm text-ink placeholder:text-ink/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/60";
  const labelBase = "text-sm font-medium text-navy";
  const labelLight = "text-sm font-medium text-sand/80";
  const errorBase = "mt-2 text-xs text-ember";

  const validateEmail = (value: string) => emailRegex.test(value.trim());

  const handleStudentEmailChange = (value: string) => {
    setStudentEmail(value);
    if (studentError) setStudentError(null);
    if (studentStatus !== "idle") setStudentStatus("idle");
  };

  const updateCenterField = (
    field: keyof typeof centerForm,
    value: string,
  ) => {
    setCenterForm((prev) => ({ ...prev, [field]: value }));
    if (centerStatus !== "idle") setCenterStatus("idle");
    setCenterErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _ignored, ...rest } = prev;
      return rest;
    });
  };

  const handleStudentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStudentError(null);

    if (!validateEmail(studentEmail)) {
      setStudentError(t.leads.validation.email);
      return;
    }

    setStudentStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "student",
          data: { email: studentEmail.trim() },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      trackEvent("lead_submit", { type: "student" });
      setStudentStatus("success");
      setStudentEmail("");
    } catch {
      setStudentStatus("error");
    }
  };

  const handleCenterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!centerForm.name.trim()) nextErrors.name = t.leads.validation.required;
    if (!centerForm.center.trim())
      nextErrors.center = t.leads.validation.required;
    if (!validateEmail(centerForm.email))
      nextErrors.email = t.leads.validation.email;
    if (!centerForm.phone.trim())
      nextErrors.phone = t.leads.validation.required;

    setCenterErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setCenterStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "center",
          data: {
            name: centerForm.name.trim(),
            center: centerForm.center.trim(),
            email: centerForm.email.trim(),
            phone: centerForm.phone.trim(),
            message: centerForm.message.trim(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      trackEvent("lead_submit", { type: "center" });
      setCenterStatus("success");
      setCenterForm({
        name: "",
        center: "",
        email: "",
        phone: "",
        message: "",
      });
      setCenterErrors({});
    } catch {
      setCenterStatus("error");
    }
  };

  return (
    <div className="bg-sand text-ink">
      <header className="sticky top-0 z-30 border-b border-navy/5 bg-sand/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy text-sand font-semibold shadow-soft">
              EW
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-navy/60">
                ExamWay
              </p>
              <p className="text-sm text-navy/80">{t.hero.eyebrow}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-navy/70 md:flex">
            <a className="hover:text-navy" href="#students">
              {t.nav.students}
            </a>
            <a className="hover:text-navy" href="#centers">
              {t.nav.centers}
            </a>
            <a className="hover:text-navy" href="#features">
              {t.nav.features}
            </a>
            <a className="hover:text-navy" href="#pricing">
              {t.nav.pricing}
            </a>
            <a className="hover:text-navy" href="#faq">
              {t.nav.faq}
            </a>
          </nav>
          <div className="flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLocale("uz")}
              className={`rounded-full px-3 py-1 transition ${
                locale === "uz"
                  ? "bg-navy text-sand shadow-soft"
                  : "text-navy/70 hover:text-navy"
              }`}
              aria-pressed={locale === "uz"}
            >
              UZ
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-3 py-1 transition ${
                locale === "en"
                  ? "bg-navy text-sand shadow-soft"
                  : "text-navy/70 hover:text-navy"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full bg-ember/20 blur-3xl" />
          <div className="pointer-events-none absolute right-10 top-24 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
          <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-20 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy/60 animate-fade-up">
                {t.hero.eyebrow}
              </p>
              <h1 className="font-display text-4xl leading-tight text-navy animate-fade-up-delay sm:text-5xl">
                {t.hero.title}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-navy/70 animate-fade-up-delay-2">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#student-lead"
                  className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-amber-600"
                  onClick={() => trackEvent("cta_click", { type: "student" })}
                >
                  {t.hero.primaryCta}
                </a>
                <a
                  href="#center-lead"
                  className="inline-flex items-center justify-center rounded-full border border-navy/20 bg-white/70 px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-navy/40"
                  onClick={() => trackEvent("cta_click", { type: "center" })}
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
              <p className="text-xs text-navy/60">{t.hero.trustNote}</p>
            </div>
            <div className="relative flex flex-col gap-4">
              <div className="rounded-3xl border border-navy/10 bg-white/80 p-6 shadow-soft">
                <p className="text-sm font-semibold text-navy">
                  {t.overview.tabs.students.title}
                </p>
                <p className="mt-3 text-sm text-navy/70">
                  {t.overview.tabs.students.summary}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-navy/70">
                  {t.overview.tabs.students.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-ember" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-navy/10 bg-navy p-6 text-sand shadow-soft">
                <p className="text-sm font-semibold">{t.overview.tabs.centers.title}</p>
                <p className="mt-3 text-sm text-sand/80">
                  {t.overview.tabs.centers.summary}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-sand/80">
                  {t.overview.tabs.centers.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sun" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 rounded-3xl border border-navy/10 bg-white/80 p-8 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-display text-2xl text-navy">
                {t.socialProof.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {t.socialProof.logos.map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-10 w-20 items-center justify-center rounded-full border border-navy/10 bg-sand text-xs font-semibold text-navy/60"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.socialProof.testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="rounded-2xl border border-navy/10 bg-sand p-5 text-sm text-navy/80"
                >
                  <blockquote className="leading-relaxed">{item.quote}</blockquote>
                  <figcaption className="mt-4 text-xs font-semibold text-navy">
                    {item.name} ·{" "}
                    <span className="font-normal text-navy/70">{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="students"
          className="mx-auto max-w-6xl px-6 py-10"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-3xl text-navy">
                {t.overview.title}
              </h2>
              <div className="flex w-full max-w-sm rounded-full border border-navy/10 bg-white/80 p-1">
                {(["students", "centers"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition ${
                      activeTab === tab
                        ? "bg-navy text-sand shadow-soft"
                        : "text-navy/70 hover:text-navy"
                    }`}
                    aria-pressed={activeTab === tab}
                  >
                    {t.overview.tabs[tab].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-navy/10 bg-white/80 p-8 shadow-soft">
                <h3 className="font-display text-2xl text-navy">
                  {t.overview.tabs[activeTab].title}
                </h3>
                <p className="mt-3 text-sm text-navy/70">
                  {t.overview.tabs[activeTab].summary}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-navy/80">
                  {t.overview.tabs[activeTab].bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                id="centers"
                className="rounded-3xl border border-navy/10 bg-navy p-8 text-sand shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-sand/60">
                  B2B
                </p>
                <h3 className="mt-2 font-display text-2xl">
                  {t.overview.tabs.centers.title}
                </h3>
                <p className="mt-3 text-sm text-sand/80">
                  {t.overview.tabs.centers.summary}
                </p>
                <div className="mt-6 space-y-4 text-xs text-sand/80">
                  {t.overview.tabs.centers.bullets.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-sand/10 bg-sand/10 p-4"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="#center-lead"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-sun px-5 py-2 text-xs font-semibold text-navy transition hover:-translate-y-0.5"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-3xl text-navy">
              {t.features.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.features.items.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-navy/10 bg-white/80 p-6 shadow-soft"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/15 text-teal">
                    <span className="text-lg font-semibold">+</span>
                  </div>
                  <h3 className="text-base font-semibold text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 rounded-3xl border border-navy/10 bg-white/80 p-8 shadow-soft md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl text-navy">
                {t.howItWorks.title}
              </h2>
              <p className="mt-3 text-sm text-navy/70">
                {locale === "uz"
                  ? "Har bosqich imtihon natijasiga yaqinlashish uchun."
                  : "Each step moves you closer to the target score."}
              </p>
            </div>
            <ol className="space-y-4">
              {t.howItWorks.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-navy/10 bg-sand p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs text-navy/70">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-3xl text-navy">
              {t.pricing.title}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {t.pricing.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex h-full flex-col rounded-3xl border border-navy/10 p-6 shadow-soft ${
                    tier.name === "Center"
                      ? "bg-navy text-sand"
                      : "bg-white/85 text-navy"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="mt-4 text-2xl font-display">{tier.price}</p>
                  <p
                    className={`mt-2 text-xs ${
                      tier.name === "Center" ? "text-sand/70" : "text-navy/70"
                    }`}
                  >
                    {tier.note}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full ${
                            tier.name === "Center" ? "bg-sun" : "bg-teal"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 text-xs opacity-70">
                    {tier.name === "Center" ? t.pricing.seatNote : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 rounded-3xl border border-navy/10 bg-white/85 p-8 shadow-soft md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl text-navy">
                {t.faq.title}
              </h2>
              <p className="mt-3 text-sm text-navy/70">
                {locale === "uz"
                  ? "B2B savollari ham shu yerda."
                  : "B2B details included."}
              </p>
            </div>
            <div className="space-y-3">
              {t.faq.items.map((item) => (
                <details
                  key={item.q}
                  className="rounded-2xl border border-navy/10 bg-sand p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-navy">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-xs text-navy/70">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-3xl text-navy">
              {t.leads.title}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <form
                id="student-lead"
                onSubmit={handleStudentSubmit}
                className="flex flex-col gap-4 rounded-3xl border border-navy/10 bg-white/85 p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-navy">
                  {t.leads.studentTitle}
                </h3>
                <div>
                  <label className={labelBase} htmlFor="student-email">
                    {t.leads.fields.email}
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    className={inputBase}
                    value={studentEmail}
                    onChange={(event) => handleStudentEmailChange(event.target.value)}
                    placeholder={t.leads.placeholders.email}
                    autoComplete="email"
                  />
                  {studentError ? (
                    <p className={errorBase}>{studentError}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={studentStatus === "submitting"}
                >
                  {studentStatus === "submitting"
                    ? locale === "uz"
                      ? "Yuborilmoqda..."
                      : "Submitting..."
                    : t.leads.studentCta}
                </button>
                {studentStatus === "success" ? (
                  <p className="text-xs text-teal" role="status">
                    {t.leads.success}
                  </p>
                ) : null}
                {studentStatus === "error" ? (
                  <p className="text-xs text-ember" role="status">
                    {t.leads.error}
                  </p>
                ) : null}
              </form>

              <form
                id="center-lead"
                onSubmit={handleCenterSubmit}
                className="flex flex-col gap-4 rounded-3xl border border-navy/10 bg-navy p-6 text-sand shadow-soft"
              >
                <h3 className="text-lg font-semibold">
                  {t.leads.centerTitle}
                </h3>
                <div>
                  <label className={labelLight} htmlFor="center-name">
                    {t.leads.fields.name}
                  </label>
                  <input
                    id="center-name"
                    type="text"
                    className={inputBase}
                    value={centerForm.name}
                    onChange={(event) =>
                      updateCenterField("name", event.target.value)
                    }
                    placeholder={t.leads.placeholders.name}
                    autoComplete="name"
                  />
                  {centerErrors.name ? (
                    <p className={errorBase}>{centerErrors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label className={labelLight} htmlFor="center-org">
                    {t.leads.fields.center}
                  </label>
                  <input
                    id="center-org"
                    type="text"
                    className={inputBase}
                    value={centerForm.center}
                    onChange={(event) =>
                      updateCenterField("center", event.target.value)
                    }
                    placeholder={t.leads.placeholders.center}
                    autoComplete="organization"
                  />
                  {centerErrors.center ? (
                    <p className={errorBase}>{centerErrors.center}</p>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelLight} htmlFor="center-email">
                      {t.leads.fields.email}
                    </label>
                    <input
                      id="center-email"
                      type="email"
                      className={inputBase}
                      value={centerForm.email}
                      onChange={(event) =>
                        updateCenterField("email", event.target.value)
                      }
                      placeholder={t.leads.placeholders.email}
                      autoComplete="email"
                    />
                    {centerErrors.email ? (
                      <p className={errorBase}>{centerErrors.email}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className={labelLight} htmlFor="center-phone">
                      {t.leads.fields.phone}
                    </label>
                    <input
                      id="center-phone"
                      type="tel"
                      className={inputBase}
                      value={centerForm.phone}
                      onChange={(event) =>
                        updateCenterField("phone", event.target.value)
                      }
                      placeholder={t.leads.placeholders.phone}
                      autoComplete="tel"
                    />
                    {centerErrors.phone ? (
                      <p className={errorBase}>{centerErrors.phone}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label className={labelLight} htmlFor="center-message">
                    {t.leads.fields.message}
                  </label>
                  <textarea
                    id="center-message"
                    className={`${inputBase} min-h-30`}
                    value={centerForm.message}
                    onChange={(event) =>
                      updateCenterField("message", event.target.value)
                    }
                    placeholder={t.leads.placeholders.message}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-sun px-5 py-3 text-sm font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={centerStatus === "submitting"}
                >
                  {centerStatus === "submitting"
                    ? locale === "uz"
                      ? "Yuborilmoqda..."
                      : "Submitting..."
                    : t.leads.centerCta}
                </button>
                {centerStatus === "success" ? (
                  <p className="text-xs text-sun" role="status">
                    {t.leads.success}
                  </p>
                ) : null}
                {centerStatus === "error" ? (
                  <p className="text-xs text-ember" role="status">
                    {t.leads.error}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy/10 bg-sand">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-navy">ExamWay</p>
            <p className="mt-2 text-sm text-navy/70">{t.footer.tag}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">
              {t.footer.linksTitle}
            </p>
            <div className="mt-3 space-y-2 text-sm text-navy/70">
              <a className="block hover:text-navy" href="#students">
                {t.nav.students}
              </a>
              <a className="block hover:text-navy" href="#features">
                {t.nav.features}
              </a>
              <a className="block hover:text-navy" href="#pricing">
                {t.nav.pricing}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">
              {t.footer.contactTitle}
            </p>
            <div className="mt-3 space-y-2 text-sm text-navy/70">
              <p>+998 71 000 00 00</p>
              <p>hello@examway.uz</p>
              <p>{t.footer.rights}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
