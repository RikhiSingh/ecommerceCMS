"use client";

import axios from "axios";
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string | null;
  created_at: Date;
  totalProducts: number;
  soldProducts: number;
  totalWorth: number;
  userId: string;
};

const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  // for alert modal
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const storeId = row.original.id;
  const userId = row.original.userId;

  // Function to copy the storeId to the clipboard
  const copyStoreId = async () => {
    try {
      await navigator.clipboard.writeText(storeId);
      toast.success("Store ID copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy Store ID: ", error);
      toast.error("Failed to copy Store ID");
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${storeId}`)
      router.refresh();
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Make sure you remove all the products and categories first.");
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const copySellerId = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      toast.success("User ID copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy User ID: ", error);
      toast.error("Failed to copy User ID");
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteStore}
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
            onClick={copyStoreId}
          >
            Copy Store Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={copySellerId}
          >
            Copy Seller Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-500"
          >
            Delete Store
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
    accessorKey: "totalProducts",
    header: "Total Products",
  },
  {
    accessorKey: "soldProducts",
    header: "Sold Products",
  },
  {
    accessorKey: "totalWorth",
    header: "Total Worth of Sold Products",
    cell: ({ row }) => {
      return `$${row.original.totalWorth.toFixed(2)}`; // Format to 2 decimal places
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ActionsCell, // Reference the updated ActionsCell component
  },
];
