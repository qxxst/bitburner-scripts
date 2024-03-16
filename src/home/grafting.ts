// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns: any) {
    // Settings
    const focus: boolean = true;
    const cooldown: number = 1000;

    let currentCity: string = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }

    let graftableAugs: string[];
    let augsRemaining: number;
    graftableAugs = ns.grafting.getGraftableAugmentations();
    
    augsRemaining = graftableAugs.length;
    function check() {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
    }

    for (let aug of graftableAugs) {
        let time: number = ns.grafting.getAugmentationGraftTime(aug);

        ns.grafting.graftAugmentation(aug, focus);

        await ns.sleep(time + cooldown);
        
        check();
    }
}