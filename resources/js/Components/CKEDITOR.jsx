import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API_URL = "http://localhost:8000";
const UPLOAD_ENDPOINT = "api/upload-image";

export default function CKEDITOR({ handleChange, ...props }) {
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("files", file);
                        let headers = new Headers();
                        headers.append("Origin", "http://localhost:8000");
                        fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body,
                            // mode: "no-cors"
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: `${API_URL}/storage/${res.uploadedImageUrl}`,
                                });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            },
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    return (
        <div className="App min-h-[90%]">
            <CKEditor
                config={{
                    extraPlugins: [uploadPlugin],
                    width: 200,
                    height: "80%",
                }}
                editor={ClassicEditor}
                onReady={(editor) => {}}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
                onChange={(event, editor) => {
                    handleChange(editor.getData());
                }}
                {...props}
            />
        </div>
    );
}
