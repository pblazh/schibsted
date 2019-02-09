import { equal, filter, without, replace, nextId } from './util'

const list = [
  { id: 0, key: 'value', common: true },
  { id: 1, key: 'XXX' },
  { id: 2, key: 'value' },
  { id: 3, key: 'value', common: true }
]

describe('equal', () => {
  it('returns true for two empty objects', () => {
    const actual = equal({})({})

    expect(actual).toBeTruthy()
  })

  it('returns true when props are empty', () => {
    const actual = equal({})({ key: 'value' })

    expect(actual).toBeTruthy()
  })

  it('returns false when props are not empty and object is empty', () => {
    const actual = equal({ key: 'value' })({})

    expect(actual).toBeFalsy()
  })

  it('returns true when an object has all key/values from props', () => {
    const actual = equal({ key: 'value' })({
      key: 'value',
      another: 'another value'
    })

    expect(actual).toBeTruthy()
  })

  it('returns true when an object has different values for props keys', () => {
    const actual = equal({ key: 'value' })({
      key: 'another value',
      another: 'another value'
    })

    expect(actual).toBeFalsy()
  })
})

describe('filter', () => {
  it('filters an empty list', () => {
    const expected = []
    const actual = filter({})([])

    expect(actual).toEqual(expected)
  })

  it('returns a full list if the filter has no keys', () => {
    const expected = list
    const actual = filter({})(list)

    expect(actual).toEqual(expected)
  })

  it('filters out list', () => {
    const expected = [{ id: 1, key: 'XXX' }]
    const actual = filter({ id: 1 })(list)

    expect(actual).toEqual(expected)
  })

  it('returns more than one item', () => {
    const expected = [
      { id: 0, key: 'value', common: true },
      { id: 2, key: 'value' },
      { id: 3, key: 'value', common: true }
    ]
    const actual = filter({ key: 'value' })(list)

    expect(actual).toEqual(expected)
  })

  it('uses multiple keys to filter', () => {
    const expected = [
      { id: 0, key: 'value', common: true },
      { id: 3, key: 'value', common: true }
    ]
    const actual = filter({ key: 'value', common: true })(list)

    expect(actual).toEqual(expected)
  })
})

describe('without', () => {
  it('filters an empty list', () => {
    const expected = []
    const actual = without({})([])

    expect(actual).toEqual(expected)
  })

  it('returns a full list if the filter has no keys', () => {
    const expected = list
    const actual = without({})(list)

    expect(actual).toEqual(expected)
  })

  it('filters out list', () => {
    const expected = [
      { id: 0, key: 'value', common: true },
      { id: 2, key: 'value' },
      { id: 3, key: 'value', common: true }
    ]

    const actual = without({ id: 1 })(list)

    expect(actual).toEqual(expected)
  })

  it('uses multiple keys to filter', () => {
    const expected = [{ id: 1, key: 'XXX' }, { id: 2, key: 'value' }]
    const actual = without({ key: 'value', common: true })(list)

    expect(actual).toEqual(expected)
  })
})

describe('replace', () => {
  it('accepts an empty list', () => {
    const expected = []
    const actual = replace({})([])

    expect(actual).toEqual(expected)
  })

  it('keeps list untouched if id is not found', () => {
    const initial = [
      { id: 0, value: 0 },
      { id: 1, value: 2 },
      { id: 2, value: 2 }
    ]
    const actual = replace({ id: 666, value: 666 })(initial)

    expect(actual).toEqual(initial)
  })

  it('replaces value with the same id', () => {
    const initial = [
      { id: 0, value: 0 },
      { id: 1, value: 6666666666 },
      { id: 2, value: 2 }
    ]
    const expected = [
      { id: 0, value: 0 },
      { id: 1, value: 1 },
      { id: 2, value: 2 }
    ]
    const actual = replace({ id: 1, value: 1 })(initial)

    expect(actual).toEqual(expected)
  })
})

describe('nexId', () => {
  it('returns 0 on empty list', () => {
    expect(nextId([])).toEqual(0)
  })
  it('returns next sequential number of id-s in a list', () => {
    const items = [{ id: 0 }, { id: 1 }]

    expect(nextId(items)).toEqual(2)
  })
  it('returns next sequential id in a sparse list', () => {
    const items = [{ id: 3 }, { id: 1 }]

    expect(nextId(items)).toEqual(4)
  })
})
