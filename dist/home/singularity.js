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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ3VsYXJpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9zaW5ndWxhcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQzlCLFdBQVc7SUFDWCxzRUFBc0U7SUFDdEUsTUFBTSxNQUFNLEdBQVksSUFBSSxDQUFDO0lBQzdCLHFEQUFxRDtJQUNyRCxNQUFNLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDaEMsMkVBQTJFO0lBQzNFLE1BQU0sYUFBYSxHQUFXLElBQUksQ0FBQztJQUNuQyx3RUFBd0U7SUFDeEUsc0lBQXNJO0lBQ3RJLE1BQU0sY0FBYyxHQUFXLEdBQUcsQ0FBQztJQUNuQyx5RkFBeUY7SUFDekYsTUFBTSxrQkFBa0IsR0FBWSxLQUFLLENBQUM7SUFDMUMsaURBQWlEO0lBQ2pELE1BQU0sZ0JBQWdCLEdBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsNkJBQTZCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDcmMsa0VBQWtFO0lBQ2xFLE1BQU0sdUJBQXVCLEdBQXVCO1FBQ2hELE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRyxPQUFPLEVBQUUsVUFBVSxDQUFDO0tBQ2xGLENBQUM7SUFHRiw0QkFBNEI7SUFDNUIsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDO0lBQzVCLE1BQU0sY0FBYyxHQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDN0QsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLENBQUMsNkJBQTZCO0lBQzFELE1BQU0sT0FBTyxHQUFXLGFBQWEsQ0FBQyxDQUFDLGdDQUFnQztJQUN2RSxNQUFNLFNBQVMsR0FBVyxTQUFTLENBQUMsQ0FBQyx1Q0FBdUM7SUFDNUUsTUFBTSxVQUFVLEdBQVcsY0FBYyxDQUFDLENBQUMsc0NBQXNDO0lBQ2pGLE1BQU0sRUFBRSxHQUFXLGNBQWMsQ0FBQyxDQUFDLHVDQUF1QztJQUMxRSxNQUFNLFlBQVksR0FBVyxNQUFNLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNDQUFzQztJQUUvRixJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFFBQVEsR0FBVyxNQUFNLENBQUM7SUFFOUIsMkRBQTJEO0lBQzNELEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXJDLEtBQUssVUFBVSxTQUFTO1FBQ3BCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUVELE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUvQixJQUFJLGtCQUFrQixJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzlCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFDLENBQUM7WUFDRCxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUM7Z0JBQ2xFLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9CLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN0RCxLQUFLLElBQUksT0FBTyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDO2dCQUMzRCxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUNyQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFDRCxJQUFJLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksb0JBQW9CLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUM1RixFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDOzs7O29CQUlFO1lBQ1IsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDVixNQUFNLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMifQ==