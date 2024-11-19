"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { sortTypes } from "@/constants";

const Sort = () => {
    const path = usePathname();
    const router = useRouter();

    const handleSort = (value: string) => {
        router.push(`${path}?sort=${value}`);
    };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
        <SelectTrigger className="sort-select">
            <SelectValue placeholder={sortTypes[0].value} />
        </SelectTrigger>
        <SelectContent className="sort-select-content">
            {sortTypes.map((type) => (
                <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className="sort-select-item"
                >
                    {type.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default Sort