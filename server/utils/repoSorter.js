const sortRepos = (repos, sort = "updated") => {

    const sortedRepos = [...repos];

    if (sort === "stars") {

        sortedRepos.sort(
            (a, b) => b.stars - a.stars
        );

    } else if (sort === "name") {

        sortedRepos.sort(
            (a, b) => a.name.localeCompare(b.name)
        );

    } else {

        sortedRepos.sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        );

    }

    return sortedRepos;
};

module.exports = {
    sortRepos
};