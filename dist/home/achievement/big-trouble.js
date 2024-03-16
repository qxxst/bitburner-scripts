// achievement/big-trouble.js by qxxst
/** @param {NS} ns */
/* Used for the "Big trouble" achievement */
/* Run after installing augmentations */
export async function main(ns) {
    const target = 'n00dles';
    const minSecurityLevel = await ns.getServerMinSecurityLevel(target);
    while (true) {
        await ns.hack(target);
        // Checks if the security level is greater than the minimum before running weaken
        var securityLevel = await ns.getServerSecurityLevel(target);
        if (securityLevel > minSecurityLevel) {
            await ns.weaken(target);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnLXRyb3VibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaG9tZS9hY2hpZXZlbWVudC9iaWctdHJvdWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFDdEMscUJBQXFCO0FBQ3JCLDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTztJQUNqQyxNQUFNLE1BQU0sR0FBVyxTQUFTLENBQUM7SUFDakMsTUFBTSxnQkFBZ0IsR0FBVyxNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RSxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2IsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLGlGQUFpRjtRQUNqRixJQUFJLGFBQWEsR0FBVyxNQUFNLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMifQ==