export const editorSettings = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'], // link and image, video
  ],
  clipboard: {
    matchVisual: false, // strange fix inserting empty paragraphs before ul
  },
};
