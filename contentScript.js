document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Create a highlight element
    const range = window.getSelection().getRangeAt(0);
    const highlightSpan = document.createElement('span');
    highlightSpan.style.backgroundColor = 'yellow';
    highlightSpan.classList.add('highlighted-text');
    range.surroundContents(highlightSpan);
    
    // Create a note element
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.style.position = 'absolute';
    noteDiv.style.left = `${event.pageX}px`;
    noteDiv.style.top = `${event.pageY}px`;

    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    textarea.placeholder = 'Enter your note here...';

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Note';
    saveButton.addEventListener('click', () => {
      const noteText = textarea.value.trim();
      if (noteText) {
        const noteContent = document.createElement('div');
        noteContent.innerText = noteText;
        noteDiv.innerHTML = '';
        noteDiv.appendChild(noteContent);
        noteDiv.classList.add('saved-note');

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Note';
        deleteButton.addEventListener('click', () => {
          // Remove the highlight element
          const highlightElement = document.querySelector('.highlighted-text');
          if (highlightElement) {
            const range = document.createRange();
            range.selectNodeContents(highlightElement);
            const contents = range.extractContents();
            highlightElement.remove();
            range.insertNode(contents);
          }
          noteDiv.remove();
          event.stopPropagation(); // Prevents event bubbling to the highlight element
        });
        noteDiv.appendChild(deleteButton);
      }
    });

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', () => {
      noteDiv.remove();
      // Remove the highlight element after creating the noteDiv
      const highlightElement = document.querySelector('.highlighted-text');
      if (highlightElement) {
        const range = document.createRange();
        range.selectNodeContents(highlightElement);
        const contents = range.extractContents();
        highlightElement.remove();
        range.insertNode(contents);
      }
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(saveButton);
    noteDiv.appendChild(cancelButton);
    document.body.appendChild(noteDiv);

    // Show note box when hovering over the highlighted text
    highlightSpan.addEventListener('mouseenter', () => {
      noteDiv.style.display = 'block';
    });

    // Hide note box when leaving the highlighted text
    highlightSpan.addEventListener('mouseleave', () => {
      noteDiv.style.display = 'none';
    });
  }
});
