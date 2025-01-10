import type { SetterOrUpdater } from "recoil";
import type { Dispatch, SetStateAction } from "react";

export default function useStateProvidedDisclosure(
  state: [boolean, SetterOrUpdater<boolean> | Dispatch<SetStateAction<boolean>>]
) {
  // base useDisclosure function, upon this we build others

  const [isOpen, setIsOpen] = state;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((isOpen) => !isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
