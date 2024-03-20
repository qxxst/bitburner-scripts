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
    }
    async function waitUntilNotGrafting() {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }
    for (let aug of graftableAugs) {
        await check();
        await waitUntilNotGrafting();
        if (prioritizeNickfolas && !ownedAugmentations.includes(nickofolas)) {
            await ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
        }
        else {
            await ns.grafting.graftAugmentation(aug, actuallyFocus);
        }
        await waitUntilNotGrafting();
        await check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLG1CQUFtQixHQUFZLElBQUksQ0FBQyxDQUFDLHdEQUF3RDtJQUNuRyxNQUFNLFFBQVEsR0FBWSxLQUFLLENBQUMsQ0FBQyxzREFBc0Q7SUFFdkYsWUFBWTtJQUNaLE1BQU0sVUFBVSxHQUFXLDhCQUE4QixDQUFDO0lBQzFELE1BQU0seUJBQXlCLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0ksTUFBTSx3QkFBd0IsR0FBYSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUxSixJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2xELElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUN0RSxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2pELElBQUksb0JBQW9CLEdBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzVILElBQUksYUFBYSxHQUFZLEtBQUssSUFBSSxvQkFBb0IsQ0FBQztJQUMzRCxJQUFJLGtCQUFrQixHQUFhLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRWhGLEtBQUssVUFBVSxLQUFLO1FBQ2hCLFdBQVcsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDOUIsQ0FBQztRQUVELGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDeEQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQy9HLGFBQWEsR0FBRyxLQUFLLElBQUksb0JBQW9CLENBQUM7UUFDOUMsa0JBQWtCLEdBQUcsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUssVUFBVSxvQkFBb0I7UUFDL0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDNUIsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztRQUU3QixJQUFJLG1CQUFtQixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbEUsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRSxDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVELE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztRQUM3QixNQUFNLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7QUFDTCxDQUFDIn0=