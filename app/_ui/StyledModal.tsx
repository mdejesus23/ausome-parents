'use client';

interface StyledModalProps {
  children: React.ReactNode;
  reference: React.Ref<HTMLDivElement>;
}

const StyledModal = ({ children, reference }: StyledModalProps) => {
  return (
    <div
      className="styled-modal custom-scrollbar relative max-h-[90%] w-[90%] overflow-y-scroll rounded-lg bg-white p-2 shadow-lg transition-all duration-500 md:w-[50%] lg:w-[45%] xl:w-[50%]"
      ref={reference}
    >
      {children}
    </div>
  );
};

export default StyledModal;
