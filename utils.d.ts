/** @internal */
type _ = any

/**
 * @internal
 * Extract from T those types that has K keys
 * ```ts
 * type A = { a: _ } | { b: _ } | { c: _ }
 *
 * type B = ExtractByKey<A, 'a' | 'b'>
 * type B = { a: _ } | { b: _ }
 * ```
 */
export type ExtractByKey<T, K extends keyof any> =
  T extends infer R
    ? K extends keyof R
      ? R
      : never
    : never

/** @internal */
export type ExtractAndRequiredByKey<T, K extends keyof any> =
  T extends infer R
    ? K extends keyof R
      ? RequiredByKey<R, K>
      : never
    : never


/** @internal */
export type RequiredByKey<T, K extends keyof T> = { [P in K]-?: T[P] } & Omit<
  T,
  K
>

/** @internal */
export type Stringable = string | number | bigint | boolean | null | undefined

/** @internal */
export type ToString<T> = T extends Stringable ? `${T}` : never

/** @internal */
export type KeyofUnion<T> = T extends infer R ? keyof R : never

/** @internal */
export type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return

/** @internal */
export type AnyObject<Keys extends keyof any = keyof any, Value = any> = { [Key in Keys]: Value }

/** @internal */
export type UnionToIntersection<U> = (U extends any ? Fn<[U]> : never) extends Fn<[infer Arg]> ? Arg : never

/** @internal */
export type UnionLast<T> = UnionToIntersection<T extends unknown ? Fn<[T]> : never> extends Fn<[infer A]> ? A : never

/** @internal */
export type ValueOf<T extends AnyObject> = T[keyof T]


/** @internal */
export type IterableType<T extends Iterable<any>> = T extends Iterable<infer R> ? R : never


/** @internal is T a union type */
export type IsUnion<T, U = T> =
  T extends U
    ? [U] extends [T]
        ? false
        : true
    : never


/** @internal */
export type Split<
  Str extends string,
  Separator extends string = '',
  Result extends string[] = []
> =
  Str extends `${infer First}${Separator}${infer Rest}`
    ? Split<Rest, Separator, [...Result, First]>
    : [...Result, ...Str extends '' ? [] : [Str]]

/** @internal */
export type UnionToTuple<U, L = UnionLast<U>> = [U] extends [never] ? [] : [L, ...UnionToTuple<Exclude<U, L>>]


// type-challenges utils 
/** @internal */
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

/** @internal */
export type Expect<T extends true> = T

/** @internal */
type IsAny<T> = 0 extends 1 & T ? true : false

/** @internal */
export type IfAny<T, TypeIfAny = true, TypeIfNotAny = false> = (
  IsAny<T> extends true ? TypeIfAny : TypeIfNotAny
)

/** @internal */
type IsNull<T> = [T] extends [null] ? true : false

/** @internal */
type IsUnknown<T> = (
  unknown extends T // `T` can be `unknown` or `any`
    ? IsNull<T> extends false // `any` can be `null`, but `unknown` can't be
      ? true
      : false
    : false
)

/** @internal */
export type IfUnknown<T, TypeIfUnknown = true, TypeIfNotUnknown = false> = (
  IsUnknown<T> extends true ? TypeIfUnknown : TypeIfNotUnknown
)


// is is possible a shortcut for Expect<Equal<X, Y>> ? ExpectEq<X, Y>
// export type ExpectEq<X, Y, N extends boolean = Equal<X, Y>, R extends true = N extends true ? true : true> = N