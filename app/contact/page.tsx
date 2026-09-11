"use client";

import { useActionState, useEffect, useRef } from "react";
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitInquiry } from "./actions";
import {
  initialInquiryState,
  PROJECT_TYPES,
  BUDGET_RANGES,
} from "@/lib/inquiry";

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialInquiryState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const submittedValuesRef = useRef<FormData>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      submittedValuesRef.current = null;
      return;
    }

    if (state.status !== "error" || !formRef.current || !submittedValuesRef.current) return;

    for (const [name, value] of submittedValuesRef.current) {
      const field = formRef.current.elements.namedItem(name);
      if (
        typeof value === "string" &&
        (field instanceof HTMLInputElement ||
          field instanceof HTMLSelectElement ||
          field instanceof HTMLTextAreaElement)
      ) {
        field.value = value;
      }
    }
  }, [state]);

  return (
    <main>
      {/* Header */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="eyebrow">Direct Inquiry</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Start a project inquiry
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Have an application to build, a machine learning challenge, or need technical consulting?
              Submit your project brief below or reach out directly via email.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Sidebar info */}
            <aside className="lg:col-span-4 space-y-8">
              <div>
                <h2 className="font-display text-xl font-medium text-foreground">
                  Direct contact
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Feel free to send a direct email if you already have an RFP or technical specification document.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/80 bg-surface p-4 shadow-sm dark:border-zinc-800/80">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-background text-signal dark:border-zinc-800/80">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-zinc-500">Email</p>
                    <a
                      href="mailto:ralphvincentrodriguez@sksu.edu.ph"
                      className="focus-ring mt-0.5 block truncate font-mono text-xs font-semibold text-foreground hover:text-signal"
                    >
                      ralphvincentrodriguez@sksu.edu.ph
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/80 bg-surface p-4 shadow-sm dark:border-zinc-800/80">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-background text-signal dark:border-zinc-800/80">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-zinc-500">Location</p>
                    <p className="mt-0.5 text-xs font-semibold text-foreground">
                      Sultan Kudarat, Philippines (UTC+8)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/80 bg-surface p-4 shadow-sm dark:border-zinc-800/80">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-background text-signal dark:border-zinc-800/80">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-zinc-500">Response time</p>
                    <p className="mt-0.5 text-xs font-semibold text-foreground">
                      Typically within 1–2 business days
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Form Area */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-zinc-200/80 bg-surface p-6 sm:p-10 shadow-sm dark:border-zinc-800/80">
                <h2 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                  Project details
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Please provide high-level details about what you are aiming to build.
                </p>

                {/* Status Message */}
                <div aria-live="polite" className="mt-6">
                  {state.status === "success" && (
                    <div className="flex items-start gap-3 rounded-xl border border-signal/40 bg-signal/10 p-4 text-signal">
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      <div className="text-sm font-medium">{state.message}</div>
                    </div>
                  )}

                  {state.status === "error" && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-600 dark:text-red-400">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <div className="text-sm font-medium">{state.message}</div>
                    </div>
                  )}
                </div>

                <form
                  ref={formRef}
                  action={formAction}
                  onSubmit={(event) => {
                    submittedValuesRef.current = new FormData(event.currentTarget);
                  }}
                  className="mt-8 space-y-6"
                >
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                      >
                        Your Name <span className="text-signal">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder="Ada Lovelace"
                        aria-invalid={Boolean(state.fieldErrors?.name)}
                        aria-describedby={
                          state.fieldErrors?.name ? "name-error" : undefined
                        }
                        className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors placeholder:text-zinc-400 dark:border-zinc-800/80"
                      />
                      {state.fieldErrors?.name && (
                        <p id="name-error" className="mt-1.5 font-mono text-xs text-red-500">
                          {state.fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                      >
                        Email Address <span className="text-signal">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        placeholder="ada@example.com"
                        aria-invalid={Boolean(state.fieldErrors?.email)}
                        aria-describedby={
                          state.fieldErrors?.email ? "email-error" : undefined
                        }
                        className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors placeholder:text-zinc-400 dark:border-zinc-800/80"
                      />
                      {state.fieldErrors?.email && (
                        <p id="email-error" className="mt-1.5 font-mono text-xs text-red-500">
                          {state.fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                      >
                        Project Domain <span className="text-signal">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        defaultValue=""
                        aria-invalid={Boolean(state.fieldErrors?.projectType)}
                        aria-describedby={
                          state.fieldErrors?.projectType ? "type-error" : undefined
                        }
                        className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors dark:border-zinc-800/80"
                      >
                        <option value="" disabled>
                          Select project domain
                        </option>
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {state.fieldErrors?.projectType && (
                        <p id="type-error" className="mt-1.5 font-mono text-xs text-red-500">
                          {state.fieldErrors.projectType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                      >
                        Estimated Budget <span className="text-signal">*</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        defaultValue=""
                        aria-invalid={Boolean(state.fieldErrors?.budget)}
                        aria-describedby={
                          state.fieldErrors?.budget ? "budget-error" : undefined
                        }
                        className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors dark:border-zinc-800/80"
                      >
                        <option value="" disabled>
                          Select budget range
                        </option>
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      {state.fieldErrors?.budget && (
                        <p id="budget-error" className="mt-1.5 font-mono text-xs text-red-500">
                          {state.fieldErrors.budget}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label
                      htmlFor="timeline"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      Desired Timeline <span className="text-signal">*</span>
                    </label>
                    <input
                      id="timeline"
                      name="timeline"
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      placeholder="e.g. 4–6 weeks, Q3 launch, immediate"
                      aria-invalid={Boolean(state.fieldErrors?.timeline)}
                      aria-describedby={
                        state.fieldErrors?.timeline ? "timeline-error" : undefined
                      }
                      className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors placeholder:text-zinc-400 dark:border-zinc-800/80"
                    />
                    {state.fieldErrors?.timeline && (
                      <p id="timeline-error" className="mt-1.5 font-mono text-xs text-red-500">
                        {state.fieldErrors.timeline}
                      </p>
                    )}
                  </div>

                  {/* Brief */}
                  <div>
                    <label
                      htmlFor="brief"
                      className="block font-mono text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      Project Brief & Requirements <span className="text-signal">*</span>
                    </label>
                    <textarea
                      id="brief"
                      name="brief"
                      rows={5}
                      required
                      minLength={20}
                      maxLength={3000}
                      placeholder="Describe the system, key user workflows, integrations needed, and current project stage (min. 20 characters)..."
                      aria-invalid={Boolean(state.fieldErrors?.brief)}
                      aria-describedby={
                        state.fieldErrors?.brief ? "brief-error" : undefined
                      }
                      className="focus-ring mt-2 block w-full rounded-xl border border-zinc-200/80 bg-background px-4 py-3 font-sans text-sm text-foreground transition-colors placeholder:text-zinc-400 dark:border-zinc-800/80"
                    />
                    {state.fieldErrors?.brief && (
                      <p id="brief-error" className="mt-1.5 font-mono text-xs text-red-500">
                        {state.fieldErrors.brief}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={pending}
                      className="focus-ring inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-signal px-8 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-signal-bright hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {pending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
