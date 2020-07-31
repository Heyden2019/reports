import getOptionalRectWidth from "./getOptionalRectWidth";

export default function getSettings (usersData) {

    const svgSettings = {
        rowHeightWithoutMarginBottom: 24,
        rowHeightWithMarginBottom: 30,
        rectColor: '#4C9AFF',
        circleWidth: 6,
        rectWidth: 0.7,
        usernameBaseLineCorrection: 4,
        tooltipPosition: {
            x: 5,
            y: -20
        }
    };
    const svgWidth = document.getElementById("reports").clientWidth;
    svgSettings.rectWidth = getOptionalRectWidth(svgWidth, svgSettings, usersData);
    return [svgSettings, svgWidth];
}