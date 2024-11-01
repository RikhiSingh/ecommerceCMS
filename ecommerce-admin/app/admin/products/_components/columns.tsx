"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { adminDeleteProduct } from "@/actions/admin/admin-deleteproduct";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string | null;
  created_at: Date;
  stockQuantity: number;
  price: number;
};

const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  // for alert modal
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteProduct = async () => {
    try {
      setLoading(true)
      adminDeleteProduct(row.original.id);
      router.refresh();
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Make sure you remove all the products and categories first.");
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }


  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteProduct}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-500"
          >
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Store Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = `${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      return formattedDate;
    },
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return `$${row.original.price.toFixed(2)}`; // Format to 2 decimal places
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ActionsCell, // Reference the updated ActionsCell component
  },
];
