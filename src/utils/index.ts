import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
	return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
	return todo.status === TodoStatus.ACTIVE;
}

export interface DateTimeFormat {
	day: string;
	dayPeriod: string;
	hour: string;
	minute: string;
	month: string;
	second: string;
	year: string;
}

export function formatDate(date: Date) {
	let p: DateTimeFormat = new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	})
		.formatToParts(date)
		.reduce((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {} as any);

	return `${p.day}/${p.month}/${p.year}, ${p.hour}:${p.minute}:${
		p.second
	} ${p.dayPeriod.toLowerCase()}`;
}
