import { useState, useEffect } from "react"

import SearchBar from "../components/SearchBar"

import { getGithubUser } from "../api/githubApi"

import ProfileCard from "../components/ProfileCard";

import RepoList from "../components/RepoList";

import SortDropdown from "../components/SortDropdown";

import Pagination from "../components/Pagination";

import ErrorMessage from "../components/ErrorMessage";

import LoadingSpinner from "../components/LoadingSpinner";

import LanguageChart from "../components/LanguageChart";

function Home() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("")

    const [sort, setSort] = useState("updated");

    const [username, setUsername] = useState("");

    const [page, setPage] = useState(1);

    const [recentSearches, setRecentSearches] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {

        const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

        setRecentSearches(storedSearches);

    }, []);

    useEffect(() => {
        if (!username) return;

        const fetchUserData = async () => {
            try {
                setLoading(true);

                setError("");

                const response = await getGithubUser(
                    username,
                    sort,
                    page,
                    10
                );

                setData(response);
            } catch (err) {

                setError(
                    err.response?.data?.message || "Something went wrong"
                );

                setData(null);
            } finally {

                setLoading(false);
            }
        };

        fetchUserData();

    }, [username, sort, page]);

    useEffect(() => {

        if (!searchInput.trim() || searchInput === username) return;

        const timer = setTimeout(() => {
            searchUser(searchInput);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchInput])

    const searchUser = (usernameVal) => {

        setPage(1);

        setUsername(usernameVal);

        const updatedSearches = [
            usernameVal,
            ...recentSearches.filter(search => search !== usernameVal)
        ].slice(0, 5);

        setRecentSearches(updatedSearches);

        localStorage.setItem(
            "recentSearches",
            JSON.stringify(updatedSearches)
        );

    };

    return (

        <div className="min-h-screen bg-slate-100" >

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold text-center mb-8">
                    GitHub Profile Explorer
                </h1>

                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} onSearch={searchUser} />

                {loading && <LoadingSpinner />}

                {error && <ErrorMessage message={error} />}

                {recentSearches.length > 0 && (

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Recent Searches</h3>

                        <div className="flex flex-wrap gap-2">

                            {recentSearches.map(search => (

                                <button
                                    key={search}
                                    onClick={() => searchUser(search)}
                                    className="px-3 py-2 bg-white rounded-lg shadow hover:bg-slate-100 transition"
                                >
                                    {search}
                                </button>

                            ))}
                        </div>
                    </div>

                )}

                {data &&
                    <>
                        <SortDropdown sort={sort} setSort={setSort} />

                        <ProfileCard user={data.user} />

                        <LanguageChart repos={data.repos} />

                        <RepoList repos={data.repos} />

                        <Pagination
                            currentPage={
                                data.currentPage
                            }
                            totalPages={
                                data.totalPages
                            }
                            onPageChange={
                                setPage
                            }
                        />

                        <footer className="text-center mt-10 text-slate-500">Built with React, Express and GitHub API</footer>

                    </>
                }

            </div>

        </div>
    );
}

export default Home;