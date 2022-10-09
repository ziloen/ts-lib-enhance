type _ = any

/**
 * Extract from T those types that has K keys
 * ```ts
 * type A = { a: _ } | { b: _ } | { c: _ }
 *
 * type B = ExtractByKey<A, 'a' | 'b'>
 * type B = { a: _ } | { b: _ }
 * ```
 */
export type ExtractByKeys<T, K extends keyof any> =
  T extends infer R
  ? K extends keyof R
  ? R
  : never
  : never

export type KeyofUnion<T> = T extends infer R ? keyof R : never

export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return

export type UnionToIntersection<U> = (U extends any ? Fn<[U]> : never) extends Fn<[infer Arg]> ? Arg : never

export type UnionLast<T> = UnionToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never

/** is T a union type */
export type IsUnion<T, U = T> =
  T extends U
  ? [U] extends [T]
  ? false
  : true
  : never

export type UnionToTuple<U, L = UnionLast<U>> = [U] extends [never] ? [] : [L, ...UnionToTuple<Exclude<U, L>>]


// type-challenges utils 
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

export type Expect<T extends true> = T