'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, X, Sparkles } from 'lucide-react'
import type { Factor } from '@/app/page'

type FactorInputProps = {
  factors: Factor[]
  setFactors: (factors: Factor[]) => void
  onGenerate: () => void
}

export function FactorInput({ factors, setFactors, onGenerate }: FactorInputProps) {
  const addFactor = () => {
    const newId = String(Date.now())
    setFactors([...factors, { id: newId, name: '', levels: [''] }])
  }

  const removeFactor = (id: string) => {
    setFactors(factors.filter((f) => f.id !== id))
  }

  const updateFactorName = (id: string, name: string) => {
    setFactors(
      factors.map((f) => (f.id === id ? { ...f, name } : f))
    )
  }

  const addLevel = (factorId: string) => {
    setFactors(
      factors.map((f) =>
        f.id === factorId ? { ...f, levels: [...f.levels, ''] } : f
      )
    )
  }

  const removeLevel = (factorId: string, levelIndex: number) => {
    setFactors(
      factors.map((f) =>
        f.id === factorId
          ? { ...f, levels: f.levels.filter((_, i) => i !== levelIndex) }
          : f
      )
    )
  }

  const updateLevel = (factorId: string, levelIndex: number, value: string) => {
    setFactors(
      factors.map((f) =>
        f.id === factorId
          ? {
              ...f,
              levels: f.levels.map((l, i) => (i === levelIndex ? value : l)),
            }
          : f
      )
    )
  }

  const canGenerate = factors.every(
    (f) => f.name.trim() && f.levels.length >= 2 && f.levels.every((l) => l.trim())
  )

  return (
    <div className="space-y-6">
      <Card className="p-6 border-2 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            因子（パラメータ名）と 水準（値）を入力
          </h2>
          <Button
            onClick={addFactor}
            size="sm"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Plus className="w-4 h-4" />
            因子を追加
          </Button>
        </div>

        <div className="space-y-6">
          {factors.map((factor, factorIndex) => (
            <Card
              key={factor.id}
              className="p-5 bg-gradient-to-br from-card to-muted/30 border-2 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold shadow-md">
                  {factorIndex + 1}
                </div>
                
                <div className="flex-1 space-y-4">
                  {/* Factor Name */}
                  <div className="flex items-center gap-3">
                    <Input
                      value={factor.name}
                      onChange={(e) => updateFactorName(factor.id, e.target.value)}
                      placeholder="因子名（例: ブラウザ）"
                      className="flex-1 text-lg font-semibold border-2"
                    />
                    {factors.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFactor(factor.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                  </div>

                  {/* Levels */}
                  <div className="pl-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {factor.levels.map((level, levelIndex) => (
                        <div
                          key={levelIndex}
                          className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border-2 hover:border-accent/50 transition-colors"
                        >
                          <Input
                            value={level}
                            onChange={(e) =>
                              updateLevel(factor.id, levelIndex, e.target.value)
                            }
                            placeholder={`水準${levelIndex + 1}`}
                            className="w-32 h-8 text-sm border-0 bg-transparent focus-visible:ring-0 px-0"
                          />
                          {factor.levels.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeLevel(factor.id, levelIndex)}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLevel(factor.id)}
                        className="h-10 gap-1 border-2 border-dashed hover:border-accent hover:bg-accent/10"
                      >
                        <Plus className="w-3 h-3" />
                        追加
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          size="lg"
          className="gap-3 text-lg px-8 py-6 bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          テストケースを生成
        </Button>
      </div>
    </div>
  )
}
