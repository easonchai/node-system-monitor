function RED(string) {
    return '\033[0;31m' + string + '\033[0m';
}

function GREEN(string) {
    return '\033[0;32m' + string + '\033[0m';
}

function BLUE(string) {
    return '\033[0;34m' + string + '\033[0m';
}

function CYAN(string) {
    return '\033[0;36m' + string + '\033[0m';
}

function YELLOW(string) {
    return '\033[1;33m' + string + '\033[0m';
}

function LIGHT_RED(string) {
    return '\033[1;31m' + string + '\033[0m';
}

module.exports = {
    RED,
    GREEN,
    BLUE,
    CYAN,
    YELLOW,
    LIGHT_RED
}
