import { create } from "zustand";

import {Product} from "@/types";

interface PreviewModalStore{
    isOpen: boolean;
    data?: Product;
    onOpen: (data: Product) => void;
    onClose: () => void;
};

