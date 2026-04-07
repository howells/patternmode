/** biome-ignore-all lint/performance/noBarrelFile: intentional package or module entrypoint */
// Re-export Vaul primitives for advanced use cases (e.g., custom full-screen sheets)
export { Drawer as DrawerPrimitive } from "vaul";
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer/drawer";
