import R from 'ramda'

const generateLinearMap = (wCount, pCount, keyframes) => {
  return R.times(w => {
    const lps = R.last(R.filter(f => f.pos <= w, keyframes))
    const rps = R.head(R.filter(f => f.pos >= w, keyframes))
    const sLen = rps.pos - lps.pos
    const pos = (1 + (1.0 * w - lps.pos)) / (sLen + 1)
    return R.times(pIndex => {
      const la = lps.partials[pIndex]
      const ra = rps.partials[pIndex]
      return la + (ra - la) * pos
    }, pCount)
  }, wCount)
}

export default generateLinearMap
