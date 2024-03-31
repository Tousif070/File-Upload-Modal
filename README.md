## File Upload Modal

## Usage

### fileUploadModal Function
Call the fileUploadModal function in your php file from where you are rendering your view page. The fileUploadModal function contains the entire markup code for the file upload modal.

For example, if you want to use it in your Laravel application, then follow the syntax below:

```
<input type="hidden" class="form-control" name="submitted_file">

@php
    fileUploadModal("submitted_file", "submitted_file_name");
@endphp
```

Or you can use the raw syntax as shown below:

```
<input type="hidden" class="form-control" name="submitted_file">

<?php fileUploadModal("submitted_file", "submitted_file_name"); ?>
```

The input type hidden tag is needed for the final submission of your uploaded file to the server. Put the value of the name attribute of the input type hidden tag as the first argument to the fileUploadModal function.

The second argument to the fileUploadModal function can be of any value which will be used to get the name of the file in the server which will be provided during submission.

Finally the uploaded file will be submitted as a base64 encoded version to the server.

### fileUploadModal Script
Include the fileUploadModal js file in the scripts section of your view page as show below:

```
<script src="/path/to/your/file/file-upload-modal.js"></script>
```

## Dependencies

### Bootstrap
In order to render the file upload modal, Bootstrap 5 is needed:

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

## Sample Images

### Image Upload
<div align="center">
  <img width="720" alt="image upload" src="/images/image_upload_sample.PNG">
</div>

### PDF Upload
<div align="center">
  <img width="720" alt="pdf upload" src="/images/pdf_upload_sample.PNG">
</div>