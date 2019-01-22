/* Function that takes full name and returns name initials except a surname 
   example: Lee Child = L.Child 
    - split name in array
    - map each element except the last array element, slice first letter and add dot
    - join array and surname - last array element
*/

const shorten = (name) => {
    const splited = name.split(" ");

    const newArr = splited.slice(0, splited.length - 1).map(a => {
        return a.slice(0, 1) + ". "
    })

    return newArr.join(" ") + splited[splited.length - 1];
}

export default shorten;