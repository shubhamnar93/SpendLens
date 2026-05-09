"use client"

import { useEffect, useMemo, useState } from 'react'
import { runAudit } from '@/server/audit-engine/engine'
import { auditKnowledge } from '@/server/audit-engine/knowledge/dataset'
import type { AuditInput, AuditResult } from '@/server/audit-engine/types'

const STORAGE_KEY = 'spendlens-audit-form'
const usageLevels = ['low', 'medium', 'high'] as const
const primaryUseCases = ['coding', 'writing', 'research', 'mixed', 'data'] as const

const defaultForm: AuditInput = {
  toolName: 'Copilot',
  vendor: 'GitHub',
  planName: 'Pro',
  currentSpend: 10,
  usageLevel: 'medium',
  teamSize: 5,
  primaryUseCase: 'coding',
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

export function AuditForm() {
  const [form, setForm] = useState<AuditInput>(defaultForm)
  const [result, setResult] = useState<AuditResult | null>(null)

  const toolNames = useMemo(
    () => Array.from(new Set(auditKnowledge.map((entry) => entry.toolName))).sort(),
    [],
  )

  const vendors = useMemo(
    () => Array.from(new Set(auditKnowledge.map((entry) => entry.vendor))).sort(),
    [],
  )

  const planNames = useMemo(() => {
    const plans = auditKnowledge.filter(
      (entry) =>
        normalize(entry.toolName) === normalize(form.toolName) &&
        normalize(entry.vendor) === normalize(form.vendor),
    )
    return plans.length > 0
      ? Array.from(new Set(plans.map((entry) => entry.planName))).sort()
      : Array.from(new Set(auditKnowledge.map((entry) => entry.planName))).sort()
  }, [form.toolName, form.vendor])

  useEffect(() => {
    const plansForSelection = auditKnowledge.filter(
      (entry) =>
        normalize(entry.toolName) === normalize(form.toolName) &&
        normalize(entry.vendor) === normalize(form.vendor),
    )

    if (
      plansForSelection.length > 0 &&
      !plansForSelection.some((entry) => entry.planName === form.planName)
    ) {
      setForm((current) => ({ ...current, planName: plansForSelection[0].planName }))
    }
  }, [form.toolName, form.vendor, form.planName])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuditInput
        setForm({ ...defaultForm, ...parsed })
      } catch {
        setForm(defaultForm)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
  }, [form])

  useEffect(() => {
    setResult(runAudit(form))
  }, [form])

  function updateField<Key extends keyof AuditInput>(key: Key, value: AuditInput[Key]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">AI Spend Audit</h1>
        <p className="mt-3 max-w-2xl text-slate-700">
          Enter your current AI tool subscription and usage details below to run a live audit using the static audit engine.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tool Name</label>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
              value={form.toolName}
              onChange={(event) => updateField('toolName', event.target.value)}
            >
              {toolNames.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor</label>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
              value={form.vendor}
              onChange={(event) => updateField('vendor', event.target.value)}
            >
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Plan Name</label>
            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
              value={form.planName}
              onChange={(event) => updateField('planName', event.target.value)}
            >
              {planNames.map((planName) => (
                <option key={planName} value={planName}>
                  {planName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Monthly Spend</label>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                type="number"
                step="0.01"
                min="0"
                value={form.currentSpend}
                onChange={(event) => updateField('currentSpend', Number(event.target.value))}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Team Size</label>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                type="number"
                min="1"
                value={form.teamSize ?? ''}
              onChange={(event) => updateField('teamSize', Number(event.target.value) || 0)}
            ></input>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Usage Level</label>
              <select
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                value={form.usageLevel}
                onChange={(event) => updateField('usageLevel', event.target.value as AuditInput['usageLevel'])}
              >
                {usageLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Primary Use Case</label>
              <select
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                value={form.primaryUseCase ?? 'mixed'}
                onChange={(event) => updateField('primaryUseCase', event.target.value as AuditInput['primaryUseCase'])}
              >
                {primaryUseCases.map((useCase) => (
                  <option key={useCase} value={useCase}>
                    {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            Form state is persisted locally in your browser. Reload the page to continue from the last saved values.
          </div>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Audit summary</h2>
            <p className="mt-3 text-slate-700">
              This preview updates automatically as you edit the form. It uses the static audit engine dataset and recommendation rules from the repository.
            </p>
          </div>

          {result && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Current results</h3>
              <dl className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span>Monthly savings</span>
                  <strong>${result.totalMonthlySavings.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span>Annual savings</span>
                  <strong>${result.totalAnnualSavings.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span>Spend per developer</span>
                  <strong>{result.benchmark.spendPerDeveloper ?? 'N/A'}</strong>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 text-slate-800">
                  {result.benchmark.verdict}
                </div>
              </dl>

              {result.totalMonthlySavings >= 500 && (
                <div className="mt-5 rounded-3xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                  High-value lead: projected savings exceed $500/month. Offer a consultation or follow-up for this customer.
                </div>
              )}
            </div>
          )}
        </aside>
      </section>

      {result && (
        <section className="mt-10 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Audit recommendations</h2>
            <div className="mt-5 space-y-4">
              {result.recommendations.length === 0 ? (
                <div className="rounded-3xl bg-slate-50 p-6 text-slate-700">
                  No recommendations were generated. Try another plan, vendor, or spend amount.
                </div>
              ) : (
                result.recommendations.map((recommendation, index) => (
                  <div key={`${recommendation.planName}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{recommendation.vendor}</p>
                        <h3 className="text-xl font-semibold text-slate-900">{recommendation.toolName} — {recommendation.planName}</h3>
                      </div>
                      <div className="text-right text-slate-700">
                        <div className="text-sm">Savings</div>
                        <div className="text-2xl font-semibold text-slate-900">${recommendation.savings.toFixed(2)}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-700">{recommendation.action}</p>
                    <p className="mt-2 text-sm text-slate-600">{recommendation.reason}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                        <div className="text-slate-500">Current spend</div>
                        <div className="mt-2 font-semibold text-slate-900">${recommendation.currentSpend.toFixed(2)}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                        <div className="text-slate-500">New spend</div>
                        <div className="mt-2 font-semibold text-slate-900">${recommendation.newSpend.toFixed(2)}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 text-sm text-slate-600 shadow-sm">
                        <div className="text-slate-500">Category</div>
                        <div className="mt-2 font-semibold text-slate-900">{recommendation.category}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Audit insights</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {result.insights.map((insight, index) => (
                <li key={`${insight}-${index}`}>{insight}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}
