// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const prioritizeNickfolas = true; // Whether you want to put down the Entropy virus first.
    const logSleep = false; // Whether or not the sleep function should be logged.
    // Constants
    const nickofolas = "nickofolas Congruity Implant";
    const hackingRelatedMultipliers = ["hacking_chance", "hacking_exp", "hacking_grow", "hacking_money", "hacking_speed", "hacking"];
    const combatRelatedMultipliers = ["agility_exp", "agility", "defense_exp", "defense", "dexterity_exp", "dexterity", "strength_exp", "strength"];
    if (logSleep == false) {
        ns.disableLog("sleep");
    }
    let currentCity = ns.getPlayer().location;
    let graftableAugs = ns.grafting.getGraftableAugmentations();
    let augsRemaining = graftableAugs.length;
    let focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus = focus && focusActualNecessary;
    let ownedAugmentations = await ns.singularity.getOwnedAugmentations();
    let money = ns.getPlayer().money;
    async function check() {
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
    function canAfford(aug) {
        money = ns.getPlayer().money;
        return money >= ns.grafting.getAugmentationGraftPrice(aug);
    }
    async function waitUntilNotGrafting() {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }
    if (!ownedAugmentations.includes(nickofolas)) {
        const query = "You do not currently have the " + nickofolas + " installed. It is recommended to graft that first. (The script will do that for you if you have enough money.) Would you like to proceed without it?";
        const result = await ns.prompt(query);
        const thisScript = "grafting.js";
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
        }
        else {
            if (canAfford(aug)) {
                await ns.grafting.graftAugmentation(aug, actuallyFocus);
            }
        }
        await waitUntilNotGrafting();
        await check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLG1CQUFtQixHQUFZLElBQUksQ0FBQyxDQUFDLHdEQUF3RDtJQUNuRyxNQUFNLFFBQVEsR0FBWSxLQUFLLENBQUMsQ0FBQyxzREFBc0Q7SUFFdkYsWUFBWTtJQUNaLE1BQU0sVUFBVSxHQUFXLDhCQUE4QixDQUFDO0lBQzFELE1BQU0seUJBQXlCLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0ksTUFBTSx3QkFBd0IsR0FBYSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUxSixJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2xELElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUN0RSxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2pELElBQUksb0JBQW9CLEdBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4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