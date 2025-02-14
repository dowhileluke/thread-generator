import { useEffect, useMemo, useState } from 'react'
import { generateArray } from '@dowhileluke/fns'
import { generate } from '../functions/generate'
import { Select } from './select'
import { EXAMPLE_NAMES, FORCES } from '../const'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, List, ListItem, TextField } from '@mui/material'
import { Delete, PersonAdd } from '@mui/icons-material'

const PERSIST_KEY = 'thread-gen-names'
const persistedNames = localStorage.getItem(PERSIST_KEY)
const initialNames: string[] = persistedNames ? JSON.parse(persistedNames) : generateArray(4, () => '')
const lenOptions = generateArray(4, 52)

function toReplacedNames(names: string[]) {
	return names.map((n, i) => n || EXAMPLE_NAMES[i])
}

export function App() {
	const [isOpen, setIsOpen] = useState(false)
	const [tempNames, setTempNames] = useState(initialNames)
	const [names, setNames] = useState(initialNames)
	const replacedNames = useMemo(() => toReplacedNames(names), [names])
	const [len, setLen] = useState(12)
	const [isForced, setIsForced] = useState(false)
	const threads = useMemo(() => generate(replacedNames, 52, isForced), [replacedNames, isForced])
	const canForce = Boolean(FORCES[replacedNames.length])

	useEffect(() => {
		localStorage.setItem(PERSIST_KEY, JSON.stringify(names))
	}, [names])

	function updateNames(index: number, name: string) {
		setTempNames(prev => prev.map((prevName, i) => i === index ? name : prevName))
	}

	function addBlank() {
		setTempNames(prev => {
			if (prev.length > 12) return prev

			return prev.concat('')
		})
	}

	function removeName(index: number) {
		setTempNames(prev => {
			if (prev.length < 5) return prev

			return prev.filter((_, i) => i !== index)
		})
	}
	

	function revertNames() {
		setTempNames(names)
	}

	function saveNames() {
		setNames(tempNames)
		setIsOpen(false)
	}

	return (
		<>
			<nav>
				<Button variant="contained" onClick={() => setIsOpen(true)}>
					{replacedNames.length} participants
				</Button>
				<Select label="Length" options={lenOptions} value={len} onChange={setLen} />
				<FormControlLabel control={
					<Checkbox checked={isForced && canForce} onChange={e => setIsForced(e.target.checked)} disabled={!canForce} />
				} label="Full Inclusion" />
			</nav>
			<Divider />
			{threads.map((thread, i) => (
				<dl key={i}>
					<dt>Thread {i + 1}</dt>
					<dd>
						{thread.slice(0, len).join(' \u2192 ')}
					</dd>
				</dl>
			))}
			<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg">
				<DialogTitle>Customize Participants ({tempNames.length})</DialogTitle>
				<DialogContent>
					<List>
						{tempNames.map((n, i) => (
							<ListItem key={i}>
								<TextField
									value={n}
									onChange={e => updateNames(i, e.target.value)}
									label={`Name ${i + 1}`}
									variant="outlined"
									placeholder={EXAMPLE_NAMES[i]}
								/>
								<IconButton disabled={tempNames.length < 5} onClick={() => removeName(i)}>
									<Delete />
								</IconButton>
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions sx={{ gap: '1em', justifyContent: 'space-between' }}>
					<IconButton onClick={addBlank} disabled={tempNames.length > 12}>
						<PersonAdd />
					</IconButton>
					<Button onClick={revertNames} disabled={names === tempNames}>Revert</Button>
					<Button variant="contained" onClick={saveNames}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
