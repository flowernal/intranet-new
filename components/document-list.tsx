'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchDocuments, fetchDocumentsByCategory } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag, Clock4, FileWarning, ExternalLink, LinkIcon } from 'lucide-react';
import { Document } from './search-form';

export function DocumentList({
    listName,
    categorySlug,
}: {
    listName: string;
    categorySlug?: string;
}) {
    const [docs, setDocs] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const loadDocuments = useCallback(async () => {
        setLoading(true);
        try {
            const documents = categorySlug
                ? await fetchDocumentsByCategory(categorySlug)
                : await fetchDocuments();
            
            setDocs(documents);
            setInitialLoad(false);
        } catch (error) {
            console.error('Failed to fetch documents:', error);
            setDocs([]);
            setInitialLoad(false);
        } finally {
            setLoading(false);
        }
    }, [categorySlug]);

    useEffect(() => {
        // Reset state when category changes
        setDocs([]);
        setInitialLoad(true);
        setShowSkeleton(false);

        // Show skeleton after 1 second for initial load
        const skeletonTimer = setTimeout(() => {
            if (initialLoad) {
                setShowSkeleton(true);
            }
        }, 1000);

        // Load documents
        loadDocuments();

        return () => clearTimeout(skeletonTimer);
    }, [categorySlug, loadDocuments, initialLoad]);

    if (initialLoad && !showSkeleton) {
        return null; // Blank page for the first second
    }

    if (initialLoad && showSkeleton) {
        return (
            <div className="w-full px-4 py-8 font-['Oxanium']">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {listName}
                    </h1>
                    <p className="text-gray-600">Načítavam dokumenty...</p>
                </div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (docs.length === 0 && !loading) {
        return (
            <div className="w-full px-4 py-16 text-center font-['Oxanium']">
                <FileWarning className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Žiadne dokumenty
                </h2>
                <p className="text-gray-500">
                    V tejto kategórii zatiaľ nie sú žiadne dokumenty.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl px-4 py-8 font-['Oxanium'] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {listName}
                </h1>
                <p className="text-gray-600">
                    {docs.length} {docs.length === 1 ? 'dokument' : docs.length < 5 ? 'dokumenty' : 'dokumentov'}
                </p>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {docs.map((doc: Document) => (
                    <div
                        key={doc.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                        <div className="p-4 flex items-center justify-between min-w-0">
                            {/* Left side - Document info */}
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <LinkIcon className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                                            {doc.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Tag className="w-4 h-4" />
                                                <span className="truncate">{doc.category.name || 'Neznáma kategória'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Clock4 className="w-4 h-4" />
                                                <span>
                                                    {new Date(doc.updatedAt).toLocaleDateString('sk-SK', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Action button */}
                            <div className="flex-shrink-0">
                                <a
                                    href={`http://localhost:3001/redirect/${doc.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                                >
                                    <span>Otvoriť</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading more */}
            {loading && (
                <div className="mt-6 space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            )}
        </div>
    );
}
