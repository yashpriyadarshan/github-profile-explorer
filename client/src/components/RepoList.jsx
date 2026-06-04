import RepoCard from "./RepoCard";

function RepoList({ repos }) {

    if (!repos.length) {

        return (
            <div
                className="bg-white rounded-xl p-6 mt-6 text-center"
            >
                No repositories found
            </div>
        )
    }

    return (

        <div
            className="bg-white rounded-2xl shadow-lg p-6 mt-6 flex flex-col gap-6"
        >
            {repos.map(repo => (

                <RepoCard key={repo.id} repo={repo} />

            ))}
        </div>

    );
}

export default RepoList;