import React from 'react';
interface HeaderProps {
	title: string;
	actions?: React.ReactNode[];
}

const Header: React.FC<HeaderProps> = ({ title, actions, ...props }) => {
	return (
		<div className="App__header">
			<div className="App__headerTitle flex-1 min-w-0">
				<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					{title}
				</h2>
			</div>
			<div className="App__headerActions mt-4 flex md:mt-0 md:ml-4">
				{actions?.map((action) => action)}
			</div>
		</div>
	);
};

export default Header;
