export default function SectionHeadings({ title }: { title: string }) {
  return (
    <div className="w-full text-center pt-[60px] pb-[30px]">
      <div className="text-[32px] pb-[20px]">{title}</div>
      <div className="w-[70px] h-[3px] bg-blue-600 mx-auto" />
    </div>
  );
}
