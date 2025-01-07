import {
	Facebook,
	Instagram,
	Linkedin,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import React from 'react';

interface ResponseCardProps {
	title: string;
	subtitle: string;
	stats: string;
	extraDetails: string;
	icon: React.ReactNode;
	trendData: number;
	progress?: number;
	percentage1?: number;
	percentage2?: number;
	percentage3?: number;
}

const ResponseCard: React.FC<ResponseCardProps> = ({
	title,
	subtitle,
	stats,
	extraDetails,
	icon,
	trendData,
	progress = 75,
	percentage1 = 70,
	percentage2 = 40,
	percentage3 = 50,
}) => {
	return (
		<div
			className="relative group h-full"
			style={{ opacity: 1, transform: 'none' }}
		>
			<div
				className="h-full bg-white dark:bg-white/5 backdrop-blur-xl p-6 
        rounded-2xl border border-black/5 dark:border-white/5 
        hover:border-black/10 dark:hover:border-white/10
        hover:bg-black/[0.02] dark:hover:bg-white/[0.07]
        shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_1px_rgba(255,255,255,0.02)]
        hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.05)]
        transition-all duration-300"
			>
				<div className="flex flex-col justify-between h-full">
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40">
								{icon}
								{title}
							</div>
							<div className="text-[10px] font-mono text-black/20 dark:text-white/20">
								{stats}
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<div className="text-4xl font-mono tabular-nums">
									{extraDetails}
									<span className="text-sm text-black/40 dark:text-white/40 ml-1">
										MIN
									</span>
								</div>
								<div className="text-[10px] font-mono text-black/40 dark:text-white/40 mt-1">
									7-day mean response time
								</div>
							</div>
							{trendData >= 10 ? (
								<div className="flex items-center gap-1 text-[10px] font-mono text-green-500">
									<TrendingUp className="w-3 h-3" />
									{trendData}%
								</div>
							) : (
								<div className="flex items-center gap-1 text-[10px] font-mono text-red-500">
									<TrendingDown className="w-3 h-3" />
									{trendData}%
								</div>
							)}
						</div>
					</div>
					<div className="space-y-2 mt-4">
						<div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40">
							<Instagram className="w-5 h-5" />
							Instagram: <span>`${percentage1}%`</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
							<div
								className="bg-pink-600 dark:bg-pink-500 h-1.5 rounded-full transition-all duration-500"
								style={{ width: `${percentage1}%` }}
							></div>
						</div>
						<div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40">
							<Facebook className="w-5 h-5" />
							Facebook: <span>`${percentage2}%`</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
							<div
								className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-500"
								style={{ width: `${percentage2}%` }}
							></div>
						</div>
						<div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40">
							<Linkedin className="w-5 h-5" />
							LinkedIn: <span>`${percentage3}%`</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
							<div
								className="bg-blue-800 dark:bg-blue-700 h-1.5 rounded-full transition-all duration-500"
								style={{ width: `${percentage3}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface EngagementProps {
	data: ResponseCardProps[];
}

const Engagement: React.FC<EngagementProps> = ({ data }) => {
	return (
		<section className="min-h-[200px]">
			<section className="p-8 bg-white dark:bg-black rounded-3xl border border-black/5 dark:border-white/5">
				<div className="mb-8">
					<div className="text-[10px] tracking-wider text-black/40 dark:text-white/40 mb-2">
						Engagement Summary
					</div>
					<div className="text-xl font-light tracking-tight">
						Average engagement by types
					</div>
					<div className="text-[10px] text-black/40 dark:text-white/40 pt-2">
						7-Day Analysis
					</div>
				</div>
				<div className="space-y-8">
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1200px]">
						{data.map((item, index) => (
							<ResponseCard
								key={index}
								{...item}
							/>
						))}
					</div>
				</div>
			</section>
		</section>
	);
};

export default Engagement;
