export interface ICounterProps {
  maxValue: number
  count: number
  setCount: (arg: number) => void
  productId: string
  setActiveCount?: (arg: boolean) => void
}
