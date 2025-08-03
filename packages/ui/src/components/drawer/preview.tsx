import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./component";

export const DrawerExample = () => (
  <Drawer>
    <DrawerTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Open Drawer
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Drawer Preview</DrawerTitle>
        <DrawerDescription>
          This is a preview of the drawer component.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Drawer content goes here.
        </p>
      </div>
    </DrawerContent>
  </Drawer>
);
