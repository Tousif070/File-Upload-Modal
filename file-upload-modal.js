var modalFileInput = document.getElementById('modalFileInput');
var storedFiles = new Map();
var actualFileInput;
var actualFileNameInput;
var fileKey;
var fileNameKey;
var pdfPreview = document.getElementById('pdfPreview');
var pdfPreviewEmbed = document.getElementById('pdfPreviewEmbed');
var uploadedFileName = document.getElementById('uploadedFileName');
var saveButton = document.getElementById('saveButton');
var uploadButton;
var cropperContainer = document.getElementById('cropperContainer');
var cropperContainerPreview = document.getElementById('cropperContainerPreview');
var cropButton = document.getElementById('cropButton');

function openModal(element)
{
    uploadButton = element;
    $('#fileUploadModal').modal('show');
    fileKey = element.getAttribute('data-file_key');
    fileNameKey = element.getAttribute('data-file_name_key');
    actualFileInput = document.querySelector(`input[name="${fileKey}"]`);
    actualFileNameInput = document.querySelector(`input[name="${fileNameKey}"]`);

    if(storedFiles.has(fileKey))
    {
        let fileObject = storedFiles.get(fileKey);

        if(fileObject.fileType === 'pdf')
        {
            pdfPreviewEmbed.src = fileObject.pdfPreviewEmbedData;
            pdfPreview.classList.remove('d-none');
            $('#uploadedFileName input').val(fileObject.fileName);
            uploadedFileName.classList.remove('d-none');
            saveButton.classList.remove('d-none');
        }
        else if(fileObject.fileType === 'image')
        {
            let img = document.createElement('img');
            img.src = fileObject.originalImageData;
            img.display = 'block';
            img.style.maxWidth = '100%';
            cropperContainer.innerHTML = '';
            cropperContainer.appendChild(img);
            cropperContainer.classList.remove('d-none');
            cropButton.classList.remove('d-none');
            uploadedFileName.classList.remove('d-none');
            $('#uploadedFileName input').val(fileObject.fileName);

            let cropper = new Cropper(img, {
                viewMode: 1,
                zoomable: false,
                movable: false,
                background: true,
                minContainerWidth: 500,
                minContainerHeight: 500,
                minCanvasWidth: 500,
                minCanvasHeight: 500,
                ready() {
                    cropper.setData(fileObject.cropperData);
                }
            });
            fileObject.cropperObject = cropper;

            let croppedImage = fileObject.croppedImageData;
            img = document.createElement('img');
            img.src = croppedImage;
            img.display = 'block';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '500px';
            cropperContainerPreview.innerHTML = '';
            cropperContainerPreview.appendChild(img);
            cropperContainerPreview.classList.remove('d-none');
        }
    }
}

function uploadFile(tempInput)
{
    let file = tempInput.files[0];

    if(file && file.type === 'application/pdf')
    {
        let fileObject = {
            fileType: 'pdf',
            fileName: '',
            pdfPreviewEmbedData: ''
        };

        let reader = new FileReader();
        reader.onload = function(e) {
            let arrayBuffer = e.target.result;
            let pdfUrl = URL.createObjectURL(new Blob([arrayBuffer], {type: 'application/pdf'}));
            pdfPreviewEmbed.src = pdfUrl;
            pdfPreview.classList.remove('d-none');
            uploadedFileName.classList.remove('d-none');
            saveButton.classList.remove('d-none');
            fileObject.pdfPreviewEmbedData = pdfUrl;
        };
        reader.readAsArrayBuffer(file);

        reader = new FileReader();
        reader.onload = function(e) {
            actualFileInput.value = e.target.result;
        };
        reader.readAsDataURL(file);

        storedFiles.set(fileKey, fileObject);

        // Change upload button from primary to success
        uploadButton.classList.remove('btn-primary');
        uploadButton.classList.add('btn-success');
        // Change the upload button fa icon from upload to check
        uploadButton.innerHTML = '<i class="fa fa-check me-1"></i> Uploaded';

        cropperContainer.classList.add('d-none');
        cropperContainer.innerHTML = '';
        cropperContainerPreview.classList.add('d-none');
        cropperContainerPreview.innerHTML = '';
        cropButton.classList.add('d-none');

        return;
    }
    else if(file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type))
    {
        let fileObject = {
            fileType: 'image',
            fileName: '',
            originalImageData: '',
            cropperObject: null,
            croppedImageData: '',
            cropperData: ''
        };

        let reader = new FileReader();
        reader.onload = function(e) {
            actualFileInput.value = e.target.result;
            let img = document.createElement('img');
            img.src = e.target.result;
            img.display = 'block';
            img.style.maxWidth = '100%';
            cropperContainer.innerHTML = '';
            cropperContainer.appendChild(img);
            cropperContainer.classList.remove('d-none');
            cropButton.classList.remove('d-none');
            uploadedFileName.classList.remove('d-none');
            fileObject.originalImageData = e.target.result;

            let cropper = new Cropper(img, {
                viewMode: 1,
                zoomable: false,
                movable: false,
                background: true,
                minContainerWidth: 500,
                minContainerHeight: 500,
                minCanvasWidth: 500,
                minCanvasHeight: 500
            });
            fileObject.cropperObject = cropper;
        };
        reader.readAsDataURL(file);

        storedFiles.set(fileKey, fileObject);

        // Change upload button from primary to success
        uploadButton.classList.remove('btn-primary');
        uploadButton.classList.add('btn-success');
        // Change the upload button fa icon from upload to check
        uploadButton.innerHTML = '<i class="fa fa-check me-1"></i> Uploaded';

        cropperContainerPreview.classList.add('d-none');
        cropperContainerPreview.innerHTML = '';

        pdfPreview.classList.add('d-none');
        pdfPreviewEmbed.src = '';
        saveButton.classList.add('d-none');

        return;
    }
    else
    {
        alert('File type not supported');
        return;
    }
}

function handleFileName(element)
{
    let fileObject = storedFiles.get(fileKey);
    fileObject.fileName = element.value;
    actualFileNameInput.value = element.value;
}

function cropSelectedImage()
{
    let fileObject = storedFiles.get(fileKey);
    let croppedImage = fileObject.cropperObject.getCroppedCanvas().toDataURL();
    fileObject.cropperData = fileObject.cropperObject.getData();
    actualFileInput.value = croppedImage;
    fileObject.croppedImageData = croppedImage;
    let img = document.createElement('img');
    img.src = croppedImage;
    img.display = 'block';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '500px';
    cropperContainerPreview.innerHTML = '';
    cropperContainerPreview.appendChild(img);
    cropperContainerPreview.classList.remove('d-none');
}

$('#fileUploadModal').on('hidden.bs.modal', function () {
    if(storedFiles.has(fileKey))
    {
        let fileObject = storedFiles.get(fileKey);
        if(fileObject.fileType === 'pdf')
        {
            pdfPreview.classList.add('d-none');
            pdfPreviewEmbed.src = '';
            uploadedFileName.classList.add('d-none');
            $('#uploadedFileName input').val('');
            saveButton.classList.add('d-none');
        }
        else if(fileObject.fileType === 'image')
        {
            cropperContainer.classList.add('d-none');
            cropperContainer.innerHTML = '';
            cropperContainerPreview.classList.add('d-none');
            cropperContainerPreview.innerHTML = '';
            cropButton.classList.add('d-none');
            uploadedFileName.classList.add('d-none');
            $('#uploadedFileName input').val('');
        }
    }

    modalFileInput.value = '';
});
