"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { completeSetupAction } from "@/app/dashboard/actions";

export function SetupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center p-6 sm:p-10">
      <section className="dashboard-panel w-full overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-slate-950 px-8 py-10 text-white sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-300">First-Time Setup</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">Name the company. Define the mission. Spin up the first agent team.</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
              This is the minimum operating system: one company, one CEO, four starter agents, persistent task visibility, and a single place to direct the work.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["CEO", "Research", "Market Analysis", "Engineer / Builder", "Growth Hacker"].map((agent) => (
                <div key={agent} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  {agent}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {step === 1 ? <Building2 className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-600">Step {step} of 2</p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  {step === 1 ? "Company setup" : "Confirm starter team"}
                </h2>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Company name</label>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="e.g. Northstar Labs"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">What is this business about?</label>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe the market, product, and what success looks like."
                    rows={6}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  disabled={!companyName.trim() || !description.trim()}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                action={(formData) => {
                  formData.set("companyName", companyName);
                  formData.set("description", description);
                  startTransition(async () => {
                    await completeSetupAction(formData);
                    router.push("/dashboard/agents");
                    router.refresh();
                  });
                }}
                className="space-y-6"
              >
                <div className="rounded-[28px] border border-indigo-100 bg-indigo-50/70 p-6">
                  <h3 className="text-lg font-bold text-slate-950">{companyName}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Starter team</p>
                  <div className="mt-4 grid gap-3">
                    {[
                      "CEO manages the company and can add more agents.",
                      "Research tracks customer and market signals.",
                      "Market Analysis pushes toward profitable wedges.",
                      "Engineer / Builder ships product and systems.",
                      "Growth Hacker runs acquisition and conversion work.",
                    ].map((line) => (
                      <div key={line} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPending ? "Creating company..." : "Create company and agents"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
