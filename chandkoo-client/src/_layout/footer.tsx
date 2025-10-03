export default function Footer() {
  // const [footers, setFooters] = useState<any[]>([]);
  // useEffect(() => {
  //   getAllFooters().then((res) => {
  //     if (res.status === 200) {
  //       setFooters(res.data.footers);
  //     }
  //   });
  // }, []);
  return (
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left">
      <div className="w-full bg-black/5 p-4 text-center text-[12px]">
        © تمامی حقوق مادی و معنوی این سایت محفوظ میباشد. ۱۴۰۳
      </div>
    </footer>
  );
}
