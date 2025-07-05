import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        console.log('🎯 BootScene: Starting to load assets...');
        
        // Load the actual player image - try different paths
        this.load.image('player_100', '/assets/images/player_100.png');
        this.load.image('backyard_grass_1', '/assets/images/backyard_grass_1.png');
        this.load.image('backyard_grass_2', '/assets/images/backyard_grass_2.png');
        this.load.image('backyard_stone_2', '/assets/images/backyard_stone_2.png');

        //Load enemies
        this.load.image('backyard_enemy_1', '/assets/images/backyard_enemy_1.png');
        this.load.image('backyard_enemy_2', '/assets/images/backyard_enemy_2.png');
        this.load.image('backyard_enemy_3', '/assets/images/backyard_enemy_3.png');
        
        // Load chain logos
        this.load.image('base_logo', '/assets/images/rsz_base.png');
        this.load.image('arbitrum_logo', '/assets/images/rsz_arbitrum.png');
        this.load.image('optimism_logo', '/assets/images/rsz_optimism.png');
        
        // Fallback loading with error handling
        this.load.on('filecomplete-image-player_100', () => {
            console.log('✅ player_100.png loaded successfully');
        });
        
        this.load.on('filecomplete-image-backyard_grass_1', () => {
            console.log('✅ backyard_grass_1.png loaded successfully');
        });
        
        this.load.on('filecomplete-image-backyard_grass_2', () => {
            console.log('✅ backyard_grass_2.png loaded successfully');
        });
        
        this.load.on('filecomplete-image-backyard_stone_2', () => {
            console.log('✅ backyard_stone_2.png loaded successfully');
        });
        
        this.load.on('filecomplete-image-base_logo', () => {
            console.log('✅ Base logo loaded successfully');
        });
        
        this.load.on('filecomplete-image-arbitrum_logo', () => {
            console.log('✅ Arbitrum logo loaded successfully');
        });
        
        this.load.on('filecomplete-image-optimism_logo', () => {
            console.log('✅ Optimism logo loaded successfully');
        });
        
        this.load.on('loaderror', (file: any) => {
            console.error('❌ Failed to load:', file.key, 'from', file.url);
            console.log('💡 Trying alternative path...');
            
            // Try alternative paths
            if (file.key === 'player_100') {
                this.load.image('player_100_alt', 'game/public/assets/images/player_100.png');
            }
            if (file.key === 'backyard_grass_1') {
                this.load.image('backyard_grass_1_alt', 'game/public/assets/images/backyard_grass_1.png');
            }
            if (file.key === 'backyard_grass_2') {
                this.load.image('backyard_grass_2_alt', 'game/public/assets/images/backyard_grass_2.png');
            }
            if (file.key === 'backyard_stone_2') {
                this.load.image('backyard_stone_2_alt', 'game/public/assets/images/backyard_stone_2.png');
            }
            if (file.key === 'base_logo') {
                console.log('⚠️ Base logo failed to load, will create fallback');
            }
            if (file.key === 'arbitrum_logo') {
                console.log('⚠️ Arbitrum logo failed to load, will create fallback');
            }
            if (file.key === 'optimism_logo') {
                console.log('⚠️ Optimism logo failed to load, will create fallback');
            }
        });
        
        // Create simple button texture as data URL
        this.load.image('button', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
        
        // Audio - keep some basic sounds with fallback
        this.load.audio('button_click', ['/assets/audio/button_click.mp3', '/assets/audio/button_click.ogg']);
        this.load.audio('walk_01', ['/assets/audio/walk_01.mp3', '/assets/audio/walk_01.ogg']);
    }

    create() {
        console.log('🎯 BootScene: Assets loaded, creating textures...');
        
        // Check if images loaded properly
        const hasPlayer = this.textures.exists('player_100') || this.textures.exists('player_100_alt');
        const hasGrass1 = this.textures.exists('backyard_grass_1') || this.textures.exists('backyard_grass_1_alt');
        const hasGrass2 = this.textures.exists('backyard_grass_2') || this.textures.exists('backyard_grass_2_alt');
        const hasStone2 = this.textures.exists('backyard_stone_2') || this.textures.exists('backyard_stone_2_alt');
        const hasBaseLogo = this.textures.exists('base_logo');
        const hasArbitrumLogo = this.textures.exists('arbitrum_logo');
        const hasOptimismLogo = this.textures.exists('optimism_logo');
        
        console.log('📊 Image check - Player:', hasPlayer, 'Grass1:', hasGrass1, 'Grass2:', hasGrass2, 'Stone2:', hasStone2);
        console.log('📊 Logo check - Base:', hasBaseLogo, 'Arbitrum:', hasArbitrumLogo, 'Optimism:', hasOptimismLogo);
        
        // Create colored textures for different lanes
        this.createLaneTextures();
        
        // Create button texture
        this.createButtonTexture();
        
        // If images didn't load, create fallback textures
        if (!hasPlayer) {
            console.log('🔧 Creating fallback player texture');
            this.createFallbackPlayerTexture();
        }
        
        if (!hasGrass1) {
            console.log('🔧 Creating fallback grass_1 texture');
            this.createFallbackGrassTexture();
        }
        
        if (!hasGrass2) {
            console.log('🔧 Creating fallback grass_2 texture');
            this.createFallbackGrass2Texture();
        }
        
        if (!hasStone2) {
            console.log('🔧 Creating fallback stone_2 texture');
            this.createFallbackStone2Texture();
        }
        
        if (!hasBaseLogo) {
            console.log('🔧 Creating fallback Base logo');
            this.createFallbackBaseLogo();
        }
        
        if (!hasArbitrumLogo) {
            console.log('🔧 Creating fallback Arbitrum logo');
            this.createFallbackArbitrumLogo();
        }
        
        if (!hasOptimismLogo) {
            console.log('🔧 Creating fallback Optimism logo');
            this.createFallbackOptimismLogo();
        }
        
        console.log('🚀 Starting LaneScene...');
        this.scene.start('LaneScene');
    }
    
    createFallbackPlayerTexture() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x4A90E2);
        graphics.fillCircle(30, 30, 30); // Increased from 20, 20, 20
        graphics.generateTexture('player_100', 60, 60); // Increased from 40, 40
        graphics.destroy();
    }
    
    createFallbackGrassTexture() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x2ECC71);
        graphics.fillRect(0, 0, 32, 32); // Increased from 20, 20
        graphics.generateTexture('backyard_grass_1', 32, 32); // Increased from 20, 20
        graphics.destroy();
    }
    
    createFallbackGrass2Texture() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x228B22); // Slightly different green
        graphics.fillRect(0, 0, 32, 32); // Increased from 20, 20
        graphics.generateTexture('backyard_grass_2', 32, 32); // Increased from 20, 20
        graphics.destroy();
    }
    
    createFallbackStone2Texture() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x696969); // Gray stone color
        graphics.fillCircle(16, 16, 12); // Increased from 10, 10, 8
        graphics.generateTexture('backyard_stone_2', 32, 32); // Increased from 20, 20
        graphics.destroy();
    }
    
    createLaneTextures() {
        // Create colored backgrounds for different lanes
        const playerSize = 80; // Increased from 50
        
        // Arbitrum player background (blue tint)
        const arbitrumGraphics = this.add.graphics();
        arbitrumGraphics.fillStyle(0x4A90E2, 0.4);
        arbitrumGraphics.fillCircle(playerSize/2, playerSize/2, playerSize/2);
        arbitrumGraphics.generateTexture('player_arbitrum_bg', playerSize, playerSize);
        arbitrumGraphics.destroy();
        
        // Optimism player background (red tint)
        const optimismGraphics = this.add.graphics();
        optimismGraphics.fillStyle(0xE74C3C, 0.4);
        optimismGraphics.fillCircle(playerSize/2, playerSize/2, playerSize/2);
        optimismGraphics.generateTexture('player_optimism_bg', playerSize, playerSize);
        optimismGraphics.destroy();
        
        // Base player background (green tint)
        const baseGraphics = this.add.graphics();
        baseGraphics.fillStyle(0x2ECC71, 0.4);
        baseGraphics.fillCircle(playerSize/2, playerSize/2, playerSize/2);
        baseGraphics.generateTexture('player_base_bg', playerSize, playerSize);
        baseGraphics.destroy();
    }
    
    createButtonTexture() {
        // Button texture
        const buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0x3498DB);
        buttonGraphics.fillRoundedRect(0, 0, 270, 90, 12); // Increased from 180x60 to 270x90
        buttonGraphics.lineStyle(3, 0x2980B9); // Thicker border from 2 to 3
        buttonGraphics.strokeRoundedRect(0, 0, 270, 90, 12); // Increased corner radius from 8 to 12
        buttonGraphics.generateTexture('button', 270, 90); // Updated size
        buttonGraphics.destroy();
    }
    
    createFallbackBaseLogo() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x0052FF); // Base blue color
        graphics.fillCircle(16, 16, 14);
        graphics.generateTexture('base_logo', 32, 32);
        graphics.destroy();
    }
    
    createFallbackArbitrumLogo() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x28A0F0); // Arbitrum blue color
        graphics.fillCircle(16, 16, 14);
        graphics.generateTexture('arbitrum_logo', 32, 32);
        graphics.destroy();
    }
    
    createFallbackOptimismLogo() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xFF0420); // Optimism red color
        graphics.fillCircle(16, 16, 14);
        graphics.generateTexture('optimism_logo', 32, 32);
        graphics.destroy();
    }
} 