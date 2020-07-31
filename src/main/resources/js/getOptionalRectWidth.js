import getTextWidth from "./getTextWidth";

export default function getOptionalRectWidth(svgWidth, svgSettings, usersData) {
    let widestUsernameWidth = 0;
    usersData.map(user => {
        let usernameWidth = getTextWidth(user.displayName);
        if (widestUsernameWidth < usernameWidth) {
            widestUsernameWidth = usernameWidth
        }
    });
    const newRectWidth = 1 - (widestUsernameWidth + svgSettings.rowHeightWithMarginBottom + 10)/svgWidth;
    return svgSettings.rectWidth < newRectWidth ? newRectWidth : svgSettings.rectWidth;
}