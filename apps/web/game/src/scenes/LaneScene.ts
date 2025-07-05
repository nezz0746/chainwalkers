import * as Phaser from 'phaser';
import { gameState, Player } from '../core/GameState';

export class LaneScene extends Phaser.Scene {
    private lanes: Phaser.GameObjects.Group[] = [];
    private laneLabels: Phaser.GameObjects.Text[] = [];
    private playerSprites: Map<string, Phaser.GameObjects.Sprite> = new Map();
    private playerAddressTexts: Map<string, Phaser.GameObjects.Text> = new Map();
    private gridLines: Phaser.GameObjects.Graphics[] = [];
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys!: any;
    private selectedPlayer: Player | null = null;
    
    // UI elements
    private confirmButton?: Phaser.GameObjects.Container;
    private addPlayerButton?: Phaser.GameObjects.Container;
    private createPlayerButton?: Phaser.GameObjects.Container;
    private selectedPlayerIndicator?: Phaser.GameObjects.Rectangle;
    private currentPlayerIndicator?: Phaser.GameObjects.Graphics;
    
    // Movement system improvements
    private playerTargetPositions: Map<string, { x: number; y: number }> = new Map();
    private playersAnimating: Set<string> = new Set();
    private lastPlayerMoveTime: number = 0;
    private playerMoveAnimationDuration: number = 500; // ms
    private movementCooldown: number = 300; // ms between moves
    
    // Debug logging throttling
    private lastDebugTime: number = 0;
    private debugInterval: number = 2000; // Log every 2 seconds instead of every frame
    
    // Performance optimization
    private lastCameraUpdate: number = 0;
    
    constructor() {
        super('LaneScene');
    }

    create() {
        console.log('🚀 LaneScene: Starting scene creation...');
        console.log('📊 Scene dimensions:', this.scale.width, 'x', this.scale.height);
        
        try {
            // Set up camera bounds for infinite scrolling
            this.cameras.main.setBounds(-10000, 0, 20000, this.scale.height);
            console.log('📷 Camera bounds set');
            
            // Create the three lanes
            console.log('🛣️ Creating lanes...');
            this.createLanes();
            console.log('✅ Lanes created');
            
            // Create input handlers
            console.log('⌨️ Creating input handlers...');
            this.createInputs();
            console.log('✅ Input handlers created');
            
            // Create UI - THIS IS CRITICAL
            console.log('🎮 About to create UI...');
            console.log('🎮 GameState current player before UI:', gameState.currentPlayer);
            console.log('🎮 GameState hasCurrentPlayer():', gameState.hasCurrentPlayer());
            
            this.createUI();
            
            console.log('✅ UI creation method called');
            
            // Add some demo players (but not the user's player)
            console.log('👥 Adding demo players...');
            this.addDemoPlayers();
            console.log('✅ Demo players added');
            
            // Focus camera on current player or demo players
            console.log('📷 Focusing camera...');
            this.focusCamera();
            console.log('✅ Camera focused');
            
            // Ensure the game canvas has focus for keyboard input
            this.input.on('pointerdown', () => {
                // Focus the game canvas when clicked
                if (this.game.canvas) {
                    this.game.canvas.focus();
                }
            });
            
            // Auto-focus on game start
            this.time.delayedCall(100, () => {
                if (this.game.canvas) {
                    this.game.canvas.focus();
                }
            });
            
            console.log('✅ LaneScene: Scene creation completed!');
            console.log('📊 Final state - Total players:', gameState.players.length);
            console.log('📊 Final state - Current player:', gameState.currentPlayer?.address);
            
            // Add a test to make sure buttons are working
            this.time.delayedCall(1000, () => {
                console.log('🔍 Checking UI elements after 1 second...');
                console.log('📊 Create button exists:', !!this.createPlayerButton);
                console.log('📊 Add NPC button exists:', !!this.addPlayerButton);
                console.log('📊 Confirm button exists:', !!this.confirmButton);
                
                if (this.createPlayerButton) {
                    console.log('📊 Create button position:', this.createPlayerButton.x, this.createPlayerButton.y);
                    console.log('📊 Create button visible:', this.createPlayerButton.visible);
                    console.log('📊 Create button active:', this.createPlayerButton.active);
                    console.log('📊 Create button depth:', this.createPlayerButton.depth);
                }
                
                if (this.addPlayerButton) {
                    console.log('📊 NPC button position:', this.addPlayerButton.x, this.addPlayerButton.y);
                    console.log('📊 NPC button visible:', this.addPlayerButton.visible);
                    console.log('📊 NPC button active:', this.addPlayerButton.active);
                    console.log('📊 NPC button depth:', this.addPlayerButton.depth);
                }
                
                // Add visual debug markers where buttons should be
                const debugMarker1 = this.add.graphics();
                debugMarker1.fillStyle(0xFF0000, 0.5);
                debugMarker1.fillCircle(this.scale.width - 150, 100, 10);
                debugMarker1.setScrollFactor(0);
                debugMarker1.setDepth(2000);
                
                const debugMarker2 = this.add.graphics();
                debugMarker2.fillStyle(0x00FF00, 0.5);
                debugMarker2.fillCircle(this.scale.width - 150, 180, 10);
                debugMarker2.setScrollFactor(0);
                debugMarker2.setDepth(2000);
                
                console.log('🔴 Red marker at:', this.scale.width - 150, 100, '(should be Create button)');
                console.log('🟢 Green marker at:', this.scale.width - 150, 180, '(should be NPC button)');
                
                // Remove markers after 5 seconds
                this.time.delayedCall(5000, () => {
                    debugMarker1.destroy();
                    debugMarker2.destroy();
                });
            });
            
        } catch (error) {
            console.error('❌ Error in scene creation:', error);
        }
    }
    
    createLanes() {
        const laneHeight = gameState.laneHeight;
        const { topPadding, laneSpacing } = this.getLanePositioning();
        
        // Add desert background first
        this.createDesertBackground();
        
        const laneTypes: ('arbitrum' | 'optimism' | 'base')[] = ['arbitrum', 'optimism', 'base'];
        
        laneTypes.forEach((laneType, index) => {
            const y = topPadding + (index * laneSpacing) + (laneSpacing / 2);
            
            // Create subtle desert path/track instead of colored lanes
            // const desertPath = this.add.graphics();
            // desertPath.fillStyle(0x8B4513, 0.1); // Very subtle brown sand path
            // desertPath.fillRect(-10000, y - laneHeight/2, 20000, laneHeight);
            
            // Create minimal sand dune borders instead of colored borders
            // const sandBorder = this.add.graphics();
            // sandBorder.lineStyle(2, 0xD2B48C, 0.6); // Sandy brown, subtle
            // sandBorder.strokeRect(-10000, y - laneHeight/2, 20000, laneHeight);
            
            // Create grid lines for squares
            this.createGridLines(laneType, y);
            
            // Create lane label
            const label = this.add.text(50, y - laneHeight/2 + 20, gameState.laneLabels[laneType], {
                fontSize: '24px',
                color: '#ffffff',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            });
            label.setScrollFactor(0); // Keep label fixed to camera
            this.laneLabels.push(label);
            
            // Create lane group
            const laneGroup = this.add.group();
            this.lanes.push(laneGroup);
        });
    }
    
    // Helper method to calculate lane positioning
    getLanePositioning() {
        const totalHeight = this.scale.height;
        const topPadding = totalHeight * 0.15; // 15% padding at top (reduced from 20%)
        const bottomPadding = totalHeight * 0.15; // 15% padding at bottom (reduced from 20%)
        const usableHeight = totalHeight - topPadding - bottomPadding;
        const laneSpacing = usableHeight / 3;
        
        return { topPadding, bottomPadding, usableHeight, laneSpacing };
    }
    
    createDesertBackground() {
        // Create desert sand background
        const desertBg = this.add.graphics();
        desertBg.fillStyle(0xF4A460, 1); // Sandy brown color
        desertBg.fillRect(-10000, 0, 20000, this.scale.height);
        desertBg.setDepth(-100); // Behind everything
        
        // Add desert texture pattern
        this.createDesertTexture();
        
        // Add sun in the sky
        this.createSun();
        
        // Add distant dunes on horizon
        this.createDistantDunes();
    }
    
    createDesertTexture() {
        // Performance optimization: Create fewer, larger sand patterns
        // Reduce the number of objects by using larger spacing and a single graphics object
        const sandGraphics = this.add.graphics();
        sandGraphics.setDepth(-90);
        
        // Create sand texture with fewer iterations for better performance
        for (let x = -10000; x <= 20000; x += 300) { // Doubled spacing for performance
            for (let y = 0; y <= this.scale.height; y += 300) { // Doubled spacing for performance
                const alpha = Math.random() * 0.15 + 0.08;
                const size = Math.random() * 6 + 3; // Larger dots to compensate for fewer
                sandGraphics.fillStyle(0xDDB892, alpha);
                sandGraphics.fillCircle(x + Math.random() * 300, y + Math.random() * 300, size);
            }
        }
    }
    
    createSun() {
        // Create desert sun
        const sun = this.add.circle(this.scale.width * 0.8, this.scale.height * 0.2, 80, 0xFFD700); // Increased from 40
        sun.setScrollFactor(0); // Fixed to camera
        sun.setDepth(-80);
        
        // Add sun glow effect
        const sunGlow = this.add.circle(this.scale.width * 0.8, this.scale.height * 0.2, 120, 0xFFD700); // Increased from 60
        sunGlow.setAlpha(0.3);
        sunGlow.setScrollFactor(0);
        sunGlow.setDepth(-81);
    }
    
    createDistantDunes() {
        // Performance optimization: Create fewer but larger dunes
        const duneGraphics = this.add.graphics();
        duneGraphics.fillStyle(0xCD853F, 0.4); // Darker sandy brown for distance
        
        // Draw fewer dune shapes for better performance
        for (let i = 0; i < 6; i++) { // Reduced from 10 to 6
            const x = (i * 3000) - 5000; // Increased spacing
            const height = Math.random() * 200 + 100;
            const width = Math.random() * 1600 + 800;
            
            duneGraphics.fillEllipse(x, this.scale.height * 0.7, width, height);
        }
        
        duneGraphics.setScrollFactor(0.2); // Parallax effect
        duneGraphics.setDepth(-70);
    }
    
    createGridLines(laneType: 'arbitrum' | 'optimism' | 'base', y: number) {
        const squareSize = gameState.squareSize;
        const laneHeight = gameState.laneHeight;
        
        // Remove grid lines for a cleaner "free" look as requested
        // Only keep very subtle lane boundaries
        const pathGraphics = this.add.graphics();
        
        // Draw only very subtle horizontal path boundaries
        pathGraphics.lineStyle(1, 0xCD853F, 0.2); // Very subtle desert sand color
        pathGraphics.moveTo(-10000, y - laneHeight/2);
        pathGraphics.lineTo(20000, y - laneHeight/2);
        pathGraphics.moveTo(-10000, y + laneHeight/2);
        pathGraphics.lineTo(20000, y + laneHeight/2);
        
        pathGraphics.strokePath();
        this.gridLines.push(pathGraphics);
        
        // Add desert elements for visual interest
        this.createDesertElements(laneType, y);
    }
    
    createDesertElements(laneType: 'arbitrum' | 'optimism' | 'base', y: number) {
        const squareSize = gameState.squareSize;
        const laneHeight = gameState.laneHeight;
        
        // Performance optimization: Reduce position marker density
        for (let x = -200; x <= 1000; x += squareSize * 10) { // Increased from *5 to *10
            const markerNumber = Math.floor(x / squareSize);
            
            // Create desert stone marker instead of colored background
            const stoneMarker = this.add.graphics();
            stoneMarker.fillStyle(0x8B4513, 0.4); // Brown stone color
            stoneMarker.fillCircle(x, y, 15);
            
            // Add marker number text with desert styling
            const markerText = this.add.text(x, y, markerNumber.toString(), {
                fontSize: '16px',
                color: '#654321',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            });
            markerText.setOrigin(0.5);
        }
        
        // Performance optimization: Reduce vegetation density for better performance
        for (let x = -300; x <= 1200; x += squareSize * 6) { // Increased spacing from *4 to *6
            // Use specific grass sprites as requested
            const grassSprites = ['backyard_grass_1', 'backyard_grass_2'];
            const randomGrass = grassSprites[Math.floor(Math.random() * grassSprites.length)] || 'backyard_grass_1';
            
            if (this.textures.exists(randomGrass)) {
                const grass = this.add.image(x, y, randomGrass);
                grass.setScale(0.8);
                grass.setAlpha(0.8);
            } else {
                // Fallback: Create simple grass representation
                const grassGraphics = this.add.graphics();
                grassGraphics.fillStyle(0x228B22, 0.6); // Green grass
                grassGraphics.fillCircle(x, y, 12);
            }
        }
        
        // Performance optimization: Reduce stone density
        for (let x = -300; x <= 1200; x += squareSize * 5) { // Increased spacing from *3 to *5
            if (x % (squareSize * 10) !== 0) { // Avoid overlap with position markers
                // Use specific stone sprite as requested
                if (this.textures.exists('backyard_stone_2')) {
                    const stone = this.add.image(x, y + laneHeight/3, 'backyard_stone_2');
                    stone.setScale(0.6 + Math.random() * 0.4);
                    stone.setAlpha(0.8);
                } else {
                    // Fallback: Simple stone graphics
                    const stoneGraphics = this.add.graphics();
                    stoneGraphics.fillStyle(0x696969, 0.6);
                    stoneGraphics.fillCircle(x, y + laneHeight/3, 6 + Math.random() * 6);
                }
            }
        }
        
        // Performance optimization: Reduce boundary dune density
        for (let x = -500; x <= 1500; x += squareSize * 15) { // Increased from *10 to *15
            // Top boundary: small dunes
            const topDune = this.add.graphics();
            topDune.fillStyle(0xDDB892, 0.5);
            topDune.fillEllipse(x, y - laneHeight/2 - 8, 40, 16);
            
            // Bottom boundary: small dunes
            const bottomDune = this.add.graphics();
            bottomDune.fillStyle(0xDDB892, 0.5);
            bottomDune.fillEllipse(x, y + laneHeight/2 + 8, 40, 16);
        }
        
        // Add enemies far ahead on the line - creating good zones, bad zones, then good zones
        // Place backyard_enemy_3 very far ahead to create challenge zones
        const farPosition = 2000; // Far ahead position
        if (this.textures.exists('backyard_enemy_3')) {
            const enemy3 = this.add.image(farPosition, y, 'backyard_enemy_3');
            enemy3.setScale(1.2); // Make it prominent
            enemy3.setAlpha(0.9);
            console.log('🐉 Placed backyard_enemy_3 at far position:', farPosition, 'on lane:', laneType);
        } else {
            // Fallback: Create a menacing red graphics enemy
            const enemyGraphics = this.add.graphics();
            enemyGraphics.fillStyle(0xFF0000, 0.8); // Red color for danger
            enemyGraphics.fillCircle(farPosition, y, 30);
            console.log('🐉 Placed fallback enemy at far position:', farPosition, 'on lane:', laneType);
        }
    }
    
    getLaneColorHex(laneType: 'arbitrum' | 'optimism' | 'base'): string {
        switch (laneType) {
            case 'arbitrum': return '#4A90E2';
            case 'optimism': return '#E74C3C';
            case 'base': return '#2ECC71';
            default: return '#ffffff';
        }
    }
    
    createInputs() {
        console.log('⌨️ Setting up input handlers...');
        
        if (!this.input.keyboard) {
            console.warn('❌ Keyboard input not available');
            return;
        }
        
        // Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log('✅ Cursor keys created');
        
        // Create WASD keys
        this.wasdKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        console.log('✅ WASD keys created');
        
        // Add general click handler for deselecting when clicking empty space
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // Use a small delay to let player click handlers run first
            this.time.delayedCall(10, () => {
                if (!(this as any).playerWasClicked) {
                    console.log('👆 Clicked on empty space - deselecting current player');
                    this.selectPlayer(null);
                }
                (this as any).playerWasClicked = false; // Reset flag
            });
        });
        
        // Add general pointer events for debugging
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            // Only log occasionally to avoid spam
            if (Math.random() < 0.001) {
                console.log('🖱️ Mouse at:', pointer.x, pointer.y);
            }
        });
        
        // Ensure the game canvas has focus for keyboard input
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            // Debug keyboard events
            console.log('⌨️ Key pressed:', event.key, event.code);
        });
        
        console.log('✅ Input handlers setup complete');
    }
    
    createUI() {
        console.log('🎯 Creating UI elements...');
        console.log('📊 Screen size:', this.scale.width, 'x', this.scale.height);
        console.log('📊 Has current player:', gameState.hasCurrentPlayer());
        
        try {
            // Fixed button positioning - adjusted for larger buttons
            const buttonX = this.scale.width - 200; // Increased from 150px to account for larger buttons
            const createButtonY = 120; // Moved down slightly

            console.log('🔘 Button position calculated - X:', buttonX, 'Create Y:', createButtonY);

            // Create Player button (for user to create their own player)
            console.log('🔘 Creating "Create My Player" button...');
            this.createPlayerButton = this.add.container(buttonX, createButtonY);

            const createBg = this.add.rectangle(0, 0, 330, 90, gameState.hasCurrentPlayer() ? 0x666666 : 0x27AE60); // Increased size
            createBg.setInteractive({ useHandCursor: true });
            createBg.setStrokeStyle(4, 0x2980b9); // Thicker border

            const createLabel = this.add.text(0, 0, 'Create My Player', {
                fontSize: '24px', // Increased from 16px
                color: '#ffffff',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            });
            createLabel.setOrigin(0.5);

            this.createPlayerButton.add([createBg, createLabel]);
            this.createPlayerButton.setScrollFactor(0);
            this.createPlayerButton.setDepth(1000);

            // Add click handler for create button
            createBg.on('pointerdown', () => {
                console.log('🎯 Create My Player button clicked!');
                this.showCreatePlayerDialog();
            });

            createBg.on('pointerover', () => {
                console.log('🖱️ Hovering over Create My Player button');
                createBg.setFillStyle(gameState.hasCurrentPlayer() ? 0x666666 : 0x229954);
                this.createPlayerButton?.setScale(1.05);
            });

            createBg.on('pointerout', () => {
                createBg.setFillStyle(gameState.hasCurrentPlayer() ? 0x666666 : 0x27AE60);
                this.createPlayerButton?.setScale(1.0);
            });

            console.log('✅ Create My Player button created at:', buttonX, createButtonY);

            // Confirm Movement button (initially hidden)
            this.confirmButton = this.add.container(this.scale.width / 2, this.scale.height - 120); // Moved up a bit

            const confirmBg = this.add.rectangle(0, 0, 300, 90, 0xE74C3C); // Increased size
            confirmBg.setInteractive({ useHandCursor: true });
            confirmBg.setStrokeStyle(4, 0xC0392B); // Thicker border

            const confirmLabel = this.add.text(0, 0, 'Confirm Movement', {
                fontSize: '24px', // Increased from 16px
                color: '#ffffff',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            });
            confirmLabel.setOrigin(0.5);

            this.confirmButton.add([confirmBg, confirmLabel]);
            this.confirmButton.setScrollFactor(0);
            this.confirmButton.setDepth(1000);
            this.confirmButton.setVisible(false);

            confirmBg.on('pointerdown', () => {
                console.log('🎯 Confirm Movement button clicked!');
                this.confirmPlayerMovement();
            });

            console.log('✅ Confirm Movement button created');

            // Update UI based on current player status
            this.updateUI();

            console.log('✅ UI elements created successfully');
            console.log('📊 Total UI elements created: 2 buttons');

        } catch (error) {
            console.error('❌ Error creating UI:', error);
        }
    }
    
    addDemoPlayers() {
        // Add demo players to each lane (but not as the current user)
        gameState.addPlayer('0x1234...demo1', 'arbitrum', false);
        gameState.addPlayer('0x5678...demo2', 'optimism', false);
        gameState.addPlayer('0x9abc...demo3', 'base', false);
        
        this.updatePlayerSprites();
    }
    
    updatePlayerSprites() {
        // Remove old sprites and texts
        this.playerSprites.forEach(sprite => sprite.destroy());
        this.playerAddressTexts.forEach(text => text.destroy());
        this.playerSprites.clear();
        this.playerAddressTexts.clear();
        
        // Create new sprites for all players
        gameState.players.forEach(player => {
            const sprite = this.createPlayerSprite(player);
            this.playerSprites.set(player.id, sprite);
        });
        
        // Update current player indicator
        this.updateCurrentPlayerIndicator();
    }
    
    createPlayerSprite(player: Player): Phaser.GameObjects.Sprite {
        const { x, y } = this.getPlayerPosition(player);
        
        // Create a container for the player with background
        const playerContainer = this.add.container(x, y);
        
        // Add colored background based on lane
        const bgTexture = `player_${player.lane}_bg`;
        const background = this.add.image(0, 0, bgTexture);
        playerContainer.add(background);
        
        // Check which player texture to use
        let playerTexture = 'player_100';
        if (this.textures.exists('player_100_alt')) {
            playerTexture = 'player_100_alt';
        } else if (!this.textures.exists('player_100')) {
            console.warn('⚠️ Player texture not found, using background only');
        }
        
        // Add the actual player image on top (if it exists)
        if (this.textures.exists(playerTexture)) {
            const playerSprite = this.add.image(0, 0, playerTexture);
            playerSprite.setScale(0.8); // Increased from 0.5 for bigger players
            playerContainer.add(playerSprite);
        } else {
            // Fallback: create a simple colored circle
            const fallbackGraphics = this.add.graphics();
            fallbackGraphics.fillStyle(0xFFFFFF);
            fallbackGraphics.fillCircle(0, 0, 25); // Increased from 15
            playerContainer.add(fallbackGraphics);
        }
        
        // Add chain logo to player
        const logoKey = player.lane === 'arbitrum' ? 'arbitrum_logo' : 
                       player.lane === 'optimism' ? 'optimism_logo' : 'base_logo';
        
        if (this.textures.exists(logoKey)) {
            const chainLogo = this.add.image(25, -25, logoKey); // Top-right corner
            chainLogo.setScale(0.4); // Much smaller logo
            playerContainer.add(chainLogo);
            console.log('🏷️ Added', player.lane, 'logo to player');
        } else {
            console.warn('⚠️ Logo not found for', player.lane);
        }
        
        // Make current player larger and more visible
        if (player.isCurrentUser) {
            playerContainer.setScale(2.0); // Increased from 1.5
            console.log('🎮 Created current user player:', player.address, 'on', player.lane, 'at position', player.position);
        } else {
            playerContainer.setScale(1.5); // Increased from 1.0
            console.log('👤 Created NPC player:', player.address, 'on', player.lane, 'at position', player.position);
        }
        
        playerContainer.setInteractive(new Phaser.Geom.Rectangle(-50, -50, 100, 100), Phaser.Geom.Rectangle.Contains); // Increased interaction area
        
        // Add click handler to select this player
        playerContainer.on('pointerdown', () => {
            console.log('🖱️ Player clicked:', player.address, player.isCurrentUser ? '(YOUR PLAYER)' : '(OTHER PLAYER)');
            this.selectPlayer(player);
            (this as any).playerWasClicked = true; // Flag to prevent deselection
        });
        
        // Add hover effects
        playerContainer.on('pointerover', () => {
            playerContainer.setScale(playerContainer.scaleX * 1.1, playerContainer.scaleY * 1.1);
        });
        
        playerContainer.on('pointerout', () => {
            const baseScale = player.isCurrentUser ? 2.0 : 1.5; // Updated base scales
            playerContainer.setScale(baseScale, baseScale);
        });
        
        // Add player address as text above sprite
        const addressText = this.add.text(x, y - 70, player.address, { // Moved up from -45
            fontSize: player.isCurrentUser ? '24px' : '18px', // Increased from 16px/12px
            color: player.isCurrentUser ? '#FFD700' : '#ffffff',
            fontFamily: 'Arial',
            fontStyle: player.isCurrentUser ? 'bold' : 'normal'
        });
        addressText.setOrigin(0.5);
        this.playerAddressTexts.set(player.id, addressText);
        
        // Store initial target position for smooth movement
        this.playerTargetPositions.set(player.id, { x, y });
        
        // Return the container as a sprite-like object
        return playerContainer as any;
    }
    
    updateCurrentPlayerIndicator() {
        // Remove old indicator
        if (this.currentPlayerIndicator) {
            this.currentPlayerIndicator.destroy();
        }
        
        // Create new indicator for current player
        if (gameState.currentPlayer) {
            const sprite = this.playerSprites.get(gameState.currentPlayer.id);
            if (sprite) {
                this.currentPlayerIndicator = this.add.graphics();
                this.currentPlayerIndicator.lineStyle(6, 0xFFD700, 1); // Thicker line
                this.currentPlayerIndicator.strokeRoundedRect(
                    sprite.x - 50, sprite.y - 50, 100, 100, 12 // Increased size and corner radius
                );
                
                // // Add crown icon above current player
                // const crown = this.add.text(sprite.x, sprite.y - 80, '👑', { // Moved up more
                //     fontSize: '32px' // Increased from 20px
                // });
                // crown.setOrigin(0.5);
            }
        }
    }
    
    getPlayerPosition(player: Player): { x: number; y: number } {
        const laneIndex = player.lane === 'arbitrum' ? 0 : player.lane === 'optimism' ? 1 : 2;
        const { topPadding, laneSpacing } = this.getLanePositioning();
        
        const y = topPadding + (laneIndex * laneSpacing) + (laneSpacing / 2);
        const x = player.position * gameState.squareSize;
        
        return { x, y };
    }
    
    selectPlayer(player: Player | null) {
        this.selectedPlayer = player;
        
        // Update visual indicator
        if (this.selectedPlayerIndicator) {
            this.selectedPlayerIndicator.destroy();
        }
        
        if (player) {
            const sprite = this.playerSprites.get(player.id);
            if (sprite) {
                this.selectedPlayerIndicator = this.add.rectangle(
                    sprite.x, sprite.y, 100, 100 // Increased from 60x60
                );
                // Different colors for different player types
                if (player.isCurrentUser) {
                    this.selectedPlayerIndicator.setStrokeStyle(6, 0x00FF00); // Thicker border, increased from 4
                    this.selectedPlayerIndicator.setFillStyle(0x00FF00, 0.2);
                } else {
                    this.selectedPlayerIndicator.setStrokeStyle(6, 0xFFFF00); // Thicker border, increased from 4
                    this.selectedPlayerIndicator.setFillStyle(0xFFFF00, 0.2);
                }
                
                console.log('🎯 Selected player:', player.address, player.isCurrentUser ? '(YOU)' : '(OTHER)');
                
                // Immediately focus camera on newly selected player
                this.focusCamera();
            }
        }
        
        this.updateConfirmButton();
    }
    
    updateConfirmButton() {
        if (this.confirmButton) {
            const shouldShow = (this.selectedPlayer?.pendingMove !== undefined) || 
                              (gameState.currentPlayer?.pendingMove !== undefined);
            this.confirmButton.setVisible(shouldShow);
        }
    }
    
    updateUI() {
        // Show/hide create player button based on whether user has a player
        if (this.createPlayerButton) {
            this.createPlayerButton.setVisible(!gameState.hasCurrentPlayer());
        }
    }
    
    moveSelectedPlayer(direction: 'left' | 'right') {
        if (!this.selectedPlayer) return;
        
        const currentPos = this.selectedPlayer.pendingMove ?? this.selectedPlayer.position;
        const newPos = direction === 'left' ? currentPos - 1 : currentPos + 1;
        
        gameState.movePlayer(this.selectedPlayer.id, newPos);
        this.updatePlayerSprites();
        this.updateConfirmButton();
    }
    
    // Enhanced movement method with animations and cooldowns
    movePlayer(playerId: string, direction: 'left' | 'right') {
        // Check movement cooldown
        if (Date.now() - this.lastPlayerMoveTime < this.movementCooldown) {
            console.log('⏰ Movement on cooldown, please wait...');
            return;
        }
        
        // Check if player is currently animating
        if (this.playersAnimating.has(playerId)) {
            console.log('🎬 Player is already animating, skipping move');
            return;
        }
        
        const player = gameState.players.find(p => p.id === playerId);
        if (!player) return;
        
        const sprite = this.playerSprites.get(playerId);
        if (!sprite) return;
        
        // Calculate new position
        const currentPos = player.pendingMove ?? player.position;
        const newPos = direction === 'left' ? currentPos - 1 : currentPos + 1;
        
        // Update player state
        gameState.movePlayer(playerId, newPos);
        
        // Get target position for animation
        const targetPosition = this.getPlayerPosition(player);
        
        // Flip player sprite based on direction
        this.flipPlayer(playerId, direction);
        
        // Start animation
        this.playersAnimating.add(playerId);
        this.lastPlayerMoveTime = Date.now();
        
        // Store target position
        this.playerTargetPositions.set(playerId, targetPosition);
        
        // Animate player movement
        this.tweens.add({
            targets: sprite,
            x: targetPosition.x,
            y: targetPosition.y,
            duration: this.playerMoveAnimationDuration,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete: () => {
                this.playersAnimating.delete(playerId);
                
                // Auto-confirm the move after animation completes
                gameState.confirmPlayerMove(playerId);
                
                console.log('✨ Player movement animation completed and confirmed');
            }
        });
        
        // Animate address text
        const addressText = this.playerAddressTexts.get(playerId);
        if (addressText) {
            this.tweens.add({
                targets: addressText,
                x: targetPosition.x,
                y: targetPosition.y - (player.isCurrentUser ? 70 : 70), // Updated to match new positioning
                duration: this.playerMoveAnimationDuration,
                ease: Phaser.Math.Easing.Sine.InOut
            });
        }
        
        // Play movement sound
        this.playMovementSound();
        
        // Update confirm button
        this.updateConfirmButton();
        
        console.log(`🏃 Player ${player.address} moved ${direction} to position ${newPos}`);
    }
    
    // Flip player sprite when moving left/right
    flipPlayer(playerId: string, direction: 'left' | 'right') {
        const sprite = this.playerSprites.get(playerId);
        if (!sprite) return;
        
        let flipX = direction === 'left' ? -1 : 1;
        sprite.setScale(Math.abs(sprite.scaleX) * flipX, sprite.scaleY);
        
        console.log(`🔄 Player ${playerId} flipped ${direction}`);
    }
    
    // Play movement sound with variation
    playMovementSound() {
        const walkSounds = ['walk_01', 'walk_02', 'walk_03', 'walk_04', 'walk_05'];
        const randomSound = Phaser.Utils.Array.GetRandom(walkSounds);
        
        if (this.sound.get(randomSound)) {
            this.sound.play(randomSound, { volume: 0.3 });
        } else {
            // Fallback to generic sound
            this.playSound('button_click');
        }
    }
    
    confirmPlayerMovement() {
        const playerToConfirm = gameState.playerAwaitingConfirmation;
        if (!playerToConfirm) return;
        
        gameState.confirmPlayerMove(playerToConfirm.id);
        this.updatePlayerSprites();
        this.updateConfirmButton();
        
        // Play sound
        this.playSound('button_click');
    }
    
    showCreatePlayerDialog() {
        console.log('🎯 Creating player dialog started...');
        
        // For testing, let's create a player regardless of wallet connection
        // We'll add wallet requirement back later
        
        console.log('📊 Before creation - Current player:', gameState.currentPlayer?.address);
        console.log('📊 Before creation - Total players:', gameState.players.length);
        
        // Create player on a random lane
        const lanes: ('arbitrum' | 'optimism' | 'base')[] = ['arbitrum', 'optimism', 'base'];
        const randomIndex = Math.floor(Math.random() * lanes.length);
        const randomLane = lanes[randomIndex]!;
        
        // Check if wallet is connected
        const connectedAddress = (window as any).connectedWalletAddress;
        console.log('💳 Connected address:', connectedAddress);
        
        let userAddress;
        if (connectedAddress) {
            userAddress = `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`;
        } else {
            // For testing, create a demo address
            userAddress = `0xYOUR...DEMO`;
            console.log('⚠️ No wallet connected, using demo address');
        }
        
        console.log('🎮 Creating player:', userAddress, 'on lane:', randomLane);
        
        try {
            gameState.setCurrentPlayer(userAddress, randomLane);
            
            console.log('📊 After creation - Current player:', gameState.currentPlayer?.address);
            console.log('📊 After creation - Total players:', gameState.players.length);
            console.log('📊 All players:', gameState.players.map(p => `${p.address} (${p.lane}) [current: ${p.isCurrentUser}]`));
            
            this.updatePlayerSprites();
            this.updateUI();
            this.focusCamera();
            
            this.playSound('button_click');
            
            // Show success message
            const successMessage = this.add.text(this.scale.width / 2, this.scale.height / 2, 
                `✅ Player created on ${gameState.laneLabels[randomLane]}!\nUse ← → keys to move\n\nPosition: ${gameState.currentPlayer?.position}`, {
                fontSize: '24px',
                color: '#4ecdc4',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center'
            });
            successMessage.setOrigin(0.5);
            successMessage.setScrollFactor(0);
            successMessage.setDepth(2000);
            
            // Remove success message after 4 seconds
            this.time.delayedCall(4000, () => {
                successMessage.destroy();
            });
            
            console.log('✅ Player creation completed successfully!');
            
        } catch (error) {
            console.error('❌ Error creating player:', error);
            
            // Show error message
            const errorMessage = this.add.text(this.scale.width / 2, this.scale.height / 2, 
                '❌ Error creating player!\nCheck console for details', {
                fontSize: '20px',
                color: '#ff6b6b',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center'
            });
            errorMessage.setOrigin(0.5);
            errorMessage.setScrollFactor(0);
            errorMessage.setDepth(2000);
            
            // Remove error message after 3 seconds
            this.time.delayedCall(3000, () => {
                errorMessage.destroy();
            });
        }
    }
    
    showAddPlayerDialog() {
        console.log('🎯 Adding NPC player...');
        
        try {
            // Add a random NPC player to a random lane
            const lanes: ('arbitrum' | 'optimism' | 'base')[] = ['arbitrum', 'optimism', 'base'];
            const randomIndex = Math.floor(Math.random() * lanes.length);
            const randomLane = lanes[randomIndex]!;
            const randomAddress = `0x${Math.random().toString(16).substr(2, 8)}...npc`;
            
            console.log('👤 Creating NPC:', randomAddress, 'on lane:', randomLane);
            
            gameState.addPlayer(randomAddress, randomLane, false);
            this.updatePlayerSprites();
            
            this.playSound('button_click');
            
            // Show success message
            const successMessage = this.add.text(this.scale.width / 2, this.scale.height / 2, 
                `👤 NPC added to ${gameState.laneLabels[randomLane]}!`, {
                fontSize: '20px',
                color: '#4ecdc4',
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center'
            });
            successMessage.setOrigin(0.5);
            successMessage.setScrollFactor(0);
            successMessage.setDepth(2000);
            
            // Remove success message after 2 seconds
            this.time.delayedCall(2000, () => {
                successMessage.destroy();
            });
            
            console.log('✅ NPC player added successfully!');
            
        } catch (error) {
            console.error('❌ Error adding NPC player:', error);
        }
    }
    
    playSound(key: string) {
        if (this.sound.get(key)) {
            this.sound.play(key, { volume: 0.5 });
        }
    }
    
    focusCamera() {
        // Focus camera on controlled player (selected or current) first, then on average of all players
        const playerToFocus = this.selectedPlayer || gameState.currentPlayer;
        if (playerToFocus) {
            const pos = this.getPlayerPosition(playerToFocus);
            this.cameras.main.scrollX = pos.x - this.scale.width / 2;
        } else if (gameState.players.length > 0) {
            const avgX = gameState.players.reduce((sum, p) => sum + p.position * gameState.squareSize, 0) / gameState.players.length;
            this.cameras.main.scrollX = avgX - this.scale.width / 2;
        }
    }
    
    update() {
        const currentTime = Date.now();
        
        // Determine which player to control
        let playerToControl = this.selectedPlayer || gameState.currentPlayer;
        
        if (playerToControl) {
            // Only log once every 2 seconds instead of every frame
            if (currentTime - (this as any).lastControlLog > 2000) {
                const isSelected = this.selectedPlayer === playerToControl;
                const isCurrentUser = playerToControl.isCurrentUser;
                console.log('🎮 Controlling player:', playerToControl.address, 
                    isCurrentUser ? '(YOUR PLAYER)' : '(OTHER PLAYER)', 
                    isSelected ? '[SELECTED]' : '[DEFAULT]',
                    'at position', playerToControl.position);
                (this as any).lastControlLog = currentTime;
            }
            
            // Skip input if player is animating
            if (!this.playersAnimating.has(playerToControl.id)) {
                // Check cursor keys
                const leftPressed = this.cursors.left && Phaser.Input.Keyboard.JustDown(this.cursors.left);
                const rightPressed = this.cursors.right && Phaser.Input.Keyboard.JustDown(this.cursors.right);
                
                // Check WASD keys
                const aPressed = this.wasdKeys && this.wasdKeys.left && Phaser.Input.Keyboard.JustDown(this.wasdKeys.left);
                const dPressed = this.wasdKeys && this.wasdKeys.right && Phaser.Input.Keyboard.JustDown(this.wasdKeys.right);
                
                if (leftPressed || aPressed) {
                    const playerType = playerToControl.isCurrentUser ? 'your player' : 'selected player';
                    const currentPos = playerToControl.pendingMove ?? playerToControl.position;
                    console.log(`⬅️ Moving ${playerType} LEFT from position`, currentPos);
                    this.movePlayer(playerToControl.id, 'left');
                }
                if (rightPressed || dPressed) {
                    const playerType = playerToControl.isCurrentUser ? 'your player' : 'selected player';
                    const currentPos = playerToControl.pendingMove ?? playerToControl.position;
                    console.log(`➡️ Moving ${playerType} RIGHT from position`, currentPos);
                    this.movePlayer(playerToControl.id, 'right');
                }
            }
        } else {
            // Debug: Show if no player to control (throttled logging)
            if (gameState.players.length > 0 && currentTime - (this as any).lastNoPlayerLog > 3000) {
                console.log('⚠️ No player to control - Click on any player to select them, or create your own player');
                (this as any).lastNoPlayerLog = currentTime;
            }
        }
        
        // Indicator updates moved to throttled section above for better performance
        
        // Performance optimization: Update camera and UI less frequently
        if (currentTime - this.lastCameraUpdate > 16) { // ~60fps max for camera updates
            const playerToFollow = this.selectedPlayer || gameState.currentPlayer;
            if (playerToFollow) {
                const pos = this.getPlayerPosition(playerToFollow);
                const targetCameraX = pos.x - this.scale.width / 2;
                // Optimized camera following
                this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, targetCameraX, 0.15); // Slightly faster for responsiveness
            }
            
            // Update selected player indicator less frequently
            if (this.selectedPlayerIndicator && this.selectedPlayer) {
                const sprite = this.playerSprites.get(this.selectedPlayer.id);
                if (sprite) {
                    this.selectedPlayerIndicator.x = sprite.x;
                    this.selectedPlayerIndicator.y = sprite.y;
                }
            }
            
            // Update current player indicator less frequently
            if (this.currentPlayerIndicator && gameState.currentPlayer) {
                const sprite = this.playerSprites.get(gameState.currentPlayer.id);
                if (sprite) {
                    this.currentPlayerIndicator.clear();
                    this.currentPlayerIndicator.lineStyle(6, 0xFFD700, 1);
                    this.currentPlayerIndicator.strokeRoundedRect(
                        sprite.x - 50, sprite.y - 50, 100, 100, 12
                    );
                }
            }
            
            this.lastCameraUpdate = currentTime;
        }
    }
} 