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

// journeyToMoon(5, [[5, 3], [0, 1], [2, 3], [0, 4]])
// 6
function journeyToMoon(n, astronaut) {
    var countries = prepareCountries(astronaut);
    return countries;
    var result = 0;
    for(var i = 0, count = countries.length; i < count; i++) {
        for(var j = i + 1; j < count; j++) {
            result += combineCountries(countries[i].length, countries[j].length);
        }
    }
    return result;

    function prepareCountries(pairs) {
        var countries = [];
        pairs.forEach(function(pair) {
            inc(pair[0], pair[1]);
        });
        return countries;

        function inc(a1, a2) {
            var idx1 = find(a1);
            var idx2 = find(a2);
            if (-1 !== idx1 && -1 !== idx2) {
                countries[Math.max(idx1, idx2)].push(astronaut);
            } else {
                countries.push([astronaut]);
            }
        }

        function find(ast) {
            return countries.reduce(function(c, country) {
                var idx = country.indexOf(ast);
                if (idx > -1) c = idx;
                return c;
            }, -1);
        }
    }

    function combineCountries(n1, n2) {
        var nFirst = Math.max(n1, n2),
        nLast = Math.min(n1, n2);
        return fact(nFirst) / fact(nLast) / fact(nFirst - nLast);
    }

    function binomial(n, k) {
        return fact(n) / (fact(k) * fact(n - k));
    }

    function factStirling(x) {
        return Math.sqrt(2 * Math.PI * x) * Math.pow(x / Math.E, x);
    }

    function fact(x) {
        return 0 === x ? 1 : x * fact(x-1);
    }

}

// https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
function sqrt(n, precision) {
    var len = n.toString().length;
    var a = n.toString().substr(0, len % 2 ? 1 : 2);
    var x = bigInt(a < 10 ? 2 : 6).multiply(bigInt[10].pow((len % 2 ? len - 1 : len) / 2));
    for(var i = 0, count = precision || n.toString().length + 2; i < count; i++) {
        x = (n.divide(x).add(x)).divide(2);
    }
    return x;
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

