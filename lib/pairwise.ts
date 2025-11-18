import type { Factor } from '@/app/page'

export function generatePairwiseTestCases(
  factors: Factor[]
): { [key: string]: string }[] {
  if (factors.length === 0) return []

  // シンプルなペアワイズアルゴリズム実装
  // 全ての因子のペアについて、全ての水準の組み合わせをカバーする
  
  const testCases: { [key: string]: string }[] = []
  const factorNames = factors.map((f) => f.name)
  
  // 最初の因子の各水準について基本的なテストケースを作成
  const baseFactorLevels = factors[0].levels
  
  for (const level of baseFactorLevels) {
    const testCase: { [key: string]: string } = {}
    testCase[factors[0].name] = level
    
    // 他の因子については、まだカバーされていない組み合わせを選択
    for (let i = 1; i < factors.length; i++) {
      const availableLevels = factors[i].levels
      testCase[factors[i].name] = availableLevels[0]
    }
    
    testCases.push(testCase)
  }
  
  // 全てのペアの組み合わせをカバーするための追加テストケース
  for (let i = 0; i < factors.length; i++) {
    for (let j = i + 1; j < factors.length; j++) {
      const factor1 = factors[i]
      const factor2 = factors[j]
      
      // このペアの全ての組み合わせ
      for (const level1 of factor1.levels) {
        for (const level2 of factor2.levels) {
          // この組み合わせが既存のテストケースでカバーされているかチェック
          const covered = testCases.some(
            (tc) =>
              tc[factor1.name] === level1 && tc[factor2.name] === level2
          )
          
          if (!covered) {
            // 新しいテストケースを作成
            const newTestCase: { [key: string]: string } = {}
            
            for (const factor of factors) {
              if (factor.id === factor1.id) {
                newTestCase[factor.name] = level1
              } else if (factor.id === factor2.id) {
                newTestCase[factor.name] = level2
              } else {
                // 他の因子は最初の水準を使用
                newTestCase[factor.name] = factor.levels[0]
              }
            }
            
            testCases.push(newTestCase)
          }
        }
      }
    }
  }
  
  return testCases
}
