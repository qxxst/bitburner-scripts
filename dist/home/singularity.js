// singularity.js by qxxst
import { factionAugsRemaining } from 'lib/util';
/** @param {NS} ns */
export async function main(ns) {
    // SETTINGS
    // Whether or not the script should stay on after completing all tasks
    const stayOn = true;
    // Whether or not the sleep function should be logged
    const logSleep = false;
    // The amount of time to sleep when "actually" waiting for things to happen
    const sleepTimeLong = 1000;
    // The smaller amount of time to sleep during loops to avoid RAM issues.
    // This can be lowered if you have lots of RAM on home. On the other hand, if scripts are not being deployed properly, try raising it.
    const sleepTimeShort = 100;
    // Set this to true to avoid buying any RAM or core upgrades. Useful for BN1's challenge.
    const noComputerUpgrades = false;
    // Factions to automatically accept invites from.
    const autoJoinFactions = ["CyberSec", "NiteSec", "The Black Hand", "BitRunners", "Netburners", "Tian Di Hui", "Slum Snakes", "Tetrads", "Speakers for the Dead", "The Dark Army", "The Syndicate", "Daedalus", "The Covenant", "Illuminati", "ECorp", "MegaCorp", "KuaiGong International", "Four Sigma", "NWO", "Blade Industries", "OmniTek Incorporated", "Bachman & Associates", "Clarke Incorporated", "Fulcrum Secret Technologies", "Bladeburners"];
    // Factions to only join if we still need Augmentations from them.
    const conditionalJoinFactions = {
        cities: ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Aevum", "Volhaven"]
    };
    // CONSTANTS - DO NOT CHANGE
    const home = "home";
    const currentBitNode = ns.getResetInfo().currentNode;
    const csec = "CSEC"; // The name of CSEC's server.
    const niteSec = "avmnite-02h"; // The name of NiteSec's server.
    const blackHand = "I.I.I.I"; // The name of The Black Hand's server.
    const bitRunners = "run4theh111z"; // The name of the BitRunners' server.
    const wd = "w0r1d_d43m0n"; // The name of the world daemon server.
    const hackingLevel = await ns.getHackingLevel(); // The player's current hacking level.
    if (logSleep == false) {
        ns.disableLog("sleep");
    }
    let torPrice = 200000;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ3VsYXJpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9zaW5ndWxhcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLFdBQVc7SUFDWCxzRUFBc0U7SUFDdEUsTUFBTSxNQUFNLEdBQVksSUFBSSxDQUFDO0lBQzdCLHFEQUFxRDtJQUNyRCxNQUFNLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDaEMsMkVBQTJFO0lBQzNFLE1BQU0sYUFBYSxHQUFXLElBQUksQ0FBQztJQUNuQyx3RUFBd0U7SUFDeEUsc0lBQXNJO0lBQ3RJLE1BQU0sY0FBYyxHQUFXLEdBQUcsQ0FBQztJQUNuQyx5RkFBeUY7SUFDekYsTUFBTSxrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDMUMsaURBQWlEO0lBQ2pELE1BQU0sZ0JBQWdCLEdBQXNCLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLDZCQUE2QixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzljLGtFQUFrRTtJQUNsRSxNQUFNLHVCQUF1QixHQUFnQztRQUN6RCxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUcsT0FBTyxFQUFFLFVBQVUs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