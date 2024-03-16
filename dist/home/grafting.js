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
        if (prioritizeNickfolas && !!ownedAugmentations.includes(nickofolas)) {
            await ns.grafting.graftAugmentation(nickofolas, actuallyFocus);
        }
        else {
            await ns.grafting.graftAugmentation(aug, actuallyFocus);
        }
        await waitUntilNotGrafting();
        await check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZnRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9tZS9ncmFmdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU87SUFDOUIsV0FBVztJQUNYLE1BQU0sS0FBSyxHQUFZLElBQUksQ0FBQyxDQUFDLG1KQUFtSjtJQUNoTCxNQUFNLE1BQU0sR0FBa0IsTUFBTSxDQUFDLENBQUMsa0ZBQWtGO0lBQ3hILE1BQU0sbUJBQW1CLEdBQVksSUFBSSxDQUFDLENBQUMsd0RBQXdEO0lBRW5HLFlBQVk7SUFDWixNQUFNLFVBQVUsR0FBVyw4QkFBOEIsQ0FBQztJQUUxRCxJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ2xELElBQUksV0FBVyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUN0RSxJQUFJLGFBQWEsR0FBVyxhQUFhLENBQUMsTUFBTSxDQUFDO0lBQ2pELElBQUksb0JBQW9CLEdBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzVILElBQUksYUFBYSxHQUFZLEtBQUssSUFBSSxvQkFBb0IsQ0FBQztJQUMzRCxJQUFJLGtCQUFrQixHQUFhLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRWhGLEtBQUssVUFBVSxLQUFLO1FBQ2hCLGFBQWEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDeEQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQy9HLGFBQWEsR0FBRyxLQUFLLElBQUksb0JBQW9CLENBQUM7UUFDOUMsa0JBQWtCLEdBQUcsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUssVUFBVSxvQkFBb0I7UUFDL0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDNUIsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztRQUU3QixJQUFJLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNuRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25FLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsTUFBTSxvQkFBb0IsRUFBRSxDQUFDO1FBRTdCLE1BQU0sS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQztBQUNMLENBQUMifQ==