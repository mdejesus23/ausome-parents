'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { EllipsisVertical } from 'lucide-react';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';

type Position = { x: number; y: number } | null;

type MenusContextType = {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

export function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<Position>(null);

  const close = () => setOpenId('');
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

export function MenuToggle({ id }: { id: string }) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error('Toggle must be used within Menus');
  const { openId, close, open, setPosition } = ctx;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-2 rounded-md border-none bg-none p-1 transition-all hover:bg-gray-100"
    >
      <EllipsisVertical className="h-6 w-6 text-gray-700" />
    </button>
  );
}

export function MenuList({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error('List must be used within Menus');
  const { openId, position, close } = ctx;

  // ✅ Type your ref for UL
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="fixed rounded-md bg-white shadow-md"
      style={{ right: `${position?.x}px`, top: `${position?.y}px` }}
    >
      {children}
    </ul>,
    document.body,
  );
}

export function MenuButton({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error('Button must be used within Menus');
  const { close } = ctx;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-4 border-none bg-none p-3 text-left text-sm transition-all hover:bg-gray-50"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}
