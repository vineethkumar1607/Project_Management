import SearchField from "~/components/Common/SearchField";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "~/components/ui/select";

type FilterOption<T extends string = string> = {
  label: string;
  value: T;
};


type FilterConfig<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  placeholder: string;
  options: FilterOption<T>[];
};

interface FiltersBarProps<T extends string = string> {
    search: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
    filters?: FilterConfig<T>[];
}

export default function FiltersBar<T extends string>({
    search,
    filters = [],
}: FiltersBarProps<T>) {
    return (
        <section
            aria-label="Filters"
            className="flex flex-col md:flex-row gap-4 md:items-center"
        >
            {/* Group */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:items-center">

                {/* Search */}
                <div className="w-full md:max-w-sm">
                    <SearchField
                        value={search.value}
                        onChange={search.onChange}
                        placeholder={search.placeholder}
                    />
                </div>

                {/* Filters */}
                {filters.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {filters.map((filter, index) => (
                            <Select
                                key={index}
                                value={filter.value}
                                onValueChange={(value) => filter.onChange(value as T)}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder={filter.placeholder} />
                                </SelectTrigger>

                                <SelectContent>
                                    {filter.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}