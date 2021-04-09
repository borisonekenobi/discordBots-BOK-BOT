function consoleCrash(E = 'Unknown error') {
    throw E;
}

function help() {
    console.log('crash [E]');
    console.log('    Will throw an error E. If E is not given, \'No error provided\' will be thrown');
}

module.exports = {consoleCrash, help}