import { PATTERNS } from '../patterns'

const ERR = [['ERROR']]

const FORCES: Record<number, number> = {
	5: 4,
	7: 4,
	9: 4,
	11: 7,
}

export function generate(names: string[], length: number, isForced = false) {
	let pattern = PATTERNS[names.length]?.slice()

	if (!pattern) {
		return ERR
	}

	if (isForced) {
		const force = FORCES[names.length]

		if (force) {
			pattern.push(force)
		}
	}

	while (pattern.length < length) {
		pattern = pattern.concat(pattern)
	}

	return names.map((_, threadIndex) => Array.from({ length }, (_, weekIndex) => {
		const nameIndex = (threadIndex + pattern[weekIndex]) % names.length

		return names[nameIndex]
	}))
}
