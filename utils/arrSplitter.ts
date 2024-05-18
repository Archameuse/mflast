export default function (max:number, array:HTMLInputElement[]):HTMLInputElement[][] {
    let newArr:HTMLInputElement[][] = []
    let limit:number = Math.ceil(array.length/max)
    for (let i = 0; i < limit; i++) {
        let tosplice:HTMLInputElement[] = array.splice(0, max)
        newArr.push(tosplice)
    }
    return newArr
}