export default function ArrFiller<Type>(array:any[] | undefined, max:number):(Type|undefined)[] {
    if(!array) return [...Array(max)]
    let newArr = [...array]
    const test = Math.ceil(newArr.length/max)*max
    for (let i=0; newArr.length < test; i++) {
        newArr.push(undefined)
    }
    return newArr
}