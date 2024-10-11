import React from "react";
import { z } from "zod";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type EntityTableProps<T> = {
  schema: z.ZodType<T>;
  data: T[];
  onDelete: (input: { elementKey: number; element: T }) => void;
  onEdit: (input: { elementKey: number; element: T }) => void;
  haveProfilePicture: boolean
};

function EntityTable<T>({
  schema: _schema,
  data,
  onDelete,
  onEdit,
}: EntityTableProps<T>) {
  function flattenSchema(schema: z.ZodTypeAny, parentKey = ""): string[] {
    if (schema instanceof z.ZodObject) {
      return Object.entries(schema.shape).flatMap(([key, value]) =>
        // @ts-ignore
        flattenSchema(value, parentKey ? `${parentKey}.${key}` : key),
      );
    } else if (
      schema instanceof z.ZodOptional ||
      schema instanceof z.ZodNullable
    ) {
      return flattenSchema(schema.unwrap(), parentKey);
    } else if (schema instanceof z.ZodArray) {
      return [parentKey + "[]"];
    } else {
      // @ts-ignore
      return [parentKey];
    }
  }

  function getValueByPath(obj: any, path: string): any {
    const keys = path.replace(/\[\]/g, "").split(".");
    const value = keys.reduce((o, k) => (o ? o[k] : undefined), obj);

    if (path.endsWith("[]") && Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  }

  function formatValue(value: any): string {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleDateString();
    return String(value);
  }

  function formatColumnHeader(column: any): string {
    // @ts-ignore
    return _schema.shape[column].description
  }

  const columns = flattenSchema(_schema).filter((key) => key !== "");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{formatColumnHeader(column)}</TableHead>
          ))}
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => {
              const value = getValueByPath(item, column);
              return <TableCell key={column}>{formatValue(value)}</TableCell>;
            })}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    // onClick={() => onEdit({ elementKey: index, element: item })}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    // onClick={() =>
                    //   onDelete({ elementKey: index, element: item })
                    // }
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EntityTable;