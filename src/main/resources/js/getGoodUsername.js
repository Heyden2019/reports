import getTextWidth from "./getTextWidth"

export default function getGoodUsername (txt, maxLength) {
    if (getTextWidth(txt) <= maxLength) {
        return txt;
    } else {
        let newName = "";
        let i = 0;
        while (getTextWidth(newName) <= maxLength - 15) {
            newName += txt[i];
            i++;
        }
        return newName + "..";
    }
}

