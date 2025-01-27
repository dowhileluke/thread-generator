import { useMemo, useState } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { generate } from '../functions/generate'
import { Select } from './select'

const NAMES = ['Abner', 'Bartholomew', 'Calliope', 'Deirdre', 'Ephraim', 'Faustus', 
'Guinevere', 'Harper', 'Isadore', 'Juliet', 'Kensington', 'Ludwig', 'Marcella']

// const CHARS = 'ABCDEFGHIJKLM'.split('')

const sizeOptions = generateArray(4, 13)
const lenOptions = generateArray(4, 52)

export function App() {
	const [size, setSize] = useState(5)
	const [len, setLen] = useState(12)
	const [isForced, setIsForced] = useState(false)
	const threads = useMemo(() => generate(NAMES.slice(0, size), 52, isForced), [size, isForced])

	return (
		<div>
			<div>
				<label>
					Participants: <Select options={sizeOptions} value={size} onChange={setSize} />
				</label>
				<br />
				<label>
					Length: <Select options={lenOptions} value={len} onChange={setLen} />
				</label>
				<br />
				<label>
					Full Inclusion: <input type="checkbox" checked={isForced} onChange={e => setIsForced(e.target.checked)} />
				</label>
			</div>
			{threads.map((thread, i) => (
				<dl>
					<dt>Thread {i + 1}</dt>
					<dd>
						{thread.slice(0, len).join(' \u2192 ')}
					</dd>
				</dl>
			))}
		</div>
	)
}
