// scp/drain.js by qxxst
/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const minSecurityLevel = ns.getServerMinSecurityLevel(target);
    const maxMoney = ns.getServerMaxMoney(target);
    const moneyThreshold = maxMoney * 0.01;
    while (true) {
        var securityLevel = ns.getServerSecurityLevel(target);
        var moneyAvailable = ns.getServerMoneyAvailable(target);
        if (securityLevel > minSecurityLevel) {
            await ns.weaken(target);
        }
        else if (moneyThreshold > moneyAvailable) {
            await ns.grow(target);
        }
        else {
            await ns.hack(target);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaG9tZS9zY3AvZHJhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFPO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sY0FBYyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFdkMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNiLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkQsSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsQ0FBQzthQUFNLElBQUksY0FBYyxHQUFHLGNBQWMsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNQLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMifQ==