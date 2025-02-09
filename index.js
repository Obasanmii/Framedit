// Initialize the jsPDF library
const { jsPDF } = window.jspdf;
        
// Toggle edit mode
function toggleEdit() {
    const iframe = document.getElementById('editorFrame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.designMode = iframeDoc.designMode === 'on' ? 'off' : 'on';
}

// Save content to localStorage
function saveContent() {
    const iframe = document.getElementById('editorFrame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    localStorage.setItem('savedContent', iframeDoc.documentElement.innerHTML);
    alert('Content saved!');
}

// Load saved content on page load
window.onload = function() {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
        const iframe = document.getElementById('editorFrame');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(savedContent);
        iframeDoc.close();
    }
};

// Export to PDF
async function exportPDF() {
    const iframe = document.getElementById('editorFrame');
    const iframeBody = iframe.contentDocument.body;
    
    html2canvas(iframeBody).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('exported-content.pdf');
    });
}

// Export to JPG
function exportJPG() {
    const iframe = document.getElementById('editorFrame');
    const iframeBody = iframe.contentDocument.body;
    
    html2canvas(iframeBody).then(canvas => {
        const link = document.createElement('a');
        link.download = 'exported-content.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    });
}
