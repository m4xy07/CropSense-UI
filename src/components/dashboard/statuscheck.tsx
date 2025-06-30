import React from 'react';
import * as HoverCardPrimitives from '@radix-ui/react-hover-card';
import { RiArrowRightUpLine, RiCheckboxCircleFill } from '@remixicon/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SelectFertilizer } from './fertilizerselect';

export function cx(...args) {
  return twMerge(clsx(...args));
}

const fertilizerTrackerData = {
  "NPK 15-15-15": [
    { date: '22 May, 2025', tooltip: 'Operational' },
    { date: '23 May, 2025', tooltip: 'Operational' },
    { date: '24 May, 2025', tooltip: 'Operational' },
    { date: '25 May, 2025', tooltip: 'Operational' },
    { date: '26 May, 2025', tooltip: 'Operational' },
    { date: '27 May, 2025', tooltip: 'Operational' },
    { date: '28 May, 2025', tooltip: 'Operational' },
    { date: '29 May, 2025', tooltip: 'Operational' },
    { date: '30 May, 2025', tooltip: 'Operational' },
    {
      date: '31 May, 2025',
      tooltip: 'Downtime',
      href: '#',
      description: 'Down for 2 hours. Learn more in status report.',
    },
    { date: '1 Jun, 2025', tooltip: 'Operational' },
    { date: '2 Jun, 2025', tooltip: 'Operational' },
    { date: '3 Jun, 2025', tooltip: 'Operational' },
    { date: '4 Jun, 2025', tooltip: 'Operational' },
    { date: '5 Jun, 2025', tooltip: 'Operational' },
    { date: '6 Jun, 2025', tooltip: 'Operational' },
    { date: '7 Jun, 2025', tooltip: 'Operational' },
    { date: '8 Jun, 2025', tooltip: 'Operational' },
    {
      date: '9 Jun, 2025',
      tooltip: 'Downtime',
      href: '#',
      description: 'Down for 1 hour. Learn more in status report.',
    },
    { date: '10 Jun, 2025', tooltip: 'Operational' },
    { date: '11 Jun, 2025', tooltip: 'Operational' },
    { date: '12 Jun, 2025', tooltip: 'Operational' },
    { date: '13 Jun, 2025', tooltip: 'Operational' },
    { date: '14 Jun, 2025', tooltip: 'Operational' },
    {
      date: '15 Jun, 2025',
      tooltip: 'Downtime',
      href: '#',
      description: 'Down for 1 hour and 10 minutes. Learn more in status report.',
    },
    { date: '16 Jun, 2025', tooltip: 'Operational' },
    { date: '17 Jun, 2025', tooltip: 'Operational' },
    { date: '18 Jun, 2025', tooltip: 'Operational' },
    { date: '19 Jun, 2025', tooltip: 'Operational' },
    { date: '20 Jun, 2025', tooltip: 'Operational' },
  ],
  "NPK 10-10-10": [
    { date: '22 May, 2025', tooltip: 'Operational' },
    { date: '23 May, 2025', tooltip: 'Operational' },
    { date: '24 May, 2025', tooltip: 'Maintenance' },
    { date: '25 May, 2025', tooltip: 'Operational' },
    { date: '26 May, 2025', tooltip: 'Operational' },
    { date: '27 May, 2025', tooltip: 'Downtime', href: '#', description: 'Down for 3 hours. Learn more in status report.' },
    { date: '28 May, 2025', tooltip: 'Operational' },
    { date: '29 May, 2025', tooltip: 'Operational' },
    { date: '30 May, 2025', tooltip: 'Operational' },
    { date: '31 May, 2025', tooltip: 'Operational' },
    { date: '1 Jun, 2025', tooltip: 'Operational' },
    { date: '2 Jun, 2025', tooltip: 'Operational' },
    { date: '3 Jun, 2025', tooltip: 'Operational' },
    { date: '4 Jun, 2025', tooltip: 'Operational' },
    { date: '5 Jun, 2025', tooltip: 'Operational' },
    { date: '6 Jun, 2025', tooltip: 'Operational' },
    { date: '7 Jun, 2025', tooltip: 'Operational' },
    { date: '8 Jun, 2025', tooltip: 'Operational' },
    { date: '9 Jun, 2025', tooltip: 'Operational' },
    { date: '10 Jun, 2025', tooltip: 'Operational' },
    { date: '11 Jun, 2025', tooltip: 'Operational' },
    { date: '12 Jun, 2025', tooltip: 'Operational' },
    { date: '13 Jun, 2025', tooltip: 'Operational' },
    { date: '14 Jun, 2025', tooltip: 'Operational' },
    { date: '15 Jun, 2025', tooltip: 'Operational' },
    { date: '16 Jun, 2025', tooltip: 'Operational' },
    { date: '17 Jun, 2025', tooltip: 'Operational' },
    { date: '18 Jun, 2025', tooltip: 'Operational' },
    { date: '19 Jun, 2025', tooltip: 'Operational' },
    { date: '20 Jun, 2025', tooltip: 'Operational' },
  ],
  "NPK 20-20-20": [
    { date: '22 May, 2025', tooltip: 'Operational' },
    { date: '23 May, 2025', tooltip: 'Operational' },
    { date: '24 May, 2025', tooltip: 'Operational' },
    { date: '25 May, 2025', tooltip: 'Operational' },
    { date: '26 May, 2025', tooltip: 'Operational' },
    { date: '27 May, 2025', tooltip: 'Operational' },
    { date: '28 May, 2025', tooltip: 'Operational' },
    { date: '29 May, 2025', tooltip: 'Operational' },
    { date: '30 May, 2025', tooltip: 'Maintenance' },
    { date: '31 May, 2025', tooltip: 'Operational' },
    { date: '1 Jun, 2025', tooltip: 'Operational' },
    { date: '2 Jun, 2025', tooltip: 'Downtime', href: '#', description: 'Down for 30 minutes. Learn more in status report.' },
    { date: '3 Jun, 2025', tooltip: 'Operational' },
    { date: '4 Jun, 2025', tooltip: 'Operational' },
    { date: '5 Jun, 2025', tooltip: 'Operational' },
    { date: '6 Jun, 2025', tooltip: 'Operational' },
    { date: '7 Jun, 2025', tooltip: 'Operational' },
    { date: '8 Jun, 2025', tooltip: 'Operational' },
    { date: '9 Jun, 2025', tooltip: 'Operational' },
    { date: '10 Jun, 2025', tooltip: 'Operational' },
    { date: '11 Jun, 2025', tooltip: 'Operational' },
    { date: '12 Jun, 2025', tooltip: 'Operational' },
    { date: '13 Jun, 2025', tooltip: 'Operational' },
    { date: '14 Jun, 2025', tooltip: 'Operational' },
    { date: '15 Jun, 2025', tooltip: 'Operational' },
    { date: '16 Jun, 2025', tooltip: 'Operational' },
    { date: '17 Jun, 2025', tooltip: 'Operational' },
    { date: '18 Jun, 2025', tooltip: 'Operational' },
    { date: '19 Jun, 2025', tooltip: 'Operational' },
    { date: '20 Jun, 2025', tooltip: 'Operational' },
  ],
};

// Map color for each fertilizer's tracker data
function getCombinedData(fertilizer) {
  const colorMapping = {
    Operational: 'bg-green-400',
    Downtime: 'bg-red-500',
    Maintenance: 'bg-amber-500',
  };
  // Normalize fertilizer value and keys: remove spaces/dashes, lowercase
  const normalize = (str) => (str || '').toLowerCase().replace(/\s|-/g, '');
  const normalizedFertilizer = normalize(fertilizer);
  const key = Object.keys(fertilizerTrackerData).find(k => normalize(k) === normalizedFertilizer);
  const data = key ? fertilizerTrackerData[key] : [];
  return data.map((item) => ({ ...item, color: colorMapping[item.tooltip] }));
}

const defaultBackgroundColor = 'bg-gray-200';

const Block = ({
	color,
	tooltip,
	date,
	href,
	description,
	hoverEffect,
}: {
	color?: string;
	tooltip: string;
	date: string;
	href?: string;
	description?: string;
	hoverEffect?: boolean;
}) => {
	const [open, setOpen] = React.useState(false);
	return (
		<HoverCardPrimitives.Root
			open={open}
			onOpenChange={setOpen}
			openDelay={0}
			closeDelay={0}
		>
			<HoverCardPrimitives.Trigger onClick={() => setOpen(true)} asChild>
				<div className="size-full overflow-hidden px-[0.5px] transition first:rounded-l-[4px] first:pl-0 last:rounded-r-[4px] last:pr-0 sm:px-px ">
					<div
						className={cx(
							'size-full rounded-[1px]',
							color || defaultBackgroundColor,
							hoverEffect ? 'hover:opacity-50' : '',
						)}
					/>
				</div>
			</HoverCardPrimitives.Trigger>
			<HoverCardPrimitives.Portal>
				<HoverCardPrimitives.Content
					sideOffset={10}
					side="top"
					align="center"
					avoidCollisions
					sticky="partial"
					className={cx(
						'group relative min-w-52 max-w-64 ',
						'text-tremor-content-strong',
						'main-dashboard-theme theme-color',
						'rounded-lg font-inter dashboard-equipment-select text-sm',
					)}
				>
					<div className="flex space-x-2 p-2">
						<div
							className={cx('w-1 shrink-0 rounded', color)}
							aria-hidden={true}
						/>
						<div>
							<p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
								<a href={href} className="focus:outline-none">
									{/* Extend link to entire tooltip */}
									<span className="absolute inset-0" aria-hidden="true" />
									{tooltip}
								</a>
							</p>
							{tooltip === 'Downtime' ? (
								<>
									<p className="mt-1 text-tremor-label text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis">
										{description}
									</p>
									<div
										className="my-2 h-px w-full bg-tremor-border dark:bg-dark-tremor-border"
										aria-hidden={true}
									/>
								</>
							) : null}
							<p className="mt-1 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
								{date}
							</p>
						</div>
					</div>
					{tooltip === 'Downtime' ? (
						<span
							className="pointer-events-none absolute right-2 top-2 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
							aria-hidden={true}
						>
							<RiArrowRightUpLine
								className="size-5 shrink-0"
								aria-hidden={true}
							/>
						</span>
					) : null}
				</HoverCardPrimitives.Content>
			</HoverCardPrimitives.Portal>
		</HoverCardPrimitives.Root>
	);
};

interface TrackerProps {
	data: Array<{
		color?: string;
		tooltip: string;
		date: string;
		href?: string;
		description?: string;
	}>;
	className?: string;
	hoverEffect?: boolean;
}

const Tracker = React.forwardRef<HTMLDivElement, TrackerProps>(
	({ data = [], className, hoverEffect, ...props }, forwardedRef) => {
		return (
			<div
				ref={forwardedRef}
				className={cx('flex h-10 items-center', className)}
				{...props}
			>
				{data.map((props, index) => (
					<Block
						key={index}
						hoverEffect={hoverEffect}
						{...props}
					/>
				))}
			</div>
		);
	},
);

Block.displayName = 'Tracker';

export default function StatusTracker() {
	const [fertilizer, setFertilizer] = React.useState("NPK 15-15-15");

	return (
		<>
		<div className='flex flex-col equipment-card-inner border border-zinc-50/10 rounded-xl w-1/3'>
		<div className='flex flex-row justify-between px-5 py-4 border-b border-b-zinc-50/10 rounded-t-xl'>
			<h2 className='text-[18px] font-normal mt-1'>
				Fertilizer Schedule
			</h2>
			<SelectFertilizer fertilizer={fertilizer} setFertilizer={setFertilizer} />
		</div>
		
			<div className="w-full space-y-6 px-5 py-4">
				<div>
					<p className="flex justify-between font-normal items-center">
						<span className="flex items-center gap-2 font-normal">
							 <span className="text-[14px]">
								{fertilizer}
							</span>
						</span>
						<span className="text-[14px] text-[#4ad476] font-normal">
							On schedule
						</span>
					</p>
					<Tracker
						hoverEffect
						data={getCombinedData(fertilizer)}
						className="mt-4 flex w-full"
					/>
					<div className="mt-4 flex items-center text-[14px] gap-3 font-normal">
						<span>29 days ago</span>
						<div className="flex-1 h-[1px] bg-zinc-50/10" />
						<span className="whitespace-nowrap">99.4% on time</span>
						<div className="flex-1 h-[1px] bg-zinc-50/10" />
						<span>Today</span>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}