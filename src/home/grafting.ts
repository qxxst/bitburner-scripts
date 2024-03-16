// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const focus: boolean = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const filter: string | null = "hack"; // The type of augs we specificaly want to graft. Set to null to graft everything.
    const prioritizeNickfolas: boolean = true; // Whether you want to put down the Entropy virus first.
    const logSleep: boolean = false; // Whether or not the sleep function should be logged.

    // Constants
    const nickofolas: string = "nickofolas Congruity Implant";

    if (logSleep == false) {
        ns.disableLog("sleep");
    }

    let currentCity: string = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }

    let graftableAugs: string[] = ns.grafting.getGraftableAugmentations();
    let augsRemaining: number = graftableAugs.length;
    let focusActualNecessary: boolean = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus: boolean = focus && focusActualNecessary;
    let ownedAugmentations: string[] = await ns.singularity.getOwnedAugmentations();

    async function check(): Promise<void> {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
        focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
        actuallyFocus = focus && focusActualNecessary;
        ownedAugmentations = await ns.singularity.getOwnedAugmentations();
    }

    async function waitUntilNotGrafting(): Promise<void> {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }

    for (let aug of graftableAugs) {
        await check();
        await waitUntilNotGrafting();

        if (prioritizeNickfolas && !!ownedAugmentations.includes(nickofolas)) {
            await ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
        } else {
            await ns.grafting.graftAugmentation(aug, actuallyFocus);
        }
        await waitUntilNotGrafting();

        await check();
    }
}