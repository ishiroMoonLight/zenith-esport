"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
    const [preview, setPreview] = useState(value);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            // In a real app, we would upload to server/S3 here.
            // For this prototype, we create a local object URL to show it works.
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onChange(objectUrl); // Pass back the URL (or file object in real app)
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp']
        },
        maxFiles: 1
    });

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview("");
        onChange("");
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">{label}</label>

            <div
                {...getRootProps()}
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors
          ${isDragActive ? "border-violet-500 bg-violet-500/10" : "border-slate-700 bg-slate-900/50 hover:bg-slate-900"}
          ${preview ? "border-solid border-slate-600 p-0" : "p-6"}
        `}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                            <p className="text-white font-medium">Click or Drop to change</p>
                        </div>
                        <button
                            type="button"
                            onClick={clearImage}
                            className="absolute right-2 top-2 rounded-full bg-slate-900/80 p-1.5 text-white hover:bg-red-500 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 rounded-full bg-slate-800 p-4">
                            <UploadCloud className={`h-8 w-8 ${isDragActive ? "text-violet-400" : "text-slate-400"}`} />
                        </div>
                        <p className="mb-2 text-sm font-semibold text-white">
                            {isDragActive ? "Drop it here!" : "Click or drag image to upload"}
                        </p>
                        <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                )}
            </div>
        </div>
    );
}
