function recurMul(x,y){
    
    if(x <=10 || y <= 10){
        return x * y
    }
    const mi = x > y ? `${x}`.length : `${y}`.length
    // 123 -> 1 * 100 + 23
    const m1  = mi % 2 === 0 ? mi /2 : (mi-1) / 2
    const m2 = mi - m1 // 1 * 100 中的100==> 2  m1 < m2
    const a = parseInt(x/Math.pow(10, m2))
    const b = x % Math.pow(10, m2)
    const c = parseInt(y / Math.pow(10, m2))
    const d = y % Math.pow(10, m2)
    const ac = recurMul(a, c)
    const bd = recurMul(b, d)
    const gauss = recurMul(a+b, c+d);
    return Math.pow(10, 2 * m2) * ac + Math.pow(10, m2) * (gauss - ac - bd) + bd
}
const s  = recurMul(3141592653589793238462643383279502884197169399375105820974944592,3141592653589793238462643383279502884197169399375105820974944592)
console.log(s, 123478912345678912345678 * 123478912345678912345678)