/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType)
 *
 * InputEvent.inputType
 *
 * [spec](https://rawgit.com/w3c/input-events/v1/index.html#dfn-inputtype-values)
 */
export type InputEventInputType =
  | 'insertText'
  | 'insertReplacementText'
  | 'insertLineBreak'
  | 'insertParagraph'
  | 'insertOrderedList'
  | 'insertUnorderedList'
  | 'insertHorizontalRule'
  | 'insertFromYank'
  | 'insertFromDrop'
  | 'insertFromPaste'
  | 'insertFromPasteAsQuotation'
  | 'insertTranspose'
  | 'insertCompositionText'
  | 'insertLink'
  | 'deleteWordBackward'
  | 'deleteWordForward'
  | 'deleteSoftLineBackward'
  | 'deleteSoftLineForward'
  | 'deleteEntireSoftLine'
  | 'deleteHardLineBackward'
  | 'deleteHardLineForward'
  | 'deleteByDrag'
  | 'deleteByCut'
  | 'deleteContent'
  | 'deleteContentBackward'
  | 'deleteContentForward'
  | 'historyUndo'
  | 'historyRedo'
  | 'formatBold'
  | 'formatItalic'
  | 'formatUnderline'
  | 'formatStrikeThrough'
  | 'formatSuperscript'
  | 'formatSubscript'
  | 'formatJustifyFull'
  | 'formatJustifyCenter'
  | 'formatJustifyRight'
  | 'formatJustifyLeft'
  | 'formatIndent'
  | 'formatOutdent'
  | 'formatRemove'
  | 'formatSetBlockTextDirection'
  | 'formatSetInlineTextDirection'
  | 'formatBackColor'
  | 'formatFontColor'
  | 'formatFontName'
