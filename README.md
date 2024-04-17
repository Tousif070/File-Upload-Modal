## File Upload Modal

## Introduction

This boilerplate code can be used to upload images & pdfs in an interactive way from a modal. The code can be included in any html form. The uploaded file will be submitted as a base64 encoded version. An optional file name can also be provided. Finally, the base64 encoded version of the file and the provided file name can be processed further after sending them to the server through form submission.

## Usage

### File Upload Modal Markup

#### Include the following code inside the form:

```
<input type="hidden" class="form-control" name="my_file">
<input type="hidden" class="form-control" name="my_file_name">

<button type="button" class="btn btn-primary d-flex align-items-center" onclick="openModal(this)" data-file_key="my_file" data-file_name_key="my_file_name">
    <i class="fa fa-upload me-1"></i> Upload
</button>
```

The two input type hidden tags are used to submit the uploaded file and the optional file name respectively.

The upload button is used to initiate the file upload modal.

The value of name attribute of the first input type hidden tag should be used as the value for the `data-file_key` attribute of the upload button. And the value of name attribute of the second input type hidden tag should be used as the value for the `data-file_name_key` attribute of the upload button.

#### Include the following code outside the form:

```
<div class="modal fade" id="fileUploadModal" tabindex="-1" aria-labelledby="fileUploadModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fileUploadModalLabel">Upload File</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="file" id="modalFileInput" class="form-control" onchange="uploadFile(this)">

				<div class="d-flex justify-content-center align-items-center">
					<div id="cropperContainer" class="mt-5 d-none" style="max-width: 500px; max-height: 500px; margin-right: 50px;"></div>
					<div id="cropperContainerPreview" class="mt-5 d-none" style="max-width: 500px; max-height: 500px;"></div>
				</div>

                <div id="pdfPreview" class="mt-5 d-none" style="max-width: 100%">
                    <embed id="pdfPreviewEmbed" src="#" type="application/pdf" width="100%" height="500px" />
                </div>

                <div id="uploadedFileName" class="mt-5 d-none">
                    <input type="text" class="form-control" placeholder="Optional File Name" onfocusout="handleFileName(this)">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="cropButton" class="btn btn-primary d-none" onclick="cropSelectedImage()">Save</button>
                <button type="button" id="saveButton" class="btn btn-primary d-none" data-bs-dismiss="modal">Save</button>
            </div>
        </div>
    </div>
</div>
```

This is the file upload modal. It contains the markup code to display the uploaded file (Image/PDF) and the close & save buttons. 

### File Upload Modal Script
The file upload modal js file contains all the client side logic. Include this file in the scripts section as show below:

```
<script src="/path/to/your/file/file-upload-modal.js"></script>
```

## Dependencies

### JQuery

JQuery is needed for the client side logic in the file upload modal script:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

### Bootstrap
Bootstrap 5 is needed to render the markup of the file upload modal:

```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
.
.
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
```

### Cropper Js
Cropper Js is needed to crop images for image upload:

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css">
.
.
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
```

### Font Awesome
Font Awesome icons are used to highlight the upload button:

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```

## Sample Images

### Image Upload
<div align="center">
  <img width="720" alt="image upload" src="/images/image_upload_sample.PNG">
</div>

### PDF Upload
<div align="center">
  <img width="720" alt="pdf upload" src="/images/pdf_upload_sample.PNG">
</div>
