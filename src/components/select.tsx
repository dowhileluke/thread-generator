import { ChangeEvent, useId } from 'react'
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from '@mui/material'

type SelectProps<T> = {
	label: string;
	options: T[];
	value: T;
	onChange: (value: T) => void;
}

export function Select<T>({ label, options, value, onChange }: SelectProps<T>) {
	const labelId = useId()
	const val = String(value)
	const opts = options.map(o => String(o))

	function handleChange(e: SelectChangeEvent) {
		const nextVal = e.target.value
		const nextIndex = opts.findIndex(o => o === nextVal)

		if (nextIndex >= 0) {
			onChange(options[nextIndex])
		}
	}

	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<MuiSelect sx={{ minWidth: '4rem' }} label={label} labelId={labelId} value={val} onChange={handleChange}>
				{opts.map(o => (
					<MenuItem key={o} value={o}>{o}</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	)
}