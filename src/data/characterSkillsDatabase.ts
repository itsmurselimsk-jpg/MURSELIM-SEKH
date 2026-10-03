export interface CharacterSkill {
  id: string;
  name: string;
  type: 'active' | 'passive';
  icon: string;
  abilityName: string;
  description: string;
  headshotBenefit: string;
  category: 'accuracy' | 'movement' | 'healing' | 'penetration' | 'defense';
}

export interface CharacterPresetCombo {
  id: string;
  title: string;
  subtitle: string;
  playstyle: string;
  activeChar: CharacterSkill;
  passiveChars: CharacterSkill[];
  synergyScore: number;
  tacticalAdvantage: string;
}

export const ALL_CHARACTERS: CharacterSkill[] = [
  // ================= ACTIVE CHARACTERS =================
  {
    id: 'tatsuya',
    name: 'Tatsuya',
    type: 'active',
    icon: '⚡',
    abilityName: 'Rebel Rush',
    description: 'Dashes forward at ultra-high speed for 0.3s. Can accumulate up to 2 dashes with a 45s cooldown.',
    headshotBenefit: 'Close distance in 0.2s before the enemy can react, setting up instantaneous M1887 J-drag one-taps.',
    category: 'movement',
  },
  {
    id: 'alok',
    name: 'Alok',
    type: 'active',
    icon: '🎵',
    abilityName: 'Drop the Beat',
    description: 'Creates a 5m aura that increases movement speed by 15% and restores 3 HP/sec for 10 seconds.',
    headshotBenefit: 'Movement speed boost increases lateral strafing speed, throwing off enemy aim while steadying your crosshair.',
    category: 'healing',
  },
  {
    id: 'k',
    name: 'K (Captain Booyah)',
    type: 'active',
    icon: '🧘',
    abilityName: 'Master of All',
    description: 'Increases max EP by 50. In Jiu-Jitsu mode, EP conversion rate is increased by 500%. In Psychology mode, recovers 3 EP every 2s.',
    headshotBenefit: 'Infinite continuous healing during sustained AR laser sprays without pausing to consume medkits.',
    category: 'healing',
  },
  {
    id: 'chrono',
    name: 'Chrono',
    type: 'active',
    icon: '🛡️',
    abilityName: 'Time Turner',
    description: 'Creates an impenetrable force field blocking 800 damage. Lasts 6s with 110s cooldown.',
    headshotBenefit: 'Allows safe aiming and crosshair placement before stepping out for a calculated one-tap.',
    category: 'defense',
  },
  {
    id: 'homer',
    name: 'Homer',
    type: 'active',
    icon: '🦅',
    abilityName: 'Senses Shockwave',
    description: 'Releases a drone towards the nearest frontal enemy, creating a 5m explosion that reduces movement speed by 60% and firing rate by 35%.',
    headshotBenefit: 'Slows enemy movement to a crawl, turning them into a stationary target for 100% headshot accuracy.',
    category: 'accuracy',
  },
  {
    id: 'wukong',
    name: 'Wukong',
    type: 'active',
    icon: '🐒',
    abilityName: 'Camouflage',
    description: 'Transforms into a bush for 15s. Knocks down reset cooldown instantly.',
    headshotBenefit: 'Disables enemy default auto-aim lock completely. Pop out of the bush to deliver point-blank headshots.',
    category: 'defense',
  },
  {
    id: 'dimitri',
    name: 'Dimitri',
    type: 'active',
    icon: '🎧',
    abilityName: 'Healing Heartbeat',
    description: 'Creates a 3.5m healing zone restoring 5 HP/s. Users and downed allies can self-recover inside.',
    headshotBenefit: 'Allows aggressive 1v2 trades in Clash Squad without fear of being finished.',
    category: 'healing',
  },

  // ================= PASSIVE CHARACTERS =================
  {
    id: 'dbee',
    name: 'D-Bee',
    type: 'passive',
    icon: '🕺',
    abilityName: 'Bullet Beats',
    description: 'When firing while moving, movement speed increases by 30% and bullet accuracy increases by 60%.',
    headshotBenefit: '+60% ACCURACY BOOST! Crucial for SMG run-and-gun headshots. Tightens bullet spread dramatically.',
    category: 'accuracy',
  },
  {
    id: 'laura',
    name: 'Laura',
    type: 'passive',
    icon: '🎯',
    abilityName: 'Sharp Shooter',
    description: 'Accuracy increases by 50% while in scope (2X, 4X, Thermal, or Sniper).',
    headshotBenefit: 'Turns SCAR, Woodpecker, and AK47 into pinpoint laser beams through 2X and 4X scopes.',
    category: 'accuracy',
  },
  {
    id: 'hayato',
    name: 'Hayato (Awakened)',
    type: 'passive',
    icon: '⚔️',
    abilityName: 'Bushido / Art of Blades',
    description: 'For every 10% decrease in max HP, armor penetration increases by 10%. Awakened reduces frontal damage by 3%.',
    headshotBenefit: 'When low on health, your headshots ignore enemy Level 3/4 helmets for guaranteed instant knocks.',
    category: 'penetration',
  },
  {
    id: 'kelly',
    name: 'Kelly (The Swift)',
    type: 'passive',
    icon: '👟',
    abilityName: 'Dash / Deadly Velocity',
    description: 'Increases sprint speed by 6%. After sprinting 4s, the first shot deals 106% damage.',
    headshotBenefit: 'Essential movement speed that powers faster swipe momentum on your touchscreen.',
    category: 'movement',
  },
  {
    id: 'caroline',
    name: 'Caroline',
    type: 'passive',
    icon: '🎀',
    abilityName: 'Agility',
    description: 'When holding a Shotgun (M1887, M1014, MAG-7), movement speed increases by 13%.',
    headshotBenefit: 'Maximum mobility when rushing with shotguns, enabling lightning fast J-drag flicks.',
    category: 'movement',
  },
  {
    id: 'rafael',
    name: 'Rafael',
    type: 'passive',
    icon: '🕶️',
    abilityName: 'Dead Silent',
    description: 'Silencing effect on all Marksman Rifles and Snipers. Downed enemies bleed out 85% faster.',
    headshotBenefit: 'Enemies cannot detect your firing location on the minimap. Knocked enemies die almost instantly.',
    category: 'penetration',
  },
  {
    id: 'nikita',
    name: 'Nikita',
    type: 'passive',
    icon: '🔫',
    abilityName: 'Firearms Expert',
    description: 'Reload speed is increased by 20%. The last 6 bullets of an SMG deal 30% additional damage.',
    headshotBenefit: 'Rapid SMG reload allows immediate follow-up sprays, and the final bullets shred enemy vests.',
    category: 'penetration',
  },
  {
    id: 'maro',
    name: 'Maro',
    type: 'passive',
    icon: '🦅',
    abilityName: 'Falcon Fervor',
    description: 'Damage increases with distance, up to 25%. Damage to marked enemies increases by 3.5%.',
    headshotBenefit: 'Stacks with Marksman rifles for 250+ long-range one-tap knocks.',
    category: 'penetration',
  },
  {
    id: 'moco',
    name: 'Moco (Enigma)',
    type: 'passive',
    icon: '👁️',
    abilityName: 'Hacker’s Eye',
    description: 'Tags enemies shot for up to 6.5s, visible to entire squad even behind walls.',
    headshotBenefit: 'Track moving enemies through Gloo Walls and smoke to pre-aim the exact head level.',
    category: 'accuracy',
  },
  {
    id: 'jota',
    name: 'Jota',
    type: 'passive',
    icon: '🧗',
    abilityName: 'Sustained Raids',
    description: 'Hitting enemies restores HP. Knocking down an enemy instantly recovers 20% max HP.',
    headshotBenefit: 'Provides instant health restoration upon hitting headshots in close-quarters brawls.',
    category: 'healing',
  },
];

export const PRESET_COMBOS: CharacterPresetCombo[] = [
  {
    id: 'onetap_god',
    title: 'One-Tap Shotgun God',
    subtitle: 'Point-Blank M1887 & Desert Eagle Rush',
    playstyle: 'onetap',
    activeChar: ALL_CHARACTERS.find((c) => c.id === 'tatsuya')!,
    passiveChars: [
      ALL_CHARACTERS.find((c) => c.id === 'caroline')!,
      ALL_CHARACTERS.find((c) => c.id === 'hayato')!,
      ALL_CHARACTERS.find((c) => c.id === 'kelly')!,
    ],
    synergyScore: 99,
    tacticalAdvantage:
      'Tatsuya double dash closes the gap in 0.3s. Caroline gives +13% shotgun sprint speed, and Hayato maximizes headshot damage through level 3 helmets.',
  },
  {
    id: 'smg_laser',
    title: 'SMG Drag Headshot King',
    subtitle: 'MP40 & UMP Full-Auto Laser Beam',
    playstyle: 'smg_rusher',
    activeChar: ALL_CHARACTERS.find((c) => c.id === 'alok')!,
    passiveChars: [
      ALL_CHARACTERS.find((c) => c.id === 'dbee')!,
      ALL_CHARACTERS.find((c) => c.id === 'nikita')!,
      ALL_CHARACTERS.find((c) => c.id === 'hayato')!,
    ],
    synergyScore: 98,
    tacticalAdvantage:
      'D-Bee grants a massive +60% accuracy while firing on the move, tightening MP40 spray bloom directly into the enemy forehead.',
  },
  {
    id: 'marksman_sniper',
    title: 'Long-Range Head Hunter',
    subtitle: 'Woodpecker, SVD & AWM Long Range',
    playstyle: 'ar_marksman',
    activeChar: ALL_CHARACTERS.find((c) => c.id === 'k')!,
    passiveChars: [
      ALL_CHARACTERS.find((c) => c.id === 'laura')!,
      ALL_CHARACTERS.find((c) => c.id === 'rafael')!,
      ALL_CHARACTERS.find((c) => c.id === 'maro')!,
    ],
    synergyScore: 97,
    tacticalAdvantage:
      'Laura provides +50% scoped accuracy, Rafael silences your shots and bleeds enemies 85% faster, while Maro delivers +25% distance damage.',
  },
  {
    id: 'cs_clutch',
    title: 'Clash Squad Ranked Clutch Master',
    subtitle: '4v4 Tournament Survival & Fragging',
    playstyle: 'allrounder',
    activeChar: ALL_CHARACTERS.find((c) => c.id === 'dimitri')!,
    passiveChars: [
      ALL_CHARACTERS.find((c) => c.id === 'moco')!,
      ALL_CHARACTERS.find((c) => c.id === 'hayato')!,
      ALL_CHARACTERS.find((c) => c.id === 'jota')!,
    ],
    synergyScore: 96,
    tacticalAdvantage:
      'Self-revive zone from Dimitri, Moco wall-tracking for wall-bang headshots, and Jota instant HP recovery upon knocking opponents.',
  },
];
