function kFormatter (num) {
    return Math.abs(num) > 999 ? Math.sign(num)*(Math.round(Math.abs(num)/100)/10) + 'k' : Math.sign(num)*Math.abs(num)
}

export default kFormatter;