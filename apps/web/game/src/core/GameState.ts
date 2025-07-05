export interface Player {
    id: string;
    address: string;
    position: number; // horizontal position on the lane
    lane: 'arbitrum' | 'optimism' | 'base'; // which blockchain lane
    pendingMove?: number; // position after move, waiting for confirmation
    isMoving?: boolean; // is currently in a movement animation
    isCurrentUser?: boolean; // indicates if this is the user's own player
}

export class GameState {
    // Lane configuration
    laneHeight: number = 120; // Increased from 80 for bigger lanes
    squareSize: number = 100; // Increased from 60 for bigger squares
    
    // Game state
    players: Player[] = [];
    currentPlayer: Player | null = null; // The user's own player
    
    // Camera position (for infinite scroll)
    cameraOffset: number = 0;
    
    // Movement confirmation
    playerAwaitingConfirmation: Player | null = null;
    
    // Lane colors for visual distinction
    laneColors = {
        arbitrum: 0x4A90E2,  // Blue
        optimism: 0xE74C3C,  // Red
        base: 0x2ECC71      // Green
    };
    
    // Lane labels
    laneLabels = {
        arbitrum: 'Arbitrum',
        optimism: 'Optimism', 
        base: 'Base Mainnet'
    };
    
    addPlayer(address: string, lane: 'arbitrum' | 'optimism' | 'base', isCurrentUser: boolean = false): Player {
        const newPlayer: Player = {
            id: Math.random().toString(36).substr(2, 9),
            address,
            position: 0,
            lane,
            isCurrentUser
        };
        
        this.players.push(newPlayer);
        
        // Set as current player if this is the user's player
        if (isCurrentUser) {
            this.currentPlayer = newPlayer;
        }
        
        return newPlayer;
    }
    
    setCurrentPlayer(address: string, lane: 'arbitrum' | 'optimism' | 'base'): Player {
        // Remove any existing current player
        this.players = this.players.filter(p => !p.isCurrentUser);
        
        // Add new current player
        const currentPlayer = this.addPlayer(address, lane, true);
        this.currentPlayer = currentPlayer;
        
        return currentPlayer;
    }
    
    removePlayer(playerId: string): void {
        const player = this.players.find(p => p.id === playerId);
        if (player?.isCurrentUser) {
            this.currentPlayer = null;
        }
        this.players = this.players.filter(p => p.id !== playerId);
    }
    
    getPlayersByLane(lane: 'arbitrum' | 'optimism' | 'base'): Player[] {
        return this.players.filter(p => p.lane === lane);
    }
    
    movePlayer(playerId: string, newPosition: number): void {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.pendingMove = newPosition;
            this.playerAwaitingConfirmation = player;
        }
    }
    
    moveCurrentPlayer(direction: 'left' | 'right'): void {
        console.log('moveCurrentPlayer called with direction:', direction);
        
        if (!this.currentPlayer) {
            console.log('No current player to move');
            return;
        }
        
        const currentPos = this.currentPlayer.pendingMove ?? this.currentPlayer.position;
        const newPos = direction === 'left' ? currentPos - 1 : currentPos + 1;
        
        console.log('Moving current player from', currentPos, 'to', newPos);
        
        this.movePlayer(this.currentPlayer.id, newPos);
        
        console.log('Current player after move:', this.currentPlayer);
    }
    
    confirmPlayerMove(playerId: string): void {
        const player = this.players.find(p => p.id === playerId);
        if (player && player.pendingMove !== undefined) {
            player.position = player.pendingMove;
            player.pendingMove = undefined;
            this.playerAwaitingConfirmation = null;
        }
    }
    
    cancelPlayerMove(playerId: string): void {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.pendingMove = undefined;
            this.playerAwaitingConfirmation = null;
        }
    }
    
    hasCurrentPlayer(): boolean {
        return this.currentPlayer !== null;
    }
    
    getCurrentPlayerPosition(): { x: number, y: number } | null {
        if (!this.currentPlayer) return null;
        
        const laneIndex = this.currentPlayer.lane === 'arbitrum' ? 0 : 
                         this.currentPlayer.lane === 'optimism' ? 1 : 2;
        const y = (laneIndex * (window.innerHeight / 3)) + (window.innerHeight / 6);
        const x = this.currentPlayer.position * this.squareSize;
        
        return { x, y };
    }
    
    reset(): void {
        this.players = [];
        this.currentPlayer = null;
        this.cameraOffset = 0;
        this.playerAwaitingConfirmation = null;
    }
}

export const gameState = new GameState();