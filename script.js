document.getElementById('createDoc').addEventListener('click', function() {
    createDocument();
});

document.getElementById('createSheet').addEventListener('click', function() {
    createSpreadsheet();
});

document.getElementById('importFile').addEventListener('change', function(event) {
    importFile(event.target.files[0]);
});

function createDocument() {
    // Logic to create a document
    alert('Document creation initiated.');
}

function createSpreadsheet() {
    // Logic to create a spreadsheet
    alert('Spreadsheet creation initiated.');
}

function importFile(file) {
    if (!file) {
        alert('No file selected.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            // Process the content of the .sdf file
            alert('File imported successfully.');
        } catch (error) {
            console.error('Error importing file:', error);
            alert('Failed to import file.');
        }
    };
    reader.onerror = function() {
        console.error('File reading error:', reader.error);
        alert('Error reading file.');
    };
    reader.readAsText(file);
}
