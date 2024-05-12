const MessageSkeleton = () => {
	return (
		<>
			<div className='flex mt-2 gap-3 items-center'>
				<div className='skeleton w-10 h-10 bg-gray-400 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton bg-gray-400 h-4 w-40'></div>
					<div className='skeleton bg-gray-400 h-4 w-40'></div>
				</div>
			</div>
			<div className='flex mt-2 gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton bg-gray-400 h-4 w-40'></div>
				</div>
				<div className='skeleton bg-gray-400 w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageSkeleton;
