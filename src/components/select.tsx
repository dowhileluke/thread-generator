import { ChangeEvent } from 'react'

type SelectProps<T> = {
	options: T[];
	value: T;
	onChange: (value: T) => void;
}

export function Select<T>({ options, value, onChange }: SelectProps<T>) {
	const val = String(value)
	const opts = options.map(o => String(o))

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const nextVal = e.target.value
		const nextIndex = opts.findIndex(o => o === nextVal)

		if (nextIndex >= 0) {
			onChange(options[nextIndex])
		}
	}

	return (
		<select value={val} onChange={handleChange}>
			{opts.map(o => (
				<option key={o} value={o}>{o}</option>
			))}
		</select>
	)
}