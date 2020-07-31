let users = {};
let totalComments = 0;
let commentsPerUserMax = 0;
let usersData = [];

export default async function getCurrentData (url) {
    await getUsers(url);
    await getAvatars();
    return [usersData, totalComments, commentsPerUserMax];
}

async function getUsers (url, start = 0) {
    const response = await fetch(url + `?start=${start}`);
    const data = await response.json();
    data.values.map(value => {
        if ("comment" in value) {
            getComment(value.comment)
        }
        if ("comments" in value) {
            getSubComments(value.comments)
        }
    });
    if (!data.isLastPage) {
        await getUsers(url, data.nextPageStart)
    }
}

function getSubComments(comments) {
    comments.map(value => {
        getComment(value)
    })
}

function getComment(comment) {
    const id = `${comment.author.id}`;
    try {
        users[id].commentsPerUser += 1
    } catch {
        users[id] = {
            userUrl: comment.author.links.self[0].href,
            commentsPerUser: 1,
            name: comment.author.name,
            displayName: comment.author.displayName
        }
    }

    if ("comments" in comment) {
        getSubComments(comment.comments)
    }
}

async function getAvatars () {
    let arrAvatarUrls = [];
    for (let user in users) {
        arrAvatarUrls.push(`/rest/api/1.0/users/${users[user].name}?avatarSize=32`)
    }

    await Promise.allSettled(arrAvatarUrls.map(url => fetch(url)))
        .then(results =>  Promise.allSettled(results.map(result => result.value.json())))
        .then(results => {
            results.map((result) => {
                const user = users[`${result.value.id}`];
                usersData.push({
                    displayName: user.displayName,
                    userURL: user.userUrl,
                    userComments: user.commentsPerUser,
                    avatarUrl: result.value.avatarUrl
                });

                totalComments += user.commentsPerUser;

                if (user.commentsPerUser > commentsPerUserMax) {
                    commentsPerUserMax = user.commentsPerUser;
                }
            });
        });
}