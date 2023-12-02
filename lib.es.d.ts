import type { IfAny, IfUnknown, Split } from 'type-fest'
import type {
  AnyObject,
  ExtractAndRequiredByKey,
  ExtractByKey,
  IterableType,
  KeyofUnion,
  ToString,
} from './utils'

type ToStringTag =
  | '[object Array]'
  | '[object BigInt]'
  | '[object Boolean]'
  | '[object Function]'
  | '[object Null]'
  | '[object Number]'
  | '[object Object]'
  | '[object String]'
  | '[object Undefined]'
  | (string & Record<never, never>)
// | "[object Date]"
// | "[object ArrayBuffer]"
// | "[object URL]" 

declare global {
  interface ObjectConstructor {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn<T extends Record<keyof any, any>, K extends keyof any>(
      o: T,
      v: K
      // @ts-expect-error FIXME: predicate type error but works
    ): o is K extends KeyofUnion<T> ? ExtractAndRequiredByKey<T, K> : T & { [P in K]: unknown }


    /**
     * Returns an empty array
     * @param o number or symbol
     */
    entries(o: number | symbol | bigint): []

    /**
     * Returns an array of index/substring of the string
     * @param s string
     */
    entries(s: string): [`${number}`, string][]

    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<T, O extends { [k: string]: T }, K extends string = ToString<keyof O>>(o: O): [K, O[K]][]

    /**
     * Returns an array of key/values of the enumerable properties of an object
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    entries<A extends ArrayLike<any>>(o: A): [`${number}`, A[number]][]



    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries<K extends PropertyKey, I extends Iterable<readonly [K, any]>, T extends IterableType<I> = IterableType<I>>(entries: I): { [Key in T[0]]: IterableType<I>[1] }



    /**
     * Returns the names of the enumerable string properties and methods of an object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    keys<T extends AnyObject>(o: T): ToString<keyof T>[]

    /**
     * Returns an empty array
     * @param o number or symbol
     */
    keys(o: number | symbol | bigint): []

    /**
     * Returns index string array
     * @param s string
     */
    keys(s: string): `${number}`[]



    /**
     * Returns an empty array
     * @param o number or symbol or bigint
     */
    values(o: number | symbol | bigint): []

    /**
     * Returns an array of string split
     * @param s string
     */
    values<T extends string>(s: T): Split<T, ''>
  }

  namespace Reflect {
    // `Reflect.has` will check prototype chain
    // Object.create(null) has no prototype
    /** 
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends AnyObject, K extends keyof globalThis.Object>(target: T, propertyKey: K): target is T

    /**
     * Equivalent to `propertyKey in target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey Name of the property.
     */
    function has<T extends AnyObject, K extends KeyofUnion<T>>(target: T, propertyKey: K): target is ExtractByKey<T, K>



    /**
     * Gets the property of target, equivalent to `target[propertyKey]` when `receiver === target`.
     * @param target Object that contains the property on itself or in its prototype chain.
     * @param propertyKey The property name.
     * @param receiver The reference to use as the `this` value in the getter function,
     *        if `target[propertyKey]` is an accessor property.
     */
    function get<T extends object, K extends keyof T>(target: T, propertyKey: K, receiver?: any): T[K]
  }



  interface Object {
    /** Returns a string representation of an object. */
    toString(): ToStringTag
  }



  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     */
    includes(searchElement: T): searchElement is T
    includes(searchElement: any): searchElement is T

    /**
     * Combines two or more arrays.
     * This method returns a new array without modifying any existing arrays.
     * @param items Additional arrays and/or items to add to the end of the array.
     */
    // concat(...items: (T)[]): T[]
    // /** ggg */
    // concat<K>(...items: (K | K[])[]): (T | K)[]
  }



  interface ArrayConstructor {
    // @ts-expect-error FIXME: predicate type error but works
    isArray<T>(arg: T): arg is IfAny<
      T,
      unknown[],
      IfUnknown<
        T,
        unknown[],
        T extends readonly any[]
          ? readonly any[]
          : T extends any[]
            ? any[]
            : never
      >
    >
  }
}