export type Owner = 'ai' | 'player' | null

export type Cell = {
	owner: Owner
}

export type GameOverlay = null | 'draw' | 'input' | 'lost' | 'won'

export type GameResult = 'ai' | 'draw' | 'player' | null

export type GameScreen = 'game' | 'highScores' | 'howToPlay' | 'menu'

export type MoveResult = {
	changed: number
	columnCaptured: boolean
}

export type Score = {
	ai: number
	aiColumns: number
	player: number
	playerColumns: number
	target: number
}

export type Turn = 'ai' | 'player'