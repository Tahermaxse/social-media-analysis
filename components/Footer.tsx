"use client";

import { Copyright } from "lucide-react";
import AvatarCircles  from "@/components/ui/avatar-circles";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/138603168",
    profileUrl: "https://github.com/Tahermaxse",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/77052840",
    profileUrl: "https://github.com/karan898",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Copyright className="h-4 w-4 text-[#D94E1E]" />
          <span className="text-center sm:text-left">
            2024 All rights reserved
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Project by</span>
          <AvatarCircles  avatarUrls={avatars} />
        </div>
      </div>
    </footer>
  );
}
