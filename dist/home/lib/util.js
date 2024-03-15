// lib/util.js by qxxst
export function lowestCombatLevel(ns) {
    let str = ns.getPlayer().skills.strength;
    let def = ns.getPlayer().skills.defense;
    let dex = ns.getPlayer().skills.dexterity;
    let agi = ns.getPlayer().skills.agility;
    return Math.min(str, def, dex, agi);
}
export function sourceFileOwned(ns, sourceFile, level) {
    return ns.getResetInfo().ownedSF.has(sourceFile) && ns.getResetInfo().ownedSF.get(sourceFile) >= level;
}
export function currentBitnode(ns) {
    return ns.getResetInfo().currentNode;
}
export function grossIncomePerSecond(ns) {
    let allSources = ns.getMoneySources().sinceInstall;
    let income1 = allSources.crime + allSources.hacking + allSources.hacknet + allSources.work;
    ns.sleep(1000);
    let income2 = allSources.crime + allSources.hacking + allSources.hacknet + allSources.work;
    return income2 - income1;
}
export function getPorts(ns) {
    let ports = 0;
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
    return ports;
}
export function inferredDaedalusRoute(ns) {
    let hackingLevel = ns.getHackingLevel();
    let inferredRoute = null;
    if (lowestCombatLevel(ns) > hackingLevel) {
        inferredRoute = "combat";
    }
    else if (hackingLevel > lowestCombatLevel(ns)) {
        inferredRoute = "hacking";
    }
    else if (hackingLevel == lowestCombatLevel(ns) || hackingLevel == 0 && lowestCombatLevel(ns) == 0) {
        inferredRoute = null;
    }
    return inferredRoute;
}
export function nextMilestone(ns) {
    let hackingLevel = ns.getHackingLevel();
    let hackingMilestoneLevels = [ns.getServer("CSEC").requiredHackingSkill, ns.getServer("avmnite-02h").requiredHackingSkill, ns.getServer("I.I.I.I").requiredHackingSkill, ns.getServer("run4theh111z").requiredHackingSkill, 2500, ns.getServer("w0r1d_d43mon").requiredHackingSkill];
    let combatMilestoneLevels = [30, 75, 200, 300, 850, 1200, 1500];
    let highestMilestone;
    let nextMilestone;
    if (inferredDaedalusRoute(ns) == "hacking" || inferredDaedalusRoute(ns) == null) {
        highestMilestone = Math.max(...hackingMilestoneLevels);
        nextMilestone = hackingMilestoneLevels.find(level => level > hackingLevel);
        if (hackingLevel < highestMilestone) {
            return nextMilestone;
        }
        else {
            return "None :)";
        }
    }
    else {
        highestMilestone = Math.max(...combatMilestoneLevels);
        nextMilestone = combatMilestoneLevels.find(level => level > lowestCombatLevel(ns));
        if (lowestCombatLevel(ns) < highestMilestone) {
            return nextMilestone;
        }
        else {
            return "None :)";
        }
    }
}
export function factionAugsRemaining(ns, faction) {
    let augsRemaining = 0;
    for (let i = 0; i < ns.singularity.getAugmentationsFromFaction(faction).length; i++) {
        if (!ns.singularity.getOwnedAugmentations().includes(ns.singularity.getAugmentationsFromFaction(faction)[i])) {
            augsRemaining = augsRemaining + 1;
        }
    }
    return augsRemaining;
}
export function donationsUnlocked(ns, faction) {
    let favorRequirement = 150;
    if (currentBitnode(ns) == 3) {
        favorRequirement = 75;
    }
    return ns.singularity.getFactionFavor(faction) >= favorRequirement;
}
