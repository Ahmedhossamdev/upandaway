var cmt=0;
var ok = false;
function getBotResponse(input) {
    //Tours
    if (input == "What is the best tours?") {
        ok = true;
        return "Dahab&Siwaa";
    }
    if (input === "else" && ok &&cmt!=2) {
        cmt+=2;
        return "Pyramids";
    }
    if (input === "else" && ok&&cmt==2) {

        return "Fayoum";
    }

    // Simple responses
    if (input === "hello") {
        return "Hello there!";
    } 
    if (input === "goodbye") {
        return "Talk to you later!";
    } 
    else {
        return "Try asking something else";
    }
}
