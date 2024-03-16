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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ3VsYXJpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9zaW5ndWxhcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLFdBQVc7SUFDWCxzRUFBc0U7SUFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLHFEQUFxRDtJQUNyRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDdkIsMkVBQTJFO0lBQzNFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQztJQUMzQix3RUFBd0U7SUFDeEUsc0lBQXNJO0lBQ3RJLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUMzQix5RkFBeUY7SUFDekYsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDakMsaURBQWlEO0lBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsNkJBQTZCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM2Isa0VBQWtFO0lBQ2xFLE1BQU0sdUJBQXVCLEdBQUc7UUFDNUIsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFHLE9BQU8sRUFBRSxVQUFVLENB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