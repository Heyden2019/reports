import * as d3 from "d3";
import getGoodUsername from "./getGoodUsername";

export default function widgetPainter(usersData, svgSettings, commentsPerUserMax, svgWidth, totalComments) {

    const container = d3.select("#reports");

    document.getElementById("total_comments").innerText = totalComments;

    const selection = container.attr("height", usersData.length * svgSettings.rowHeightWithMarginBottom)
        .selectAll(".bar").data(usersData);

    const user_info = selection.enter().append("g").attr("class", "bar");

    user_info.append("image")
        .attr("height", svgSettings.rowHeightWithoutMarginBottom)
        .attr("width", svgSettings.rowHeightWithoutMarginBottom)
        .attr("y", (d, i) => i * svgSettings.rowHeightWithMarginBottom)
        .attr("href", d => d.avatarUrl);

    user_info.append("circle")
        .attr("r", svgSettings.rowHeightWithMarginBottom / 2)
        .attr("stroke-width", svgSettings.circleWidth)
        .attr("stroke", "white")
        .attr("cy", (d, i) => i * svgSettings.rowHeightWithMarginBottom + svgSettings.rowHeightWithoutMarginBottom / 2)
        .attr("cx", svgSettings.rowHeightWithoutMarginBottom / 2)
        .attr("fill", "transparent");

    user_info.append("a")
        .attr("href", d => d.userURL)
        .classed("name", true)
        .append("text")
        .attr("y", (d, i) => (i + 0.5) * svgSettings.rowHeightWithMarginBottom + svgSettings.usernameBaseLineCorrection)
        .attr("x", svgSettings.rowHeightWithMarginBottom)
        .attr("class", "username")
        .text(d => getGoodUsername(d.displayName, svgWidth * (1 - svgSettings.rectWidth) - svgSettings.rowHeightWithMarginBottom));

    user_info.append("rect")
        .attr("height", svgSettings.rowHeightWithoutMarginBottom)
        .attr("y", (d, i) => i * svgSettings.rowHeightWithMarginBottom + (svgSettings.rowHeightWithMarginBottom - svgSettings.rowHeightWithoutMarginBottom) / 2)
        .attr("x", svgWidth * (1 - svgSettings.rectWidth))
        .attr("width", d => d.userComments / commentsPerUserMax * svgWidth * svgSettings.rectWidth)
        .style("fill", svgSettings.rectColor)
        .attr("data_tooltip", d => d.userComments)
        .on("mousemove", function(d) {
            d3.select("#tooltip")
                .html(d.userComments)
                .style("top", d => event.pageY + svgSettings.tooltipPosition.y + "px")
                .style("left", d => event.pageX + svgSettings.tooltipPosition.x + "px")
                .style("display", "block")
        }).on("mouseout", function(d) {
        d3.select("#tooltip")
            .style("top", 0)
            .style("left", 0)
            .style("display", "none")
    });

    container.exit().remove();
}