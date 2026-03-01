import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useState, useEffect } from "react"
import { useDebounce } from "~/hooks/useDebounce"

interface SearchInputProps {
    label?: string
    placeholder?: string
    delay?: number
    onSearch: (value: string) => void
    className?: string
}

/*
 reusable search input

 debounced search
 reusable
 controlled internally
 accessible
*/
export default function SearchInput({ label = "Search", placeholder = "Search...", delay = 500, onSearch,
    className, }: SearchInputProps) {
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, delay)

    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery, onSearch])

    return (
        <section
            aria-label={label}
            className={className}
        >
            <div className="max-w-sm space-y-2">
                <Label htmlFor="search">
                    {label}
                </Label>

                <Input
                    id="search"
                    type="search"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />

            </div>
        </section>
    )
}