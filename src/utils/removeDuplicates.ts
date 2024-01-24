const removeDuplicates = (arr: any, prop: any) => {
    const seen = new Set();
    return arr.filter((item: any) => {
        const key = prop ? item[prop] : item;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}


export default removeDuplicates