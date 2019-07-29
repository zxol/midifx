import R from 'ramda'

const generateTable = ({ ampMap, phaseMap, wCount, wsCount }) => {
  return R.times(w => {
    console.log('Wave ' + w + ' started.')
    return normalize(
      R.times(sample => {
        return R.sum(
          R.map((amp, index) => {
            return amp * fsin(phaseMap[index] + ((1.0 * sample) / wsCount) * (index + 1))
          }, ampMap[w])
        )
      }, wsCount)
    )
  }, wCount)
}
