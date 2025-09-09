"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"

export interface Document {
    id: string
    title: string
    link: string
    createdAt: string
    updatedAt: string
    category: {
        id: number
        name: string
        slug: string
    }
}

export function SearchForm() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Document[]>([])
    const debouncedQuery = useDebounce(query, 300) // 💤 delay for backend

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([])
            return
        }

        const search = async () => {
            const res = await fetch(`http://localhost:3001/search?query=${encodeURIComponent(debouncedQuery)}`)
            if (res.ok) {
                const data = await res.json()
                setResults(data)
            }
        }

        search()
    }, [debouncedQuery])

    return (
        <form className="relative">
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Hľadať
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Hľadať dokument..."
                        className="pl-8"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </SidebarGroupContent>
            </SidebarGroup>

            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-md border bg-background shadow z-10 text-sm">
                    {results.map((doc) => (
                        <Link
                            href={`/documents/${doc.id}`}
                            key={doc.id}
                            className="block px-3 py-2 hover:bg-muted transition"
                        >
                            {doc.title}
                        </Link>
                    ))}
                </div>
            )}
        </form>
    )
}
