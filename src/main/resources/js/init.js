import getCurrentData from "./getCurrentData";
import widgetPainter from "./widgetPainter";
import getSettings from "./getSettings";
import nav from 'bitbucket/util/navbuilder';

AJS.toInit(async function () {

    const url = nav.rest("api", "1.0").project(AJS.params.projectKey).repo(AJS.params.repositorySlug).pullRequest(AJS.params.pullRequestId).addPathComponents("activities").build();
    const [usersData, totalComments, commentsPerUserMax] = await getCurrentData(url);
    const [svgSettings, svgWidth] = getSettings(usersData);

    widgetPainter(usersData, svgSettings, commentsPerUserMax, svgWidth, totalComments);
});

