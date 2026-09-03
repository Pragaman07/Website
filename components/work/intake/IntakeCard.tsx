"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SeverityCards } from "@/components/work/intake/SeverityCards";
import { SuccessState } from "@/components/work/intake/SuccessState";
import { IntakeCounter } from "@/components/work/intake/IntakeCounter";
import { useSfx } from "@/lib/sound";
import { cn } from "@/lib/cn";
import type { Counters } from "@/lib/kv";
import type { IntakeContent, IntakeStep } from "@/lib/content";

/**
 * §10 — the Intake, live: 5 steps, one visible at a time (slide-left to
 * advance, slide-right back), Enter advances, inline validation in
 * interface voice, severity as radio cards, honeypot, optimistic counter,
 * success flip + intake-submit sound (success only). Keyboard-completable
 * end to end.
 */
export function IntakeCard({ content }: { content: IntakeContent }) {
  const steps = content.steps;
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"filling" | "submitting" | "success">("filling");
  const [counters, setCounters] = useState<Counters | null>(null);
  const playSubmit = useSfx("intake-submit");
  const reduced = useReducedMotion();
  const fieldRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);
  const interacted = useRef(false);

  const step = steps[stepIndex];
  const value = values[step.id] ?? "";

  // Focus the active field on step CHANGE (never on initial page load).
  useEffect(() => {
    if (interacted.current) fieldRef.current?.focus();
  }, [stepIndex]);

  // Dev-only preview of the success face without pitching for real:
  // /work?intake=success (same idea as ?fakeHour=N). Post-hydration on
  // purpose so the server and client first render agree.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (new URLSearchParams(window.location.search).get("intake") === "success") {
      setStatus("success");
    }
  }, []);

  const errText = (key: string) =>
    content.errors[key]?.text ?? content.errors.serverError?.text ?? "";

  const validate = useCallback(
    (s: IntakeStep, v: string): string | null => {
      if (s.kind === "textarea") {
        if (s.allowEmpty && v.trim() === "") return null;
        if (v.trim() === "") return errText("needed");
        if (s.minChars && v.trim().length < s.minChars) return errText("tooShort");
        return null;
      }
      if (s.kind === "severity") return v ? null : errText("needed");
      if (s.kind === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : errText("emailMissing");
      }
      return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content],
  );

  const advance = () => {
    const problem = validate(step, value);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => {
    setError(null);
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const submit = async () => {
    const problem = validate(step, value);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStatus("submitting");
    const optimistic = counters ? { ...counters, pitched: counters.pitched + 1 } : null;
    if (optimistic) setCounters(optimistic);

    try {
      const [res] = await Promise.all([
        fetch("/api/intake", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            broken: values.broken ?? "",
            hurts: values.hurts ?? "",
            tried: values.tried ?? "",
            severity: values.severity ?? "",
            email: values.email ?? "",
            website: values.website ?? "",
          }),
        }),
        new Promise((r) => setTimeout(r, 300)),
      ]);

      if (res.ok) {
        const data = (await res.json()) as { counters?: Counters };
        if (data.counters) setCounters(data.counters);
        setStatus("success");
        playSubmit();
        return;
      }
      setStatus("filling");
      setCounters(counters);
      setError(errText(res.status === 429 ? "rateLimited" : "serverError"));
    } catch {
      setStatus("filling");
      setCounters(counters);
      setError(errText("serverError"));
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "filling") return;
    if (stepIndex < steps.length - 1) advance();
    else submit();
  };

  const textareaKeys = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (stepIndex < steps.length - 1) advance();
    }
  };

  const setValue = (v: string) => {
    interacted.current = true;
    setValues((prev) => ({ ...prev, [step.id]: v }));
    if (error) setError(null);
  };

  const stepCount = steps.length;
  const showEmptyCta = step.kind === "textarea" && step.allowEmpty && value.trim() === "";

  return (
    <div>
      <div className="w-full max-w-[560px] rounded-card border border-line bg-surface p-6 shadow-m md:p-8">
        {status === "success" ? (
          <SuccessState content={content.success} />
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="type-display-m text-ink">{content.header.title.text}</h3>
                <p className="type-body mt-2 text-muted">{content.header.sub.text}</p>
              </div>
              <MonoLabel bold className="whitespace-nowrap pt-2">
                {String(stepIndex + 1).padStart(2, "0")} /{" "}
                {String(stepCount).padStart(2, "0")}
              </MonoLabel>
            </div>

            <div className="mt-5 flex items-center gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span
                  key={s.id}
                  className={cn(
                    "h-1.5 rounded-pill transition-all duration-300",
                    i === stepIndex ? "w-6 bg-accent" : "w-1.5",
                    i < stepIndex ? "bg-accent-deep" : i > stepIndex ? "bg-line" : "",
                  )}
                />
              ))}
            </div>

            <form onSubmit={onFormSubmit} className="mt-6">
              {/* honeypot — humans never see it; bots love it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values.website ?? ""}
                onChange={(e) => setValues((p) => ({ ...p, website: e.target.value }))}
                className="absolute -left-[9999px] h-px w-px"
              />

              <div className="overflow-hidden">
                {/* Keyed remount slides the ENTERING step in (advance = from
                    right, back = from left, §10); no exit phase — zero dead
                    time between steps. */}
                  <motion.div
                    key={step.id}
                    initial={reduced ? { opacity: 0 } : { x: direction * 48, opacity: 0 }}
                    animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
                    transition={{ duration: reduced ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor={`intake-${step.id}`} className="type-display-s block text-ink">
                      {step.question.text}
                    </label>

                    <div className="mt-4">
                      {step.kind === "textarea" && (
                        <textarea
                          id={`intake-${step.id}`}
                          ref={(el) => {
                            fieldRef.current = el;
                          }}
                          rows={step.rows ?? 3}
                          value={value}
                          placeholder={step.placeholder?.text ?? ""}
                          onChange={(e) => setValue(e.target.value)}
                          onKeyDown={textareaKeys}
                          className="w-full resize-none rounded-btn border border-line bg-bg p-4 text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-accent"
                        />
                      )}
                      {step.kind === "severity" && (
                        <SeverityCards step={step} value={value} onChange={setValue} />
                      )}
                      {step.kind === "email" && (
                        <input
                          id={`intake-${step.id}`}
                          ref={(el) => {
                            fieldRef.current = el;
                          }}
                          type="email"
                          inputMode="email"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          onBlur={() => {
                            if (value) setError(validate(step, value));
                          }}
                          className="w-full rounded-btn border border-line bg-bg p-4 text-ink outline-none transition-colors duration-150 focus:border-accent"
                        />
                      )}
                    </div>

                    {error && (
                      <p role="alert" className="type-body-s mt-2 font-medium text-accent-deep">
                        {error}
                      </p>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-4">
                      {stepIndex > 0 ? (
                        <button
                          type="button"
                          onClick={back}
                          className="type-body-s font-medium text-muted transition-colors duration-150 hover:text-ink"
                        >
                          {content.nav.back.text}
                        </button>
                      ) : (
                        <span />
                      )}

                      {stepIndex < stepCount - 1 ? (
                        <button
                          type="submit"
                          className="rounded-btn bg-accent px-5 py-2.5 font-bold text-on-accent transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-deep motion-reduce:transition-none"
                        >
                          {showEmptyCta ? step.emptyCta?.text : content.nav.next.text}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className={cn(
                            "rounded-btn bg-accent px-5 py-2.5 font-bold text-on-accent transition-[background-color,transform,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-deep motion-reduce:transition-none",
                            status === "submitting" && "cursor-wait opacity-70",
                          )}
                        >
                          {steps[stepCount - 1].submitLabel?.text}
                        </button>
                      )}
                    </div>
                  </motion.div>
              </div>
            </form>
          </>
        )}
      </div>

      {/* the public counter — beneath the card, aria-live */}
      <div className="mt-4">
        <IntakeCounter content={content.counter} override={counters} />
      </div>
    </div>
  );
}
