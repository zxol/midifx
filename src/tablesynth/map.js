import { times, head, last, filter, always } from 'ramda'

export const generateLinearMap = (wCount, pCount, keyframes) => {
  return times(w => {
    const lps = last(filter(f => f.pos <= w, keyframes))
    const rps = head(filter(f => f.pos >= w, keyframes))
    const sLen = rps.pos - lps.pos
    const pos = (1 + (1.0 * w - lps.pos)) / (sLen + 1)
    return times(pIndex => {
      const la = lps.partials[pIndex]
      const ra = rps.partials[pIndex]
      return la + (ra - la) * pos
    }, pCount)
  }, wCount)
}

export const generateZeroMap = (wCount, pCount) => {
  return times(always(times(always(0), pCount)), wCount)
}

export default generateLinearMap
