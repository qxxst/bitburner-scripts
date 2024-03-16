// grafting.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    // Settings
    const focus = true; // Whether or not you want the grafting task to be focused on. This makes it go faster but prevents you from doing other things while it's working.
    const filter = "hack"; // The type of augs we specificaly want to graft. Set to null to graft everything.
    const prioritizeNickfolas = true; // Whether you want to put down the Entropy virus first.
    // Constants
    const nickofolas = "nickofolas Congruity Implant";
    let currentCity = ns.getPlayer().location;
    if (currentCity !== "New Tokyo") {
        ns.singularity.travelToCity("New Tokyo");
        currentCity = "New Tokyo";
    }
    let graftableAugs = ns.grafting.getGraftableAugmentations();
    let augsRemaining = graftableAugs.length;
    let focusActualNecessary = !!ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
    let actuallyFocus = focus && focusActualNecessary;
    function check() {
        graftableAugs = ns.grafting.getGraftableAugmentations();
        augsRemaining = graftableAugs.length;
        focusActualNecessary = !!ns.singularity.getOwnedAugmentations().includes("Neural-Retention Enhancement");
        actuallyFocus = focus && focusActualNecessary;
    }
    async function waitUntilNotGrafting() {
        while (ns.singularity.getCurrentWork() !== null) {
            await ns.sleep(1000);
        }
    }
    for (let aug of graftableAugs) {
        check();
        if (prioritizeNickfolas && !!ns.singularity.getOwnedAugmentations().includes(nickofolas)) {
            ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
            waitUntilNotGrafting();
        }
        else {
            ns.grafting.graftAugmentation(aug, actuallyFocus);
            waitUntilNotGrafting();
        }
        check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLE1BQU0sR0FBa0IsTUFBTSxDQUFDLENBQUMsa0ZBQWtGO0lBQ3hILE1BQU0sbUJBQW1CLEdBQVksSUFBSSxDQUFDLENBQUMsd0RBQXdEO0lBRW5HLFlBQVk7SUFDWixNQUFNLFVBQVUsR0FBVyw4QkFBOEIsQ0FBQztJQUUxRCxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2xELElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUN0RSxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2pELElBQUksb0JBQW9CLEdBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN0SCxJQUFJLGFBQWEsR0FBWSxLQUFLLElBQUksb0JBQW9CLENBQUM7SUFFM0QsU0FBUyxLQUFLO1FBQ1YsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUN4RCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3pHLGFBQWEsR0FBRyxLQUFLLElBQUksb0JBQW9CLENBQUM7SUFDbEQsQ0FBQztJQUVELEtBQUssVUFBVSxvQkFBb0I7UUFDL0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDdkYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDekQsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQixDQUFDO2FBQU0sQ0FBQztZQUNKLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELG9CQUFvQixFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztBQUNMLENBQUMifQ==