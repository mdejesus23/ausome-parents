'use client';

import { X } from 'lucide-react';

import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import ModalOverlay from './ModalOverlay';
import StyledModal from './StyledModal';

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

interface OpenProps {
  children: React.ReactElement<{ onClick?: () => void }>;
  opens: string;
}

interface WindowProps {
  children: React.ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FunctionComponent<OpenProps> = ({
  children,
  opens: opensWindowName,
}) => {
  const { open } = useContext(ModalContext) as ModalContextProps;

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
};

const Window: React.FunctionComponent<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext) as ModalContextProps;
  const ref = useOutsideClick(close, true);

  if (name !== openName) return null;

  return createPortal(
    <ModalOverlay>
      <StyledModal reference={ref as React.RefObject<HTMLDivElement>}>
        <button
          className="absolute top-6 right-10 z-10 text-neutral-700 underline-offset-1 dark:text-neutral-300"
          onClick={close}
          aria-label="Close"
        >
          <X />
        </button>

        <div className="w-full overflow-auto pt-6">
          {children && cloneElement(children, { onCloseModal: close })}
        </div>
      </StyledModal>
    </ModalOverlay>,
    document.body,
  );
};

export const ModalRoot = Modal;
export const ModalOpen = Open;
export const ModalWindow = Window;
