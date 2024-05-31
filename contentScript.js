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
          noteDiv.remove();
          highlightSpan.remove();
        });
        noteDiv.appendChild(deleteButton);
      }
    });

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', () => {
      noteDiv.remove();
      const range = document.createRange();
      range.selectNodeContents(highlightSpan);
      const contents = range.extractContents();
      highlightSpan.remove();
      range.insertNode(contents);
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(saveButton);
    noteDiv.appendChild(cancelButton);
    document.body.appendChild(noteDiv);
  }
});