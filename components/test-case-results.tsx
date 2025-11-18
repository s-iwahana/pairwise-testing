'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, RotateCcw } from 'lucide-react'
import type { Factor } from '@/app/page'

type TestCaseResultsProps = {
  testCases: { [key: string]: string }[]
  factors: Factor[]
  onReset: () => void
}

export function TestCaseResults({
  testCases,
  factors,
  onReset,
}: TestCaseResultsProps) {
  const downloadCSV = () => {
    const headers = ['#', ...factors.map((f) => f.name)]
    const rows = testCases.map((tc, index) => [
      String(index + 1),
      ...factors.map((f) => tc[f.name] || ''),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'pairwise-testcases.csv'
    link.click()
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-2 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              テストケース生成結果
            </h2>
            <p className="text-muted-foreground">
              生成されたテストケース: <span className="font-bold text-primary text-lg">{testCases.length}</span> 件
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={downloadCSV}
              variant="outline"
              className="gap-2 border-2"
            >
              <Download className="w-4 h-4" />
              CSVダウンロード
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="gap-2 border-2"
            >
              <RotateCcw className="w-4 h-4" />
              戻る
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border-2">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
                <th className="px-4 py-3 text-left font-bold text-foreground border-b-2 border-r-2">
                  #
                </th>
                {factors.map((factor, index) => (
                  <th
                    key={factor.id}
                    className="px-4 py-3 text-left font-bold text-foreground border-b-2 border-r-2 last:border-r-0"
                  >
                    {factor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testCases.map((testCase, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-muted/50 transition-colors border-b last:border-b-0"
                >
                  <td className="px-4 py-3 font-semibold text-muted-foreground border-r-2">
                    {rowIndex + 1}
                  </td>
                  {factors.map((factor, colIndex) => (
                    <td
                      key={factor.id}
                      className="px-4 py-3 border-r-2 last:border-r-0"
                    >
                      <span className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-foreground font-medium">
                        {testCase[factor.name]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
