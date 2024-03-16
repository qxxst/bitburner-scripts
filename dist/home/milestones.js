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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlsZXN0b25lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob21lL21pbGVzdG9uZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sS0FBSyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLE1BQU0sWUFBWSxHQUFXLE1BQU0sRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsc0NBQXNDO0lBQy9GLE1BQU0saUJBQWlCLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0NBQW9DO0lBQ2xHLE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkMsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUMzQyxNQUFNLFFBQVEsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2pELE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDckQsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFFdEQsU0FBUyxZQUFZLENBQUMsT0FBZTtRQUNqQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDNUMsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNyRCxPQUFNO1FBQ1YsQ0FBQzthQUFNLENBQUM7WUFDSixpR0FBaUc7WUFDakcsSUFBSSxzQkFBc0IsR0FBa0IsSUFBSSxDQUFDO1lBQ2pELElBQUksdUJBQXVCLEdBQWtC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