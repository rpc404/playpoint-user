export const formatNumber = (d) => {
    const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
    return d > 1000 ? formatter.format(d) : d;
  }