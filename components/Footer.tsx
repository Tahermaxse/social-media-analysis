'use client';

import { Copyright } from 'lucide-react';
import AvatarCircles from '@/components/ui/avatar-circles';

const avatars = [
	{
		imageUrl: 'https://avatars.githubusercontent.com/u/138603168',
		profileUrl: 'https://www.linkedin.com/in/taher-hathi/',
	},
	{
		imageUrl: 'https://avatars.githubusercontent.com/u/77052840',
		profileUrl: 'http://www.linkedin.com/in/karansinh101',
	},
	{
		imageUrl:
			'https://media.licdn.com/dms/image/v2/D5603AQHZlLjSbRdQ4A/profile-displayphoto-shrink_400_400/B56ZOu5CVOGcAk-/0/1733806008661?e=1741824000&v=beta&t=Fqo5C3DNOfPOAgg4Ry3G5Vme9XP63-dh-bL77-U4Ul0',
		profileUrl:
			'https://www.linkedin.com/in/ayushi-satodiya-836a47329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
	},
	{
		imageUrl:
			'https://media.licdn.com/dms/image/v2/D4D35AQGU1tsvOl99fg/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1708841609821?e=1736877600&v=beta&t=Gb9UY6KbJpbmigWrz1Z-r002FG69jVvQNcRmWzT_JE4',
		profileUrl: 'https://www.linkedin.com/in/taha-hathi-086830279/',
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
					<AvatarCircles avatarUrls={avatars} />
				</div>
			</div>
		</footer>
	);
}
