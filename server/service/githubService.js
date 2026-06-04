const axios = require("axios");

const cache = require("../cache/cache");

const {
    paginate
} = require("../utils/pagination");

const {
    sortRepos
} = require("../utils/repoSorter");

const CACHE_DURATION = 60 * 1000; // 60 seconds

const getGithubData = async (
    username,
    sort,
    page = 1,
    limit = 10
) => {

    const cacheKey = username.toLowerCase();

    const cachedData = cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {

        console.log("Returning from cache");

        const sortedRepos = sortRepos(
            cachedData.data.repos,
            sort
        );

        const paginatedRepos = paginate(
            sortedRepos,
            page,
            limit
        );

        return {
            user: cachedData.data.user,
            repos: paginatedRepos,
            totalRepos: sortedRepos.length,
            currentPage: page,
            totalPages: Math.ceil(
                sortedRepos.length / limit
            )
        };
    }

    console.log("Fetching from GitHub");

    const userResponse = await axios.get(
        `https://api.github.com/users/${cacheKey}`
    );

    const repoResponse = await axios.get(
        `https://api.github.com/users/${cacheKey}/repos`,
        {
            params: {
                page,
                per_page: limit * 10
            }
        }
    );

    const user = {
        login: userResponse.data.login,
        name: userResponse.data.name,
        avatarUrl: userResponse.data.avatar_url,
        bio: userResponse.data.bio,
        followers: userResponse.data.followers,
        following: userResponse.data.following,
        publicRepos: userResponse.data.public_repos
    };

    const repos = repoResponse.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
        openIssues: repo.open_issues_count,
        defaultBranch: repo.default_branch
    }));

    // Storing raw data in cache
    cache.set(cacheKey, {
        data: {
            user,
            repos
        },
        timestamp: Date.now()
    });

    const sortedRepos = sortRepos(
        repos,
        sort
    );

    const paginatedRepos = paginate(
        sortedRepos,
        page,
        limit
    );

    return {
        user,
        repos: paginatedRepos,
        totalRepos: sortedRepos.length,
        currentPage: page,
        totalPages: Math.ceil(
            sortedRepos.length / limit
        )
    };
};

module.exports = {
    getGithubData
};