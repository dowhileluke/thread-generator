import { PATTERNS } from '../patterns'

const ERR = [['ERROR']]

export function generate(names: string[], length: number) {
	let pattern = PATTERNS[names.length]?.slice()

	if (!pattern) {
		return ERR
	}

	while (pattern.length < length) {
		pattern = pattern.concat(pattern)
	}

	return names.map((_, threadIndex) => Array.from({ length }, (_, weekIndex) => {
		const nameIndex = (threadIndex + pattern[weekIndex]) % names.length

		return names[nameIndex]
	}))
}
