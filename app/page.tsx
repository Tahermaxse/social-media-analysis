import OverviewSection from "@/components/OverviewSection";
import RegionalBoard from "@/components/RegionalBoard";
import SocialMediaPerformance from "@/components/SocialMediaPerformance";
import TopNavBar from "@/components/TopNavBar";
import { SocialMediaTrends } from "@/components/ui/incident-trends";
import Engagement from "@/components/Engagement";
import { Heart, Image } from "lucide-react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const data = [
  {
    title: "TOTAL LIKES",
    subtitle: "9.9",
    stats: "6,904 calls",
    extraDetails: "10.3",
    icon: (
      <Heart className="w-3 h-3 text-black/40 dark:text-white/40" />
    ),
    trendData: 11,
  },
  {
    title: "CAROUSEL",
    subtitle: "9.9",
    stats: "6,904 calls",
    extraDetails: "10.3",
    icon: (
      <Heart className="w-3 h-3 text-black/40 dark:text-white/40" />
    ),
    trendData: 9,
  },
  {
    title: "Image",
    subtitle: "9.9",
    stats: "6,904 calls",
    extraDetails: "25.3",
    icon: (
      <Image className="w-3 h-3 text-black/40 dark:text-white/40" />
    ),
    trendData: 9,
  }
  // Add more card data as needed
];

export default function Home() {
  return (
    <>
    <TopNavBar />
    <Hero />
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <OverviewSection /><br/>
      <SocialMediaTrends /><br/><br/><br/>
      <Engagement data={data} />
      <SocialMediaPerformance />
      {/* <RegionalBoard /> */}
    </div>
    <Footer />
    </>
  );
}