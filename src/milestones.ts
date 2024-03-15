// milestones.js by qxxst
import * as util from 'lib/util';
/** @param {NS} ns */
export async function main(ns) {
    const hackingLevel = await ns.getHackingLevel(); // The player's current hacking level.
    const lowestCombatLevel = util.lowestCombatLevel(ns); // The player's lowest combat level.
    const karma = ns.heart.break();
    const money = ns.getPlayer().money;
    const location = ns.getPlayer().location;
    const kills = ns.getPlayer().numPeopleKilled;
    const augs = ns.getResetInfo().ownedAugs.size;

    function checkFaction(faction: string) {
        if (ns.getPlayer().factions.includes(faction)) {
            ns.tprint(`[x] You have already joined ${faction}.`);
            return
        } else {
            // Faction requirements vary heavily. Some of these will be used and others will be left as null.
            let combatLevelRequirement = null;
            let hackingLevelRequirement = null;
            let moneyRequirement = null;
            let karmaRequirement = null;
            let locationRequirement = null;
            let killRequirement = null;
            let augRequirement = null;

            // All of the criminal organizations
            if (faction == "Slum Snakes") {
                combatLevelRequirement = 30;
                karmaRequirement = -9;
                moneyRequirement = 1000000;
            }
            if (faction == "Tetrads") {
                combatLevelRequirement = 75;
                karmaRequirement = -18;
                locationRequirement = "Chongqing";
            }
            if (faction == "Speakers for the Dead") {
                combatLevelRequirement = 300;
                hackingLevelRequirement = 100;
                karmaRequirement = -45;
                killRequirement = 30;
            }
            if (faction == "The Dark Army") {
                combatLevelRequirement = 300;
                hackingLevelRequirement = 300;
                karmaRequirement = -45;
                locationRequirement = "Chongqing";
                killRequirement = 5;
            }
            if (faction == "The Syndicate") {
                combatLevelRequirement = 200;
                hackingLevelRequirement = 200;
                moneyRequirement = 10000000;
                karmaRequirement = -90;
                locationRequirement = "Sector-12";
            }

            // The three endgame factions
            if (faction == "Daedalus") {
                moneyRequirement = 100000000000;
                // If we own Source-File 5 or are in BitNode-5, we can check exactly how many augments are needed.
                if (util.sourceFileOwned(ns, 5, 1) || util.currentBitnode(ns) == 5) {
                    augRequirement = ns.getBitNodeMultipliers().DaedalusAugsRequirement;
                // If not, just try the default requirement of 30.
                } else {
                    augRequirement = 30;
                }
                if (util.inferredDaedalusRoute(ns) != null) {
                    if (util.inferredDaedalusRoute(ns) == "combat") {
                        combatLevelRequirement = 1500;
                    } else if (util.inferredDaedalusRoute(ns) == "hacking") {
                        hackingLevelRequirement = 2500;
                    }
                } else {
                    hackingLevelRequirement = 2500;
                    combatLevelRequirement = 1500;
                }
            }
            if (faction == "The Covenant") {
                combatLevelRequirement = 850;
                hackingLevelRequirement = 850;
                moneyRequirement = 75000000000;
                augRequirement = 20;
            }
            if (faction == "Illuminati") {
                combatLevelRequirement = 1200;
                hackingLevelRequirement = 1500;
                moneyRequirement = 150000000000;
                augRequirement = 30;
            }

            if (combatLevelRequirement != null) {
                if (lowestCombatLevel < combatLevelRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need all combat levels to be at least ${combatLevelRequirement}.`);
                    return
                }
            }
            if (hackingLevelRequirement != null) {
                if (hackingLevel < hackingLevelRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need a hacking level of at least ${hackingLevelRequirement}.`);
                    return
                }
            }
            if (karmaRequirement != null) {
                if (karma > karmaRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least ${karmaRequirement} karma.`);
                    return
                }
            }
            if (moneyRequirement != null) {
                if (money < moneyRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least $${ns.formatNumber(moneyRequirement)}.`);
                    return
                }
            }
            if (locationRequirement != null) {
                if (location != locationRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to be in ${locationRequirement}.`);
                    return
                }
            }
            if (killRequirement != null) {
                if (kills < killRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have killed at least ${killRequirement} people. You currently have ${kills}.`);
                    return
                }
            }
            if (augRequirement != null) {
                if (augs < augRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least ${augRequirement} augmentations.`);
                    return
                }
            }
            ns.tprint(`[ ] You are ready to join ${faction}.`);
        }
    }

    function checkServer(server: string, requiredPorts: number) {
        if (ns.serverExists(server)) {
            let canHack = null;
            let noHackReason = null;
            try {
                if (hackingLevel >= ns.getServer(server).requiredHackingSkill) {
                    if (util.getPorts(ns) >= requiredPorts) {
                        canHack = true;
                    } else {
                        canHack = false;
                        noHackReason = `You need ${requiredPorts} available ports to backdoor this server.`;
                    }
                } else {
                    canHack = false;
                    noHackReason = "You need hacking level " + ns.getServer(server).requiredHackingSkill + " to backdoor this server.";
                }
                if (canHack) {
                    if (ns.getServer(server).backdoorInstalled) {
                        ns.tprint(`[x] You have already backdoored ${server}.`);
                    } else {
                        ns.tprint(`[ ] You are ready to backdoor ${server}.`);
                    }
                } else {
                    ns.tprint(`[ ] You are not ready to backdoor ${server}. ${noHackReason}`);
                }
            } catch {
                ns.tprint(`The requested server (${server}) does not exist.`);
            }
        } else {
            ns.tprint(`The requested server (${server}) does not exist.`);
        }
    }

    ns.tprint('Hacking Milestones:');
    checkServer("CSEC", 1);
    checkServer("avmnite-02h", 2);
    checkServer("I.I.I.I", 3);
    checkServer("run4theh111z", 4);

    ns.tprint('Combat Milestones:');
    checkFaction("Slum Snakes");
    checkFaction("Tetrads");
    checkFaction("Speakers for the Dead");
    checkFaction("The Dark Army");
    checkFaction("The Syndicate");

    ns.tprint('Endgame Milestones:');
    checkFaction("Daedalus");
    checkFaction("The Covenant");
    checkFaction("Illuminati");
    
    ns.tprint('World Daemon:');
    checkServer("w0r1d_d43mon", 5);
}