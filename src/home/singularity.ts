// singularity.js by qxxst
import {factionAugsRemaining} from 'lib/util';
/** @param {NS} ns */
export async function main(ns: any) {
    // SETTINGS
    // Whether or not the script should stay on after completing all tasks
    const stayOn: boolean = true;
    // Whether or not the sleep function should be logged
    const logSleep: boolean = false;
    // The amount of time to sleep when "actually" waiting for things to happen
    const sleepTimeLong: number = 1000;
    // The smaller amount of time to sleep during loops to avoid RAM issues.
    // This can be lowered if you have lots of RAM on home. On the other hand, if scripts are not being deployed properly, try raising it.
    const sleepTimeShort: number = 100;
    // Set this to true to avoid buying any RAM or core upgrades. Useful for BN1's challenge.
    const noComputerUpgrades: boolean = false;
    // Factions to automatically accept invites from.
    const autoJoinFactions: string[] = ["CyberSec", "NiteSec", "The Black Hand", "BitRunners", "Netburners", "Tian Di Hui", "Slum Snakes", "Tetrads", "Speakers for the Dead", "The Dark Army", "The Syndicate", "Daedalus", "The Covenant", "Illuminati", "ECorp", "MegaCorp", "KuaiGong International", "Four Sigma", "NWO", "Blade Industries", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated", "Fulcrum Secret Technologies", "Bladeburners"];
    // Factions to only join if we still need Augmentations from them.
    const conditionalJoinFactions: {cities: string[]} = {
        cities: ["Sector-12", "Chongqing", "New Tokyo", "Ishima",  "Aevum", "Volhaven"]
    };


    // CONSTANTS - DO NOT CHANGE
    const home: string = "home";
    const currentBitNode: number = ns.getResetInfo().currentNode;
    const csec: string = "CSEC"; // The name of CSEC's server.
    const niteSec: string = "avmnite-02h"; // The name of NiteSec's server.
    const blackHand: string = "I.I.I.I"; // The name of The Black Hand's server.
    const bitRunners: string = "run4theh111z"; // The name of the BitRunners' server.
    const wd: string = "w0r1d_d43m0n"; // The name of the world daemon server.
    const hackingLevel: number = await ns.getHackingLevel(); // The player's current hacking level.

    if (logSleep == false) {
        ns.disableLog("sleep");
    }

    let torPrice: number = 200000;

    // Kill any running instances of startup.js and its friends
    ns.scriptKill("startup.js", home);
    ns.scriptKill("hacknet.js", home);
    ns.scriptKill("tix.js", home);
    ns.scriptKill("combatgang.js", home);

    async function idleTasks() {
        if (ns.getPlayer().money > torPrice && ns.hasTorRouter() == false) {
            ns.singularity.purchaseTor();
        }

        await ns.sleep(sleepTimeShort);

        if (noComputerUpgrades == false) {
            if (ns.getPlayer().money > ns.singularity.getUpgradeHomeRamCost()) {
                await ns.singularity.upgradeHomeRam();
            }
            if (ns.getPlayer().money > ns.singularity.getUpgradeHomeCoresCost()) {
                await ns.singularity.upgradeHomeCores();
            }
        }

        await ns.sleep(sleepTimeShort);

        if (ns.singularity.checkFactionInvitations().length > 0) {
            for (let faction of ns.singularity.checkFactionInvitations()) {
                if (autoJoinFactions.includes(faction)) {
                    ns.singularity.joinFaction(faction);
                }
                if (conditionalJoinFactions.cities.includes(faction) && factionAugsRemaining(ns, faction) > 0) {
                    ns.singularity.joinFaction(faction);
                } /* else {
                    if (factionAugsRemaining(ns, conditionalJoinFactions.cities[1]) > 0 && factionAugsRemaining(ns, conditionalJoinFactions.cities[2]) > 0 && factionAugsRemaining(ns, conditionalJoinFactions.cities[3]) > 0 && factionAugsRemaining(ns, conditionalJoinFactions.cities[4]) > 0 && factionAugsRemaining(ns, conditionalJoinFactions.cities[5]) > 0 && factionAugsRemaining(ns, conditionalJoinFactions.cities[6]) > 0) {
                        ns.singularity.joinFaction(faction);
                    }
                } */
            }
        }

        await ns.sleep(sleepTimeShort);
    }

    ns.exec("startup.js", home);

    if (stayOn == true) {
        while (true) {
            await idleTasks();
            await ns.sleep(sleepTimeLong);
        }
    }
}