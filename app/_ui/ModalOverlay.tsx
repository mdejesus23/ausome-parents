'use client';

interface ModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-[rgba(209,213,219,0.6)] backdrop-blur-sm transition-all duration-500">
      {children}
    </div>
  );
};

export default ModalOverlay;
