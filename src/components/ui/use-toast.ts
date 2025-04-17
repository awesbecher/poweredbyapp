
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast";

// Re-export the hooks from the correct location
export const useToast = useToastOriginal;
export const toast = toastOriginal;
