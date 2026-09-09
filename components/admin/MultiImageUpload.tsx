"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

interface MultiImageUploadProps {
    value: File[];
    onChange: (files: File[]) => void;
    label?: string;
    maxFiles?: number;
}

interface FilePreview {
    file: File;
    previewUrl: string;
}

export function MultiImageUpload({
    value,
    onChange,
    label = "Images de l'article",
    maxFiles = 10,
}: MultiImageUploadProps) {
    const [previews, setPreviews] = useState<FilePreview[]>([]);

    // Synchroniser les aperçus avec les fichiers passés en prop
    useEffect(() => {
        // Créer les URLs d'aperçu
        const newPreviews = value.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setPreviews(newPreviews);

        // Nettoyer les URLs d'aperçu
        return () => {
            newPreviews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
        };
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (!acceptedFiles || acceptedFiles.length === 0) return;

            // Ajouter les nouveaux fichiers sans dépasser maxFiles
            const remainingSlots = maxFiles - value.length;
            if (remainingSlots <= 0) return;

            const filesToAdd = acceptedFiles.slice(0, remainingSlots);
            onChange([...value, ...filesToAdd]);
        },
        [value, maxFiles, onChange]
    );

    const removeFile = (indexToRemove: number) => {
        const updatedFiles = value.filter((_, idx) => idx !== indexToRemove);
        onChange(updatedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".webp"],
        },
        multiple: true,
        disabled: value.length >= maxFiles,
    });

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-300">{label}</label>
                <span className="text-xs text-slate-400 font-mono">
                    {value.length} / {maxFiles} images
                </span>
            </div>

            {/* Zone de Drag & Drop */}
            {value.length < maxFiles && (
                <div
                    {...getRootProps()}
                    className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-200 cursor-pointer ${
                        isDragActive
                            ? "border-violet-500 bg-violet-500/10 scale-[0.99]"
                            : "border-slate-700 bg-slate-900/40 hover:border-violet-500/50 hover:bg-slate-900/80"
                    }`}
                >
                    <input {...getInputProps()} />

                    <div className="mb-3 rounded-full bg-slate-800/80 p-3 ring-1 ring-white/10 text-violet-400">
                        <UploadCloud className="h-6 w-6" />
                    </div>

                    <p className="mb-1 text-sm font-semibold text-white text-center">
                        {isDragActive
                            ? "Déposez vos images ici !"
                            : "Glissez & déposez plusieurs images ici"}
                    </p>
                    <p className="text-xs text-slate-400 text-center">
                        ou cliquez pour parcourir vos fichiers (PNG, JPG, WEBP)
                    </p>
                </div>
            )}

            {/* Grille de prévisualisation des fichiers sélectionnés */}
            {previews.length > 0 && (
                <div className="space-y-2 mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Nouvelles images sélectionnées ({previews.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {previews.map((item, index) => (
                            <div
                                key={`${item.file.name}-${index}`}
                                className="group relative rounded-lg overflow-hidden border border-slate-700 bg-slate-900/80 aspect-video shadow-md"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.previewUrl}
                                    alt={item.file.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                {/* Nom et taille du fichier */}
                                <div className="absolute bottom-1.5 left-2 right-2 text-left pointer-events-none">
                                    <p className="text-[11px] font-medium text-white truncate">
                                        {item.file.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-mono">
                                        {formatFileSize(item.file.size)}
                                    </p>
                                </div>

                                {/* Numéro d'ordre (badge Couverture pour la 1ère) */}
                                <div className="absolute top-1.5 left-1.5 pointer-events-none">
                                    <span
                                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                                            index === 0
                                                ? "bg-violet-600 text-white"
                                                : "bg-black/60 text-slate-300"
                                        }`}
                                    >
                                        {index === 0 ? "Couverture" : `#${index + 1}`}
                                    </span>
                                </div>

                                {/* Bouton de suppression */}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-600 rounded-full text-white transition-colors"
                                    title="Supprimer cette image"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
