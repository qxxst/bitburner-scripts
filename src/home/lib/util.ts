// lib/util.js by qxxst
export function lowestCombatLevel(ns: any): number {
    let str: number = ns.getPlayer().skills.strength;
    let def: number = ns.getPlayer().skills.defense;
    let dex: number = ns.getPlayer().skills.dexterity;
    let agi: number = ns.getPlayer().skills.agility;
    return Math.min(str, def, dex, agi);
}

export function sourceFileOwned(ns: any, sourceFile: number, level: number): boolean {
    return ns.getResetInfo().ownedSF.has(sourceFile) && ns.getResetInfo().ownedSF.get(sourceFile) >= level;
}

export function currentBitnode(ns: any): number {
    return ns.getResetInfo().currentNode;
}

export function grossIncomePerSecond(ns: any): number {
    let allSources: {crime: number, hacking: number, hacknet: number, work: number} = ns.getMoneySources().sinceInstall;
    let income1: number = allSources.crime + allSources.hacking + allSources.hacknet + allSources.work;
    ns.sleep(1000);
    let income2: number = allSources.crime + allSources.hacking + allSources.hacknet + allSources.work;
    return income2 - income1;
}

export function getPorts(ns: any): number {
    let ports: number = 0;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ports = ports + 1;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ports = ports + 1;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ports = ports + 1;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ports = ports + 1;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ports = ports + 1;
    }
    return ports
}

export function inferredDaedalusRoute(ns: any): string | null {
    let hackingLevel: number = ns.getHackingLevel();
    let inferredRoute: string | null = null;
    if (lowestCombatLevel(ns) > hackingLevel) {
        inferredRoute = "combat";
    } else if (hackingLevel > lowestCombatLevel(ns)) {
        inferredRoute = "hacking";
    } else if (hackingLevel == lowestCombatLevel(ns) || hackingLevel == 0 && lowestCombatLevel(ns) == 0) { 
        inferredRoute = null;
    }
    return inferredRoute;
}

export function nextMilestone(ns: any): string | number {
    let hackingLevel: number = ns.getHackingLevel();
    let hackingMilestoneLevels: number[] = [ns.getServer("CSEC").requiredHackingSkill, ns.getServer("avmnite-02h").requiredHackingSkill, ns.getServer("I.I.I.I").requiredHackingSkill, ns.getServer("run4theh111z").requiredHackingSkill, 2500, ns.getServer("w0r1d_d43mon").requiredHackingSkill];
    let combatMilestoneLevels: number[] = [30, 75, 200, 300, 850, 1200, 1500];
    let highestMilestone: number;
    let nextMilestone: number;

    if (inferredDaedalusRoute(ns) == "hacking" || inferredDaedalusRoute(ns) == null) {
        highestMilestone = Math.max(...hackingMilestoneLevels);
        nextMilestone = hackingMilestoneLevels.find(level => level > hackingLevel) as number;
        if (hackingLevel < highestMilestone) {
            return nextMilestone;
        } else {
            return "None :)";
        }
    } else {
        highestMilestone = Math.max(...combatMilestoneLevels);
        nextMilestone = combatMilestoneLevels.find(level => level > lowestCombatLevel(ns)) as number;
        if (lowestCombatLevel(ns) < highestMilestone) {
            return nextMilestone;
        } else {
            return "None :)";
        }
    }
}

export function factionAugsRemaining(ns: any, faction: string): number {
    let augsRemaining: number = 0;
    for (let i = 0; i < ns.singularity.getAugmentationsFromFaction(faction).length; i++) {
        if (!ns.singularity.getOwnedAugmentations().includes(ns.singularity.getAugmentationsFromFaction(faction)[i])) {
            augsRemaining = augsRemaining + 1;
        }
    }
    return augsRemaining;
}

export function donationsUnlocked(ns: any, faction: string): boolean {
    let favorRequirement: number = 150;

    if (currentBitnode(ns) == 3) {
        favorRequirement = 75;
    }

    return ns.singularity.getFactionFavor(faction) >= favorRequirement
}