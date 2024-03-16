// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    let currentCity: string = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }

    let graftableAugs: string[];
    let augsRemaining: number;
    graftableAugs = ns.grafting.getGraftableAugmentations();

    const focus: boolean = true;
    
    augsRemaining = graftableAugs.length;
    function check() {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
    }

    for (let aug of graftableAugs) {
        ns.grafting.graftAugmentation(aug, focus);
        check();
    }
}