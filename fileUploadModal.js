var cropper;
var cropperMap = new Map();
var actualInput;
var cropperContainer;
var cropperContainerPreview;
var uploadedFileName;
var cropButton;
var cropAgainButton;
var pdfPreview;
var pdfPreviewEmbed;
var fileSelected;
var saveButton;

function uploadFile(tempInput)
{
    actualInput = document.querySelector(`input[name="${tempInput.id}"]`);

    let file = tempInput.files[0];

    if(file && file.type === 'application/pdf')
    {
        let reader = new FileReader();
        reader.onload = function(e) {
            let arrayBuffer = e.target.result;
            let pdfUrl = URL.createObjectURL(new Blob([arrayBuffer], {type: 'application/pdf'}));
            pdfPreview = document.getElementById(`pdfPreview_${tempInput.id}`);
            pdfPreviewEmbed = document.getElementById(`pdfPreviewEmbed_${tempInput.id}`);
            uploadedFileName = document.getElementById(`uploadedFileName_${tempInput.id}`);
            pdfPreviewEmbed.src = pdfUrl;
            pdfPreview.classList.remove('d-none');
            uploadedFileName.classList.remove('d-none');
        };
        reader.readAsArrayBuffer(file);

        reader = new FileReader();
        reader.onload = function(e) {
            actualInput.value = e.target.result;
        };
        reader.readAsDataURL(file);

        // if(cropperContainer == document.getElementById(`cropperContainer_${tempInput.id}`) && cropperContainerPreview == document.getElementById(`cropperContainerPreview_${tempInput.id}`))
        // {
        //     cropperContainer.classList.add('d-none');
        //     cropperContainerPreview.innerHTML = '';
        //     cropperContainerPreview.classList.add('d-none');
        //     cropButton.classList.add('d-none');
        //     cropAgainButton.classList.add('d-none');
        // }

        cropperContainer = document.getElementById(`cropperContainer_${tempInput.id}`);
        cropperContainer.innerHTML = '';
        cropperContainer.classList.add('d-none');
        cropButton = document.getElementById(`cropButton_${tempInput.id}`);
        cropButton.classList.add('d-none');

        fileSelected = document.getElementById(`fileSelected_${tempInput.id}`);
        fileSelected.classList.remove('d-none');

        saveButton = document.getElementById(`saveButton_${tempInput.id}`);
        saveButton.classList.remove('d-none');

        return;
    }
    else if(file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type))
    {
        cropperContainer = document.getElementById(`cropperContainer_${tempInput.id}`);
        cropperContainerPreview = document.getElementById(`cropperContainerPreview_${tempInput.id}`);
        uploadedFileName = document.getElementById(`uploadedFileName_${tempInput.id}`);
        cropButton = document.getElementById(`cropButton_${tempInput.id}`);
        cropAgainButton = document.getElementById(`cropAgainButton_${tempInput.id}`);

        let reader = new FileReader();
        reader.onload = function(e) {
            actualInput.value = e.target.result;
            let img = document.createElement('img');
            img.src = e.target.result;
            img.display = 'block';
            img.style.maxWidth = '100%';
            let h3 = document.createElement('h3');
            h3.innerHTML = 'Crop Image';
            cropperContainer.innerHTML = '';
            cropperContainer.appendChild(h3);
            cropperContainer.appendChild(img);
            cropperContainer.classList.remove('d-none');
            cropButton.classList.remove('d-none');
            uploadedFileName.classList.remove('d-none');

            cropper = new Cropper(img, {
                viewMode: 1,
                zoomable: false,
                movable: false,
                background: false
            });
            cropperMap.set(tempInput.id, cropper);
        };
        reader.readAsDataURL(file);

        // if(pdfPreview == document.getElementById(`pdfPreview_${tempInput.id}`))
        // {
        //     pdfPreview.classList.add('d-none');
        //     pdfPreviewEmbed.src = '';
        //     saveButton = document.getElementById(`saveButton_${tempInput.id}`);
        //     saveButton.classList.add('d-none');
        // }

        pdfPreview = document.getElementById(`pdfPreview_${tempInput.id}`);
        pdfPreview.classList.add('d-none');
        pdfPreviewEmbed = document.getElementById(`pdfPreviewEmbed_${tempInput.id}`);
        pdfPreviewEmbed.src = '';
        saveButton = document.getElementById(`saveButton_${tempInput.id}`);
        saveButton.classList.add('d-none');

        // if(cropperContainerPreview == document.getElementById(`cropperContainerPreview_${tempInput.id}`))
        // {
        //     cropperContainerPreview.innerHTML = '';
        //     cropperContainerPreview.classList.add('d-none');
        //     cropAgainButton.classList.add('d-none');
        // }

        fileSelected = document.getElementById(`fileSelected_${tempInput.id}`);
        fileSelected.classList.remove('d-none');

        return;
    }
    else
    {
        alert('File type not supported');
        return;
    }
}

function cropSelectedImage(element)
{
    let key = element.getAttribute('data-id');
    let croppedImage = cropperMap.get(key).getCroppedCanvas().toDataURL();
    actualInput = document.querySelector(`input[name="${key}"]`);
    actualInput.value = croppedImage;

    // Previewing the cropped image in the preview container
    cropperContainerPreview = document.getElementById(`cropperContainerPreview_${key}`);
    cropperContainerPreview.innerHTML = '';
    let img = document.createElement('img');
    img.src = croppedImage;
    img.display = 'block';
    img.style.maxWidth = '100%';
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Preview';

    cropperContainerPreview.appendChild(h3);
    cropperContainerPreview.appendChild(img);
    // cropperContainerPreview.classList.remove('d-none');

    cropperContainer = document.getElementById(`cropperContainer_${key}`);
    // cropperContainer.classList.add('d-none');
    cropButton = document.getElementById(`cropButton_${key}`);
    // cropButton.classList.add('d-none');
    cropAgainButton = document.getElementById(`cropAgainButton_${key}`);
    // cropAgainButton.classList.remove('d-none');
}

function cropAgain(element)
{
    let key = element.getAttribute('data-id');

    cropperContainerPreview = document.getElementById(`cropperContainerPreview_${key}`);
    cropperContainerPreview.innerHTML = '';
    cropperContainerPreview.classList.add('d-none');

    cropperContainer = document.getElementById(`cropperContainer_${key}`);
    cropperContainer.classList.remove('d-none');
    cropButton = document.getElementById(`cropButton_${key}`);
    cropButton.classList.remove('d-none');
    cropAgainButton = document.getElementById(`cropAgainButton_${key}`);
    cropAgainButton.classList.add('d-none');
}
