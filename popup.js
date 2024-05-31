document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['selectedText', 'position'], (result) => {
      if (result.selectedText) {
        const textElement = document.getElementById('text');
        textElement.innerText = result.selectedText;
        
        const highlightButton = document.createElement('button');
        highlightButton.innerText = 'Highlight';
        highlightButton.addEventListener('click', () => {
          textElement.classList.add('highlight');
        });
  
        const addNoteButton = document.createElement('button');
        addNoteButton.innerText = 'Add Note';
        addNoteButton.addEventListener('click', () => {
          const noteDiv = document.createElement('div');
          noteDiv.classList.add('note');
          noteDiv.style.left = `${result.position.x}px`;
          noteDiv.style.top = `${result.position.y}px`;
  
          const textarea = document.createElement('textarea');
          noteDiv.appendChild(textarea);
  
          const saveButton = document.createElement('button');
          saveButton.innerText = 'Save Note';
          saveButton.addEventListener('click', () => {
            const noteText = textarea.value.trim();
            if (noteText) {
              const noteContent = document.createElement('div');
              noteContent.innerText = noteText;
              noteDiv.innerHTML = '';  // Clear the previous contents
              noteDiv.appendChild(noteContent);
            }
          });
          noteDiv.appendChild(saveButton);
  
          document.getElementById('notes').appendChild(noteDiv);
        });
  
        textElement.appendChild(highlightButton);
        textElement.appendChild(addNoteButton);
      }
    });
  });
  