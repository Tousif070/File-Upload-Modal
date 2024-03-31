<?php

function fileUploadModal($fileKey, $fileNameKey)
{
    $htmlResponse = '

        <button type="button" id="fileSelected_' . $fileKey . '" class="btn btn-success d-none" data-bs-toggle="tooltip" data-bs-dismiss="click" title="File Chosen">
            <i class="fas fa-check"></i>
        </button>

        <button type="button" class="btn btn-primary" style="margin-left: 5px;" data-bs-toggle="modal" data-bs-target="#fileUploadModal_' . $fileKey . '">
            Upload
        </button>

        <div class="modal fade" id="fileUploadModal_' . $fileKey . '" tabindex="-1" aria-labelledby="fileUploadModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="fileUploadModalLabel">Upload File</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="file" class="form-control" id="' . $fileKey . '" onchange="uploadFile(this)">
                        <div id="cropperContainer_' . $fileKey . '" class="mt-5 d-none" style="max-width: 100%; max-height: 500px; overflow: auto;"></div>
                        <div id="cropperContainerPreview_' . $fileKey . '" class="mt-5 d-none" style="max-width: 100%; max-height: 500px; overflow: auto; border: 1px solid gray; padding: 20px;"></div>

                        <div id="pdfPreview_' . $fileKey . '" class="mt-5 d-none" style="max-width: 100%">
                            <embed id="pdfPreviewEmbed_' . $fileKey . '" src="#" type="application/pdf" width="100%" height="500px" />
                        </div>

                        <div id="uploadedFileName_' . $fileKey . '" class="mt-5 d-none">
                            <input type="text" name="' . $fileNameKey . '" class="form-control" placeholder="Optional File Name">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="cropButton_' . $fileKey . '" data-id="' . $fileKey . '" class="btn btn-primary d-none" onclick="cropSelectedImage(this)" data-bs-dismiss="modal">Save</button>
                        <button type="button" id="cropAgainButton_' . $fileKey . '" data-id="' . $fileKey . '" class="btn btn-secondary d-none" onclick="cropAgain(this)">Crop Again</button>
                        <button type="button" id="saveButton_' . $fileKey . '" class="btn btn-primary d-none" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>

    ';

    echo $htmlResponse;
}