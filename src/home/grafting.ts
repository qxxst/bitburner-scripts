// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const focus: boolean = true;

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