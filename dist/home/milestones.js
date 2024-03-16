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
    function checkFaction(faction) {
        if (ns.getPlayer().factions.includes(faction)) {
            ns.tprint(`[x] You have already joined ${faction}.`);
            return;
        }
        else {
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
                }
                else {
                    augRequirement = 30;
                }
                if (util.inferredDaedalusRoute(ns) != null) {
                    if (util.inferredDaedalusRoute(ns) == "combat") {
                        combatLevelRequirement = 1500;
                    }
                    else if (util.inferredDaedalusRoute(ns) == "hacking") {
                        hackingLevelRequirement = 2500;
                    }
                }
                else {
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
                    return;
                }
            }
            if (hackingLevelRequirement != null) {
                if (hackingLevel < hackingLevelRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need a hacking level of at least ${hackingLevelRequirement}.`);
                    return;
                }
            }
            if (karmaRequirement != null) {
                if (karma > karmaRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least ${karmaRequirement} karma.`);
                    return;
                }
            }
            if (moneyRequirement != null) {
                if (money < moneyRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least $${ns.formatNumber(moneyRequirement)}.`);
                    return;
                }
            }
            if (locationRequirement != null) {
                if (location != locationRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to be in ${locationRequirement}.`);
                    return;
                }
            }
            if (killRequirement != null) {
                if (kills < killRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have killed at least ${killRequirement} people. You currently have ${kills}.`);
                    return;
                }
            }
            if (augRequirement != null) {
                if (augs < augRequirement) {
                    ns.tprint(`[ ] You are not ready to join ${faction}. You need to have at least ${augRequirement} augmentations.`);
                    return;
                }
            }
            ns.tprint(`[ ] You are ready to join ${faction}.`);
        }
    }
    function checkServer(server, requiredPorts) {
        if (ns.serverExists(server)) {
            let canHack = null;
            let noHackReason = null;
            try {
                if (hackingLevel >= ns.getServer(server).requiredHackingSkill) {
                    if (util.getPorts(ns) >= requiredPorts) {
                        canHack = true;
                    }
                    else {
                        canHack = false;
                        noHackReason = `You need ${requiredPorts} available ports to backdoor this server.`;
                    }
                }
                else {
                    canHack = false;
                    noHackReason = "You need hacking level " + ns.getServer(server).requiredHackingSkill + " to backdoor this server.";
                }
                if (canHack) {
                    if (ns.getServer(server).backdoorInstalled) {
                        ns.tprint(`[x] You have already backdoored ${server}.`);
                    }
                    else {
                        ns.tprint(`[ ] You are ready to backdoor ${server}.`);
                    }
                }
                else {
                    ns.tprint(`[ ] You are not ready to backdoor ${server}. ${noHackReason}`);
                }
            }
            catch {
                ns.tprint(`The requested server (${server}) does not exist.`);
            }
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlsZXN0b25lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob21lL21pbGVzdG9uZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sS0FBSyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLE1BQU0sWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsc0NBQXNDO0lBQ3ZGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0NBQW9DO0lBQzFGLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDN0MsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFFOUMsU0FBUyxZQUFZLENBQUMsT0FBZTtRQUNqQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDNUMsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNyRCxPQUFNO1FBQ1YsQ0FBQzthQUFNLENBQUM7WUFDSixpR0FBaUc7WUFDakcsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSx1QkFBdUIsR0FBRyxJ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