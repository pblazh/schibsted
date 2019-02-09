export const equal = props => item =>
  Object.entries(props).reduce(
    (acc, [key, value]) => acc && item[key] === value,
    true
  )

export const filter = what => where => where.filter(equal(what))

export const without = what => where =>
  Object.keys(what).length ? where.filter(item => !equal(what)(item)) : where

export const replace = what => where =>
  where.map(item => (item.id === what.id ? what : item))

export const nextId = where => Math.max(-1, ...where.map(item => item.id)) + 1
