// Button hooks
document.getElementById('createDoc').addEventListener('click', () => {
  createDocument();
});

document.getElementById('createSheet').addEventListener('click', () => {
  createSpreadsheet();
});

document.getElementById('importFile').addEventListener('change', (event) => {
  importFile(event.target.files[0]);
});

document.getElementById('saveTxt').addEventListener('click', () => {
  const name = getFilenameOr('document.txt');
  const content = getEditor();
  downloadText(name.endsWith('.txt') ? name : ensureExt(name, '.txt'), content, 'text/plain');
});

document.getElementById('saveCsv').addEventListener('click', () => {
  const name = getFilenameOr('sheet.csv');
  const content = getEditor();
  downloadText(name.endsWith('.csv') ? name : ensureExt(name, '.csv'), content, 'text/csv');
});

document.getElementById('downloadSdf').addEventListener('click', () => {
  const name = getFilenameOr('document.sdf');
  const content = getEditor();
  // .sdf treated as a custom text-based format here
  downloadText(name.endsWith('.sdf') ? name : ensureExt(name, '.sdf'), content, 'text/plain');
});

// Helpers
function getEditor() {
  return document.getElementById('editor').value || '';
}

function setEditor(text) {
  document.getElementById('editor').value = text;
}

function getFilenameOr(fallback) {
  const v = (document.getElementById('filename').value || '').trim();
  return v || fallback;
}

function ensureExt(name, ext) {
  return name.toLowerCase().endsWith(ext) ? name : (name + ext);
}

function downloadText(filename, content, mime) {
  try {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Download failed', e);
    alert('Failed to save file.');
  }
}

// Core actions
function createDocument() {
  setEditor('New document\\n\\nStart typing...');
  const fn = document.getElementById('filename');
  if (!fn.value) fn.value = 'document.txt';
}

function createSpreadsheet() {
  setEditor('Item,Qty,Price\\nApples,10,3.49\\nBananas,6,1.29');
  const fn = document.getElementById('filename');
  if (!fn.value) fn.value = 'sheet.csv';
}

function importFile(file) {
  if (!file) {
    alert('No file selected.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      setEditor(content);
      if (!document.getElementById('filename').value) {
        document.getElementById('filename').value = file.name;
      }
      alert('File imported successfully.');
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Failed to import file.');
    }
  };
  reader.onerror = () => {
    console.error('File reading error:', reader.error);
    alert('Error reading file.');
  };
  reader.readAsText(file);
}
