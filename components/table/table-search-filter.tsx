"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";

type SearchField = { key: string; label: string };

interface Props<TData> {
  table: Table<TData>;
  searchField: string;
  searchFields: SearchField[];
}

export default function TableSearchFilter<TData>({
  table,
  searchFields,
}: Props<TData>) {
  const [searchFieldKey, setSearchFieldKey] = useState(
    searchFields?.at(0)?.key ?? "guest"
  );
  return (
    <div className="flex items-center py-4">
      <div className="flex items-center">
        <Input
          placeholder={`Search by`}
          spellCheck={false}
          value={
            (table.getColumn(searchFieldKey)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchFieldKey)?.setFilterValue(event.target.value)
          }
          className="max-w-xs rounded-r-none"
        />
        <Select value={searchFieldKey} onValueChange={setSearchFieldKey}>
          <SelectTrigger className="w-[180px] rounded-l-none">
            <SelectValue placeholder="select field" />
          </SelectTrigger>
          <SelectContent>
            {searchFields.map((field) => (
              <SelectItem key={field.key} value={field.key}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto flex items-center gap-2">
            <span>Columns</span> <ListFilter size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
