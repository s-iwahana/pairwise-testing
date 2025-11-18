'use client'

import { useState } from 'react'
import { FactorInput } from '@/components/factor-input'
import { TestCaseResults } from '@/components/test-case-results'
import { generatePairwiseTestCases } from '@/lib/pairwise'

export type Factor = {
  id: string
  name: string
  levels: string[]
}

export default function PairwiseTestCaseTool() {
  const [factors, setFactors] = useState<Factor[]>([
    { id: '1', name: 'ブラウザ', levels: ['Chrome', 'Safari', 'FireFox', 'Edge'] },
    { id: '2', name: 'OS', levels: ['Windows', 'macOS', 'iOS', 'Android'] },
  ])
  const [testCases, setTestCases] = useState<{ [key: string]: string }[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleGenerate = () => {
    const cases = generatePairwiseTestCases(factors)
    setTestCases(cases)
    setShowResults(true)
  }

  const handleReset = () => {
    setShowResults(false)
    setTestCases([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧪</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                ペアワイズ法テストケース生成ツール
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mt-1">
                因子と水準を入力して、効率的なテストケースを自動生成
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!showResults ? (
          <FactorInput
            factors={factors}
            setFactors={setFactors}
            onGenerate={handleGenerate}
          />
        ) : (
          <TestCaseResults
            testCases={testCases}
            factors={factors}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}
