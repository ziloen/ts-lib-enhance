
type NotClonable = Promise<any> | Function | Symbol


declare global {
  /**
   * Creates a [deep clone](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy) of a given value using the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).
   * @param value The object to be cloned. This can be any [structured-clonable type](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types). 
   */
  function structuredClone<T>(value: T): T extends NotClonable ? never : any



  interface Document {
    /**
     * Returns a reference to the first object with the specified value of the ID attribute.
     * @param elementId String that specifies the ID value.
     */
    getElementById<T extends HTMLElement = HTMLElement>(elementId: string): T | null
  }

  interface DocumentFragment {
    /**
     * Returns a reference to the first object with the specified value of the ID attribute.
     * @param elementId String that specifies the ID value.
     */
    getElementById<T extends HTMLElement = HTMLElement>(elementId: string): T | null
  }



  /** 
   * 
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition)
   */
  interface ViewTransition {
    /** A Promise that fulfills once the pseudo-element tree is created and the transition animation is about to start. */
    ready: Promise<void>
    /** A Promise that fulfills once the transition animation is finished, and the new page view is visible and interactive to the user. */
    finished: Promise<void>
  }

  interface Document {
    /** 
     * @param callback A callback function typically invoked to update the DOM during the view transition process, which returns a Promise. The callback is invoked once the API has taken a screenshot of the current page. When the promise returned by the callback fulfills, the view transition begins in the next frame. If the promise returned by the callback rejects, the transition is abandoned.
     */
    startViewTransition?: (callback: () => void) => ViewTransition
  }
}

export { }