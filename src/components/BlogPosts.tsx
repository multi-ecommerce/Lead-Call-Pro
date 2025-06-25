import { CalendarDaysIcon, User2Icon } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: "/blog/post-1.jpg",
    title: "How to Get Roofing Leads Using Facebook Remarketing Ads",
    date: "June 25, 2025",
    name: "John Doe",
    description:
      "This guide shows you how to use Facebook remarketing to bring those visitors back and turn them into paying roofing customers. Learn how to set up Meta Pixel, build smart audiences, create high-converting ads, and track real ROI. Includes case studies, advanced targeting tips, and ad sequences tailored to roofers. Perfect for any roofing business w...",
  },
  {
    id: 2,
    image: "/blog/post-2.jpg",
    title: "How to Get Roofing Leads Using Real Estate Referrals",
    date: "June 20, 2025",
    name: "Jane Smith",
    description:
      "This guide shows you how to train agents to send you steady, high-quality roofing leads using pre-listing inspections. You'll learn how to create, market, and deliver an agent training program that benefits everyone—agents, sellers, and your roofing business. Stop relying on outdated roofing marketing strategies and start building a referral machin...",
  },
  {
    id: 3,
    image: "/blog/post-3.jpg",
    title: "How to Get Local Roofing Leads Using Nextdoor",
    date: "June 15, 2025",
    name: "Michael Chen",
    description:
      "In this guide, you'll learn how to create a high-converting business profile, post helpful content that builds trust, and tap into storm-driven demand. We'll show you how to turn happy customers into lead magnets, use hyper-local paid ads, and track everything to grow your roofing business fast—without spending big on third-party lead providers.",
  },
];

export default function BlogPosts() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 ">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[22rem] object-cover"
            />
            <div className="p-3 lg:p-10">
              <h3 className="text-[#16334e] text-3xl font-medium mb-2 hover:text-blue-600">
                {post.title}
              </h3>
              <div className="text-sm text-gray-500 border-b p-2 my-4 flex gap-8">
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon size={18} className="text-blue-600" />
                  {post.date}
                </p>
                <p className="flex items-center gap-2">
                  <User2Icon size={18} className="text-blue-600" />
                  {post.name}
                </p>
              </div>
              <p className="text-[#505050] text-[1rem] font-sans">
                {post.description}
              </p>
              <div className="flex items-center mt-8">
                <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-4xl">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
