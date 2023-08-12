/* eslint-disable unicorn/prefer-query-selector */
import type { Equal, Expect } from './utils'



// Test Object.hasOwn()
{
  const objUnion = { a: 12 } as { a: number } | { b: number }

  // key on Object.prototype
  if (Object.hasOwn(objUnion, 'toString')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }

  // key of union, narrow type
  if (Object.hasOwn(objUnion, 'a')) {
    type Test = Expect<Equal<typeof objUnion, { a: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { b: number }>>
  }

  // if not key, don't narrow
  if (Object.hasOwn(objUnion, 'c')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }
}



// Test Reflect.has()
{
  const objUnion = { a: 12 } as { a: number } | { b: number }

  // if key on Object.prototype
  if (Reflect.has(objUnion, 'toString')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, never>>
  }

  // key of union
  if (Reflect.has(objUnion, 'a')) {
    type Test = Expect<Equal<typeof objUnion, { a: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { b: number }>>
  }

  // not key, do nothing
  if (Reflect.has(objUnion, 'c')) {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  } else {
    type Test = Expect<Equal<typeof objUnion, { a: number } | { b: number }>>
  }
}



// Test struredClone()
{
  {
    // Promise -> never
    const clonePromise = structuredClone(new Promise(() => { }))

    type TestCase = [
      Expect<Equal<typeof clonePromise, never>>
      // Expect<Equal<typeof cloneDeepPropmise, never>>
    ]
  }

  {
    // Function -> never
    const cloneFunction = structuredClone((a: string) => { })

    type TestCase = [
      Expect<Equal<typeof cloneFunction, never>>
    ]
  }

  {
    // Symbol -> never
    const cloneSymbol = structuredClone(Symbol(''))

    type TestCase = [
      Expect<Equal<typeof cloneSymbol, never>>
    ]
  }
}



// Test Object.entries()
{
  {
    // preserve key type,
    const objectEntries = Object.entries({ a: 12, [Symbol()]: Symbol(), 12: '33' })
    const arrayEntries = Object.entries([12, 34])

    type TestCase = [
      Expect<Equal<typeof objectEntries, ['a' | '12', number | string][]>>,
      Expect<Equal<typeof arrayEntries, [`${number}`, number][]>>
    ]
  }

  {
    // primitive types
    const entriesOfNumber = Object.entries(0)
    const entriesOfString = Object.entries('123')
    const entriesOfSymbol = Object.entries(Symbol())

    type TestCase = [
      Expect<Equal<typeof entriesOfNumber, []>>,
      Expect<Equal<typeof entriesOfString, [`${number}`, string][]>>,
      Expect<Equal<typeof entriesOfSymbol, []>>
    ]
  }
}



// Test Object.fromEntrires()
{
  {
    // preserve key type,
    type KeyType = 'a' | 'b' | 'c'
    const sameValueType = Object.fromEntries([
      ['a', 12],
      ['b', 90],
      ['c', 92]
    ])

    const diffValueType = Object.fromEntries([
      ['a', 12],
      ['b', '90'],
      ['c', Symbol()]
    ])

    type TestCase = [
      Expect<Equal<typeof sameValueType, { [k in KeyType]: number }>>,
      Expect<Equal<typeof diffValueType, { [k in KeyType]: number | string | symbol }>>
    ]
  }
}



// Test Object.keys()
{
  {
    // symbol key ignored
    const keys = Object.keys({ str: 12, 12: 99, [Symbol()]: 123 })
    type Test = Expect<Equal<typeof keys, ('str' | '12')[]>>
  }

  {
    // primitive types
    const keysOfNumber = Object.keys(0)
    const keysOfString = Object.keys('123')
    const keysOfSymbol = Object.keys(Symbol())

    type TestCase = [
      Expect<Equal<typeof keysOfNumber, []>>,
      Expect<Equal<typeof keysOfString, `${number}`[]>>,
      Expect<Equal<typeof keysOfSymbol, []>>
    ]
  }
}



// Test Object.values()
{
  {
    // symbol key value ignored
    const values = Object.values({ str: 12, 12: 99, [Symbol()]: 123 })
    type Test = Expect<Equal<typeof values, number[]>>
  }

  {
    // primitive types
    const valuesOfNumber = Object.values(0)
    const valuesOfString = Object.values('123')
    const valuesOfSymbol = Object.values(Symbol())

    type TestCase = [
      Expect<Equal<typeof valuesOfNumber, []>>,
      Expect<Equal<typeof valuesOfString, ['1', '2', '3']>>,
      Expect<Equal<typeof valuesOfSymbol, []>>
    ]
  }
}


// Test `Reflect.get`
{
  {
    const obj = { a: 12 }
    const val = Reflect.get(obj, 'a')
    type TestCase = [
      Expect<Equal<typeof val, number>>
    ]
  }
}



// Test `Object.prototype.toString`
{
  const a = {}
  const f = function () {

  }

  if (Object.prototype.toString.call(f) === '[object Function]') {
    f()
  } else {
    f()
  }

}



// Test `Array.prototype.includes`
{
  const a: ('a' | 'b')[] = []
  const c = '' as string

  if (a.includes(c)) {
    type TestCase = Expect<Equal<(typeof a)[number], typeof c>>
  } else {
    type TestCase = Expect<Equal<string, typeof c>>
  }

}



// Test document.getElementById
{
  const el = document.getElementById<HTMLDivElement>('123')

  const frag = document.createDocumentFragment()
  const gl = frag.getElementById<HTMLDivElement>('123')

  type TestCase = [
    Expect<Equal<typeof el, HTMLDivElement | null>>,
    Expect<Equal<typeof gl, HTMLDivElement | null>>
  ]
}



// Test `Array.prototype.concat`
// {
//   const a = [1, 2, 3]
//   const b = ['1', '2', '3']

//   type A = typeof a
//   type B = typeof b

//   const g = a.concat(a)
//   const c = a.concat(b, '', '123', ['123'])
//   // many types?
//   // const d = a.concat(b, [true])

//   const n = [{ a: '123', b: 123, c: true }]

//   type TestCase = [Expect<Equal<typeof g, A>>,
//     Expect<Equal<typeof c, (A[number] | B[number])[]>>
//   ]
// }



// Test `Array.isArray`
{
  const testConst = [1, 2, 3] as const
  if (Array.isArray(testConst)) {
    // presever readonly array type
    type TestCase = Expect<Equal<typeof testConst, readonly [1, 2, 3]>>
  } else {
    type TestCase = Expect<Equal<typeof testConst, never>>
  }

  const testArr = [1, 2, 3]
  if (Array.isArray(testArr)) {
    type TestCase = Expect<Equal<typeof testArr, number[]>>
  } else {
    type TestCase = Expect<Equal<typeof testArr, never>>
  }

  const testUnion1 = '123' as string | string[]
  if (Array.isArray(testUnion1)) {
    type TestCase = Expect<Equal<typeof testUnion1, string[]>>
  } else {
    type TestCase = Expect<Equal<typeof testUnion1, string>>
  }

  const testUnion2 = '123' as string | string[] | number
  if (Array.isArray(testUnion2)) {
    type TestCase = Expect<Equal<typeof testUnion2, string[]>>
  } else {
    type TestCase = Expect<Equal<typeof testUnion2, string | number>>
  }

  const testUnion3 = '123' as string | string[] | number | number[]
  if (Array.isArray(testUnion3)) {
    type TestCase = Expect<Equal<typeof testUnion3, string[] | number[]>>
  } else {
    type TestCase = Expect<Equal<typeof testUnion3, string | number>>
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const testAny = '' as any
  if (Array.isArray(testAny)) {
    // narrow any to unknown[] instead of any[]
    type TestCase = Expect<Equal<typeof testAny, unknown[]>>
  } else {
    type TestCase = Expect<Equal<typeof testAny, any>>
  }

  const testUnknown = '' as unknown
  if (Array.isArray(testUnknown)) {
    // narrow unknown to unknown[] instead of any[]
    type TestCase = Expect<Equal<typeof testUnknown, unknown[]>>
  } else {
    type TestCase = Expect<Equal<typeof testUnknown, unknown>>
  }

  const testNotArr = '' as string | number
  if (Array.isArray(testNotArr)) {
    // narrow to never if not array
    type TestCase = Expect<Equal<typeof testNotArr, never>>
  } else {
    type TestCase = Expect<Equal<typeof testNotArr, string | number>>
  }
}