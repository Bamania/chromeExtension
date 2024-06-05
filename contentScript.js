document.addEventListener('mouseup', function(event) {
  // Prevent new note creation if clicking inside an existing note
  if (event.target.closest('.note') || event.target.classList.contains('highlighted-text')) {
    return;
  }

  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const highlightSpan = document.createElement('span');
    highlightSpan.style.backgroundColor = 'yellow';
    highlightSpan.classList.add('highlighted-text');
    highlightSpan.setAttribute('data-highlight-id', Date.now());
    range.surroundContents(highlightSpan);

    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.style.position = 'absolute';
    noteDiv.style.left = `${event.pageX}px`;
    noteDiv.style.top = `${event.pageY}px`;
    noteDiv.setAttribute('data-note-id', highlightSpan.getAttribute('data-highlight-id'));

    const textarea = document.createElement('textarea');
    textarea.rows = 5;
    textarea.placeholder = 'Enter your note here...';

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Note / Highlight';
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
          // Extract the original text content from the highlight span
          const parentNode = highlightSpan.parentNode;
          while (highlightSpan.firstChild) {
            parentNode.insertBefore(highlightSpan.firstChild, highlightSpan);
          }
          highlightSpan.remove(); // Remove the highlight span
          noteDiv.remove(); // Remove the noteDiv
        });

        const hideButton = document.createElement('button');
        hideButton.innerText = 'Hide Note';
        hideButton.addEventListener('click', () => {
          noteDiv.style.display = 'none';
        });

        noteDiv.appendChild(deleteButton);
        noteDiv.appendChild(hideButton);

        highlightSpan.addEventListener('mouseenter', () => {
          noteDiv.style.display = 'block';
        });

        highlightSpan.addEventListener('mouseleave', (event) => {
          if (!noteDiv.contains(event.relatedTarget)) {
            noteDiv.style.display = 'none';
          }
        });

        noteDiv.addEventListener('mouseenter', () => {
          noteDiv.style.display = 'block';
        });

        noteDiv.addEventListener('mouseleave', (event) => {
          if (!highlightSpan.contains(event.relatedTarget)) {
            noteDiv.style.display = 'none';
          }
        });

        document.body.appendChild(noteDiv);
        saveHighlightsAndNotes();
      } else {
        // Only apply the highlight without adding a note
        noteDiv.remove();
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

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.addEventListener('change', (event) => {
      const color = event.target.value;
      highlightSpan.style.backgroundColor = color;
    });

    noteDiv.appendChild(colorPicker);
    noteDiv.appendChild(textarea);
    noteDiv.appendChild(saveButton);
    noteDiv.appendChild(cancelButton);
    document.body.appendChild(noteDiv);

    // Ensure the note is displayed immediately after creation
    noteDiv.style.display = 'block';
  }
});

function saveHighlightsAndNotes() {
  // Implement your save functionality here
}
