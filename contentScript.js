document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Create a highlight element
    const range = window.getSelection().getRangeAt(0);
    const highlightSpan = document.createElement('span');
    highlightSpan.style.backgroundColor = 'yellow';
    const uniqueId = `highlight-${Date.now()}`;
    highlightSpan.setAttribute('data-highlight-id', uniqueId);
    range.surroundContents(highlightSpan);

    // Create a note element
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.style.position = 'absolute';
    noteDiv.style.left = `${event.pageX}px`;
    noteDiv.style.top = `${event.pageY}px`;
    noteDiv.setAttribute('data-note-id', uniqueId);

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
          const highlightElement = document.querySelector(`[data-highlight-id="${uniqueId}"]`);
          if (highlightElement) {
            const range = document.createRange();
            range.selectNodeContents(highlightElement);
            const contents = range.extractContents();
            highlightElement.remove();
            range.insertNode(contents);
          }
          noteDiv.remove();
        });

        const hideButton = document.createElement('button');
        hideButton.innerText = 'Hide Note';
        hideButton.addEventListener('click', () => {
          noteDiv.style.display = 'none';
        });

        noteDiv.appendChild(deleteButton);
        noteDiv.appendChild(hideButton);
      }
    });

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', () => {
      noteDiv.remove();
      const highlightElement = document.querySelector(`[data-highlight-id="${uniqueId}"]`);
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

    highlightSpan.addEventListener('mouseenter', () => {
      noteDiv.style.display = 'block';
    });

    noteDiv.addEventListener('mouseenter', () => {
      noteDiv.style.display = 'block';
    });

    noteDiv.addEventListener('mouseleave', () => {
      noteDiv.style.display = 'none';
    });

    highlightSpan.addEventListener('mouseleave', () => {
      noteDiv.style.display = 'none';
    });
  }
});
