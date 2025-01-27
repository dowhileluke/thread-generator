function triangle(n: number) {
	return n * (n + 1) / 2
}

export function simple(length: number) {
	return Array.from({ length }, (_, i) => triangle(i) % length)
}
