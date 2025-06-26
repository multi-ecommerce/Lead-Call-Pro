export default function Header({
  heading,
  subHeading,
}: {
  heading: string;
  subHeading: string;
}) {
  return (
    <div className="bg-[url('/images/page-header-bg.webp')] bg-cover bg-center bg-no-repeat h-[32rem] w-full flex items-center px-8 lg:px-20 relative -top-16">
      <div className="text-white mt-24">
        <p className="text-lg font-semibold pl-1">{subHeading}</p>
        <p className="text-5xl font-bold">{heading}</p>
      </div>
    </div>
  );
}
