import useIsMobile from "../hooks/useIsMobile";

export default function SectionHeadings({ title }: { title: string }) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`w-full text-center ${
        isMobile ? "pt-[20px] pb-[20px]" : "pt-[60px] pb-[60px]"
      }`}
    >
      <div className={`${isMobile ? "text-[22px]" : "text-[32px]"} pb-[20px]`}>
        {title}
      </div>
      <div className="w-[70px] h-[3px] bg-blue-600 mx-auto" />
    </div>
  );
}
