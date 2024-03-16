// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const filter = "hack"; // The type of augs we specificaly want to graft. Set to hack or combat, or set to null to graft everything.
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
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }
    let graftableAugs = ns.grafting.getGraftableAugmentations();
    let augsRemaining = graftableAugs.length;
    let focusActualNecessary = !!await ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus = focus && focusActualNecessary;
    let ownedAugmentations = await ns.singularity.getOwnedAugmentations();
    async function check() {
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
        /* let relevant: boolean = true;

        if (prioritizeNickfolas && !ownedAugmentations.includes(nickofolas)) {
        relevant = true;
        } else {
            if (filter !== null) {
                let augMultipliers: any = await ns.singularity.getAugmentationStats(aug);
                let currentMultiplier: any;
                let propertyName: string;

                if (filter === "hack") {
                    for (let mult of hackingRelatedMultipliers) {
                        propertyName = hackingRelatedMultipliers[mult];
                        currentMultiplier = augMultipliers[propertyName];
                        ns.print(currentMultiplier);

                        if (currentMultiplier > 1.00) {
                            relevant = true;
                        }
                    }
                }
                if (filter === "combat") {
                    for (let mult of combatRelatedMultipliers) {
                        currentMultiplier = augMultipliers.combatRelatedMultipliers[mult];
                        ns.print(currentMultiplier);

                        if (currentMultiplier > 1.00) {
                            relevant = true;
                        }
                    }
                }
            }
        }

        if (relevant) {
            await ns.grafting.graftAugmentation(aug, actuallyFocus);
        } */
        // just use this version for now until I can figure out what I'm doing
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLE1BQU0sR0FBa0IsTUFBTSxDQUFDLENBQUMsNEdBQTRHO0lBQ2xKLE1BQU0sbUJBQW1CLEdBQVksSUFBSSxDQUFDLENBQUMsd0RBQXdEO0lBQ25HLE1BQU0sUUFBUSxHQUFZLEtBQUssQ0FBQyxDQUFDLHNEQUFzRDtJQUV2RixZQUFZO0lBQ1osTUFBTSxVQUFVLEdBQVcsOEJBQThCLENBQUM7SUFDMUQsTUFBTSx5QkFBeUIsR0FBYSxDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzSSxNQUFNLHdCQUF3QixHQUFhLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTFKLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVyxHQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDbEQsSUFBSSxXQUFXLEtBQUssV0FBVyxFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxhQUFhLEdBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3RFLElBQUksYUFBYSxHQUFXLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDakQsSUFBSSxvQkFBb0IsR0FBWSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDNUgsSUFBSSxhQUFhLEdBQVksS0FBSyxJQUFJLG9CQUFvQixDQUFDO0lBQzNELElBQUksa0JBQWtCLEdBQWEsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFFaEYsS0FBSyxVQUFVLEtBQUs7UUFDaEIsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUN4RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDL0csYUFBYSxHQUFHLEtBQUssSUFBSSxvQkFBb0IsQ0FBQztRQUM5QyxrQkFBa0IsR0FBRyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRUQsS0FBSyxVQUFVLG9CQUFvQjtRQUMvQixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUM1QixNQUFNLEtBQUssRUFBRSxDQUFDO1FBQ2QsTUFBTSxvQkFBb0IsRUFBRSxDQUFDO1FBRTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFvQ0k7UUFFSixzRUFBc0U7UUFDdEUsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ2xFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkUsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFRCxNQUFNLG9CQUFvQixFQUFFLENBQUM7UUFDN0IsTUFBTSxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDO0FBQ0wsQ0FBQyJ9