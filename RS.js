document.addEventListener("DOMContentLoaded", function () {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const templateSelect = document.getElementById('templateSelect');
    const previewContent = document.getElementById('previewContent');
    const downloadButton = document.getElementById('downloadButton');

    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    templateSelect.addEventListener('change', updatePreview);

    downloadButton.addEventListener('click', downloadResume);

    function updatePreview() {
        const selectedTemplate = templateSelect.value;
        let previewHTML = `<h2>Preview (${selectedTemplate})</h2>`;

        // Simulate content based on selected template and form inputs
        if (selectedTemplate === 'template1') {
            formInputs.forEach(input => {
                const label = input.previousElementSibling.innerText;
                const value = input.value.trim();

                if (value !== '') {
                    previewHTML += `<p><strong>${label}:</strong> ${value}</p>`;
                }
            });
        } else if (selectedTemplate === 'template2') {
            const name = document.getElementById('name').value.trim();
            const education = document.getElementById('education').value.trim();
            const experience = document.getElementById('experience').value.trim();
            const skills = document.getElementById('skills').value.trim();

            if (name !== '' || education !== '' || experience !== '' || skills !== '') {
                previewHTML += '<div class="template2-preview">';
                if (name !== '') {
                    previewHTML += `<h3>${name}</h3>`;
                }
                if (education !== '') {
                    previewHTML += `<p><strong>Education:</strong> ${education}</p>`;
                }
                if (experience !== '') {
                    previewHTML += `<p><strong>Work Experience:</strong> ${experience}</p>`;
                }
                if (skills !== '') {
                    previewHTML += `<p><strong>Skills:</strong> ${skills}</p>`;
                }
                previewHTML += '</div>';
            }
        }

        previewContent.innerHTML = previewHTML;
    }

    function downloadResume() {
        const selectedTemplate = templateSelect.value;
        const previewText = previewContent.innerText;

        // Simulate file download (replace with actual file generation logic)
        const blob = new Blob([`Resume Content (${selectedTemplate}):\n\n${previewText}`], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.txt';
        link.click();
    }
});
