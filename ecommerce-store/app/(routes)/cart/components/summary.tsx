"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";  
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";