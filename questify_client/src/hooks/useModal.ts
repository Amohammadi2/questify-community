import { useState } from "react";

/**
 * @description Makes it easier to implement modal functionality
 * @returns a callback that you can call to open the modal and a state object you can directly
 * pass to to the mui modal component
 */
export function useModal() {
  const [open, setOpen] = useState<boolean>(false)
  return [() => setOpen(true), { open , onClose() { setOpen(false)} }] as const
}