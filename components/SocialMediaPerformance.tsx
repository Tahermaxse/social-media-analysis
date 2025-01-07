'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const SocialMediaPerformance = () => {
	// Sample data for the table
	const allData = [
		{
			platform: 'Instagram',
			category: 'Carousel',
			likes: 6996,
			shares: 1158,
			comments: 765,
		},
		{
			platform: 'Facebook',
			category: 'Reels',
			likes: 8388,
			shares: 1513,
			comments: 804,
		},
		{
			platform: 'LinkedIn',
			category: 'Static Images',
			likes: 6214,
			shares: 1268,
			comments: 580,
		},
	];

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPlatform, setSelectedPlatform] = useState('All');
	const [searchQuery, setSearchQuery] = useState(''); // Search query state
	const [isOpen, setIsOpen] = useState(false);

	const itemsPerPage = 3;

	// Filter data based on selected platform and search query
	const filteredData = allData
		.filter(
			(item) => selectedPlatform === 'All' || item.platform === selectedPlatform
		)
		.filter((item) =>
			item.category.toLowerCase().includes(searchQuery.toLowerCase())
		);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const currentData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const platforms = ['All', 'Instagram', 'Facebook', 'LinkedIn'];

	const handleSelect = (platform: React.SetStateAction<string>) => {
		setSelectedPlatform(platform);
		setCurrentPage(1); // Reset to page 1 on filter change
		setIsOpen(false);
	};

	return (
		<section className="py-32">
			<div className="max-w-[1200px] mx-auto px-4">
				<div className="flex flex-col gap-6 mb-12">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="flex items-center gap-4 w-full sm:w-auto">
							<div className="text-[10px] font-mono text-black/40 dark:text-white/40 flex items-center gap-2">
								<div className="w-1 h-1 bg-[#D94E1E]"></div>
								Social Media Performance Analysis | 2024
							</div>
							<div className="flex-1 sm:flex-none">
								<div className="flex items-center gap-2 px-3 py-1.5 border border-black/10 dark:border-white/10 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] w-full sm:w-[180px]">
									<Search className="w-3 h-3 text-black/40 dark:text-white/40" />
									<input
										type="text"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										placeholder="FILTER..."
										className="bg-transparent w-full text-[10px] font-mono text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none"
										spellCheck="false"
									/>
								</div>
							</div>
						</div>
						<div className="relative w-48">
							<button
								onClick={() => setIsOpen((prev) => !prev)}
								className="w-full px-3 py-1.5 text-left border border-black/10 dark:border-white/10 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] text-[10px] font-mono text-black dark:text-white focus:outline-none"
							>
								{selectedPlatform}
							</button>
							{isOpen && (
								<div className="absolute w-full mt-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-lg z-10">
									{platforms.map((platform) => (
										<div
											key={platform}
											onClick={() => handleSelect(platform)}
											className="px-3 py-1.5 text-[10px] font-mono text-black dark:text-white cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition"
										>
											{platform}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="overflow-x-auto scrollbar-hide border-t border-black/5 dark:border-white/10 mt-8">
					<div className="min-w-[800px]">
						<div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-black/5 dark:border-white/10 py-3">
							<div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 text-left">
								CATEGORY
							</div>
							<div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 text-right">
								LIKES
							</div>
							<div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 text-right">
								SHARES
							</div>
							<div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 text-right">
								COMMENTS
							</div>
						</div>
						<div className="divide-y divide-black/5 dark:divide-white/10">
							{currentData.map((item, index) => (
								<div
									key={index}
									className="grid grid-cols-[2fr_1fr_1fr_1fr] py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
								>
									<div className="px-4 font-mono text-black dark:text-white">
										{item.category}
									</div>
									<div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
										{item.likes}
									</div>
									<div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
										{item.shares}
									</div>
									<div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
										{item.comments}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8">
					<div className="text-[10px] font-mono text-black/40 dark:text-white/40 text-center sm:text-left">
						SHOWING {itemsPerPage * (currentPage - 1) + 1}-
						{Math.min(currentPage * itemsPerPage, filteredData.length)} OF{' '}
						{filteredData.length}
					</div>
					<div className="flex items-center gap-1">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed"
						>
							<ChevronLeft className="w-5 h-5 text-black/40 dark:text-white/40" />
						</button>
						{[...Array(totalPages)].map((_, i) => (
							<button
								key={i}
								onClick={() => handlePageChange(i + 1)}
								className={`w-8 h-8 text-[10px] font-mono border border-black/10 dark:border-white/10 transition-colors duration-200 ${
									currentPage === i + 1
										? 'bg-black dark:bg-white text-white dark:text-black'
										: 'text-black/40 dark:text-white/40 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
								}`}
							>
								{i + 1}
							</button>
						))}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] disabled:opacity-30 disabled:cursor-not-allowed"
						>
							<ChevronRight className="w-5 h-5 text-black/40 dark:text-white/40" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SocialMediaPerformance;
