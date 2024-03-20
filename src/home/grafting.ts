// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const focus: boolean = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const prioritizeNickfolas: boolean = true; // Whether you want to put down the Entropy virus first.
    const logSleep: boolean = false; // Whether or not the sleep function should be logged.

    // Constants
    const nickofolas: string = "nickofolas Congruity Implant";
    const hackingRelatedMultipliers: string[] = ["hacking_chance", "hacking_exp", "hacking_grow", "hacking_money", "hacking_speed", "hacking"];
    const combatRelatedMultipliers: string[] = ["agility_exp", "agility", "defense_exp", "defense", "dexterity_exp", "dexterity", "strength_exp", "strength"];

    if (logSleep == false) {
        ns.disableLog("sleep");
    }

    let currentCity: string = ns.getPlayer().location;
    let graftableAugs: string[] = ns.grafting.getGraftableAugmentations();
    let augsRemaining: number = graftableAugs.length;
    let focusActualNecessary: boolean = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus: boolean = focus && focusActualNecessary;
    let ownedAugmentations: string[] = await ns.singularity.getOwnedAugmentations();
    let money: number = ns.getPlayer().money;

    async function check(): Promise<void> {
        currentCity = ns.getPlayer().location;
        if (currentCity !== "New Tokyo") {
            ns.singularity.travelToCity("New Tokyo");
            currentCity = "New Tokyo";
        }

        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
        focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
        actuallyFocus = focus && focusActualNecessary;
        ownedAugmentations = await ns.singularity.getOwnedAugmentations();
        money = ns.getPlayer().money;
    }

    function canAfford(aug: string): boolean {
        money = ns.getPlayer().money;
        return money >= ns.grafting.getAugmentationGraftPrice(aug);
    }

    async function waitUntilNotGrafting(): Promise<void> {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }

    if (!ownedAugmentations.includes(nickofolas)) {
        const query: string = "You do not currently have the " + nickofolas + " installed. It is recommended to graft that first. (The script will do that for you if you have enough money.) Would you like to proceed without it?";
        const result: boolean = await ns.prompt(query);
        const thisScript: string = "grafting.js";
        if (!result) {
            ns.kill(thisScript);
        }
    }

    for (let aug of graftableAugs) {
        await check();
        await waitUntilNotGrafting();

        if (prioritizeNickfolas && !ownedAugmentations.includes(nickofolas)) {
            if (canAfford(nickofolas)) {
                await ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
            }
        } else {
            if (canAfford(aug)) {
                await ns.grafting.graftAugmentation(aug, actuallyFocus);
            }
        }

        await waitUntilNotGrafting();
        await check();
    }
}