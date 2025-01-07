'use client';
import React, { useEffect } from 'react';
import { Share2, Heart, MessageCircle, Calendar } from 'lucide-react';
import NumberFlow from '@number-flow/react';

const OverviewSection = () => {
	useEffect(() => {
		console.log('NumberFlow component initialized');
	}, []);
	return (
		<section>
			<div className="mb-8">
				<div className="text-[10px] tracking-wider text-black/40 dark:text-white/40 mb-2">
					OVERVIEW
				</div>
				<div className="text-xl font-light tracking-tight">
					Total Engagement
				</div>
			</div>
			<div className="space-y-px">
				<div className="bg-white dark:bg-black p-4 md:p-6 font-['JetBrains_Mono'] border-b border-black/10 dark:border-white/10">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Calendar className="w-3 h-3 text-black/40 dark:text-white/40" />
							<span className="text-[10px] tracking-wider text-black/40 dark:text-white/40">
								01.01.2024 - 31.12.2024
							</span>
						</div>
						<div className="text-[10px] tracking-wider text-black/40 dark:text-white/40">
							Last Year's Data
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
					{[
						{
							title: 'LIKES',
							number: 271275,
							description: 'TOTAL ENGAGEMENTS LIKES', 
							icon: (
								<Heart className="w-5 h-5 text-black/40 dark:text-white/40" />
							),
						},
						{
							title: 'SHARE',
							number: 56303,
							description: 'TOTAL ENGAGEMENTS SHARES',
							icon: (
								<Share2 className="w-5 h-5 text-black/40 dark:text-white/40" />
							),
						},
						{
							title: 'COMMENTS',
							number: 27387,
							description: 'TOTAL ENGAGEMENTS COMMENTS',
							icon: (
								<MessageCircle className="w-5 h-5 text-black/40 dark:text-white/40" />
							),
						},
					].map(({ title, number, description, icon }, index) => (
						<div
							key={index}
							className="bg-white dark:bg-black md:border-l border-black/10 dark:border-white/10 border-t md:border-t-0"
						>
							<div className="p-4 md:p-6 font-['JetBrains_Mono']">
								<div className="flex items-center justify-between mb-4 md:mb-6">
									<div className="font-mono text-[10px] tracking-wider text-black/40 dark:text-white/40">
										{title}
									</div>
									{icon}
								</div>
								<div className="space-y-3 md:space-y-4">
									<div className="text-4xl md:text-5xl font-light tracking-tighter tabular-nums font-mono">
										<NumberFlow
											transformTiming={{ duration: 750, easing: 'linear' }}
											spinTiming={{ duration: 750, easing: 'linear' }}
											opacityTiming={{ duration: 350, easing: 'ease-out' }}
											value={number}
										/>
									</div>
									<div className="font-mono text-[10px] tracking-wider text-black/40 dark:text-white/40">
										{description}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default OverviewSection;
