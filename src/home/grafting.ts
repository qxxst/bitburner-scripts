// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const focus: boolean = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const filter: string | null = "hack"; // The type of augs we specificaly want to graft. Set to null to graft everything.

    let currentCity: string = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }

    let graftableAugs: string[];
    let augsRemaining: number;
    graftableAugs = ns.grafting.getGraftableAugmentations();
    augsRemaining = graftableAugs.length;

    function check(): void {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
    }

    for (let aug of graftableAugs) {
        ns.grafting.graftAugmentation(aug, focus);

        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }

        check();
    }
}