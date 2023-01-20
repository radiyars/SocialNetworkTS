
// вспоомгателньая функция которая помогает имьютабелньо изменить в массиве какой-то объект
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {

	return items.map(u => {
		if (u[objPropName] === itemId) {
			return { ...u, ...newObjProps }
		}
		return u;
	})
}