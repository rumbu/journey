/**
 * Journey to the Moon
 * The member states of the UN are planning to send 2 people to the Moon. But there 
 * is a problem. In line with their principles of global unity, they want to pair 
 * astronauts of 2 different countries.
 * 
 * There are  trained astronauts numbered from 0 to N - 1. But those in charge of 
 * the mission did not receive information about the citizenship of each astronaut. 
 * The only information they have is that some particular pairs of astronauts belong 
 * to the same country.
 * 
 * Your task is to compute in how many ways they can pick a pair of astronauts 
 * belonging to different countries. Assume that you are provided enough pairs to let
 * you identify the groups of astronauts even though you might not know their country 
 * directly. For instance, if 1, 2, 3 are astronauts from the same country; it is 
 * sufficient  to mention that (1,2) and (2, 3) are pairs of astronauts from the same 
 * country without providing information about a third pair (1, 3).
 * 
 * 
 * Input Format
 * The first line contains two integers, N and P, separated by a single space. P lines 
 * follow. Each line contains 2 integers separated by a single space A and B such that
 * 0 <= A, B <= N-1 and A and B are astronauts from the same country.
 * 
 * Constraints
 * <ul>
 * <li>1 <= N <= 10^5</li>
 * <li>1 <= P <= 10^4</li>
 * </ul>
 * 
 * Output
 * An integer that denotes the number of permissible ways to choose a pair of astronauts.
 * 
 * Sample Input 0
 * 5 3
 * 0 1
 * 2 3
 * 0 4
 * 
 * Sample Output 0
 * 6
 * 
 * Sample Input 1
 * 4 1
 * 0 2
 * 
 * Sample Output 1
 * 5
 */
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function journeyToMoon(n, astronaut) {
    var AA = new Array(n);
    var CC = [], CID;
    for(var i = 0, len = astronaut.length; i < len; i++) {
        var a1 = astronaut[i][0];
        var a2 = astronaut[i][1];
        CID = (0 === AA[a1] || 0 === AA[a2]) ? 0 : (AA[a1] || AA[a2] || CC.length);
        CC[CID] = ~~CC[CID] + (CC[CID] ? 1 : 2);
        AA[a1] = CID;
        AA[a2] = CID;
    }

    // https://en.wikipedia.org/wiki/Binomial_coefficient#Multiplicative_formula
    // n!/2*(n - 2)! - n0!/2(n0 - 2)! - n1!/2(n1 - 2)! - ...
    // ~=
    // (n*(n-1) - n0*(n0-1) - n1*(n1-1) - ...)/2
    function P_Nby2(n) {
        return n * (n - 1) / 2;
    }

    return CC.reduce(function(c, count) {
        return c - P_Nby2(count);
    }, P_Nby2(n));
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var p = parseInt(n_temp[1]);
    var astronaut = [];
    for(astronaut_i = 0; astronaut_i < p; astronaut_i++){
       astronaut[astronaut_i] = readLine().split(' ');
       astronaut[astronaut_i] = astronaut[astronaut_i].map(Number);
    }
    var result = journeyToMoon(n, astronaut);
    process.stdout.write("" + result + "\n");

}

