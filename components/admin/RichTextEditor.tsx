"use client";

import React, { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export default function RichTextEditor({ value, onChange, label = "Content" }: RichTextEditorProps) {
    const editorRef = useRef<any>(null);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        }
        setEditorLoaded(true);
    }, []);

    return (
        <div className="space-y-2 prose-editor">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            {editorLoaded ? (
                <div className="rounded-lg overflow-hidden border border-slate-700 text-black">
                    <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            onChange(data);
                        }}
                        config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                        }}
                    />
                </div>
            ) : (
                <div className="h-40 w-full animate-pulse rounded-lg bg-slate-800" />
            )}
            <style jsx global>{`
                /* Override CKEditor generic styles to fit dark theme mostly */
                .ck-editor__editable_inline {
                    min-height: 300px;
                    background-color: #f8fafc !important; /* Keep light bg for editing readability */
                    color: #0f172a !important;
                }
            `}</style>
        </div>
    );
}

