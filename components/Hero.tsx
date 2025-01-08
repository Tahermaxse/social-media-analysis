import React from 'react';
import WaveAnimation from './lines/WaveAnimation';

const Hero = () => {
	return (
		<div>
			<header className="h-screen flex flex-col relative bg-white dark:bg-black overflow-hidden">
				<div className="relative z-50 flex-1 flex flex-col">
					<div className="flex-1 flex items-center justify-center">
						<div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6">
							<div
								className="max-w-2xl mx-auto space-y-8 sm:space-y-12 text-center sm:mt-[5rem]"
								style={{ opacity: 1, transform: 'none' }}
							>
								<a
									href="https://github.com/Tahermaxse/social-media-analysis"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-3 py-1.5 
            text-[10px] font-mono
            text-black/40 dark:text-white/40 
            border border-black/5 dark:border-white/10
            hover:border-[#D94E1E]/20 hover:text-[#D94E1E] 
            hover:dark:border-[#D94E1E]/20 hover:dark:text-[#D94E1E]
            rounded-md
            transition-colors"
								>
									<span className="flex items-center gap-1 tracking-wider">
										TEAM:
										<img
											src="/ferranax logo.webp"
											alt="Ferranax Logo"
											className="w-4 h-4 rounded-full"
										/>
										FERRANAX
									</span>
								</a>
								<div className="space-y-6">
									<h1 className="text-3xl sm:text-5xl md:text-7xl font-mono tracking-tight font-bold">
										Social Media Performance Analysis
									</h1>
									<p className="text-base sm:text-lg text-black/60 dark:text-white/60 max-w-xl mx-auto">
										Unlock insights into your social media impact with real-time
										performance metrics and analytics.
									</p>
								</div>
								<div className="space-y-8">
									<div className="flex justify-center gap-12">
										<div className="space-y-1 text-center">
											<div className="text-3xl sm:text-4xl font-light tabular-nums">
												9,170
											</div>
											<div className="text-[10px] font-mono text-black/40 dark:text-white/40">
												TOTAL LIKES (LAST 7 DAYS)
											</div>
										</div>
										<div className="space-y-1 text-center">
											<div className="text-3xl sm:text-4xl font-light tabular-nums">
												295.8
											</div>
											<div className="text-[10px] font-mono text-black/40 dark:text-white/40">
												AVERAGE LIKES (7 DAY AVG)
											</div>
										</div>
									</div>
									<div className="text-[10px] font-mono text-black/40 dark:text-white/40">
										<span>REFRESHES DAILY</span>
										<span className="mx-2">·</span>
										<span>UNOFFICIAL</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute inset-x-0 bottom-0 h-[30vh] sm:h-[40vh]">
					<div className="relative w-full h-full">
						<div className="absolute inset-0 w-full h-full opacity-95 pointer-events-none">
							<WaveAnimation />
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Hero;
