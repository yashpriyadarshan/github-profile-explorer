import { useState } from "react";

function RepoCard({ repo }) {

    const [expanded, setExpanded] = useState(false);

    return (

        <div
            className="bg-slate-100 rounded-lg p-4 flex flex-col md:flex-row cursor-pointer hover:bg-slate-200"
            onClick={() => setExpanded(!expanded)}
        >

            <div className="flex-1">

                <h3 className="text-lg font-bold mb-2"> {repo.name} </h3>

                <div className="flex gap-6 text-slate-600 mb-2">

                    <p>{repo.language || "Not specified"} </p>

                    <p> Updated: {new Date(repo.updatedAt).toLocaleDateString()} </p>
                </div>

                <p className="text-slate-700">
                    {repo.description ? (expanded ? repo.description : `${repo.description?.slice(0, 100)} ...`) : ""}
                </p>

                <div
                    className={`grid transition-all duration-300 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                >
                    <div className="overflow-hidden">
                        <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex flex-col gap-2">

                            <p className="text-sm text-slate-600"> Open Issues: <span className="font-semibold text-slate-900">{repo.openIssues}</span> </p>

                            <p className="text-sm text-slate-600"> Default Branch: <span className="font-semibold text-slate-900">{repo.defaultBranch}</span> </p>

                            <a
                                href={repo.htmlUrl}
                                target="_blank"
                                className="text-sm text-blue-600 hover:underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                            >
                                View Repository →
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="text-right flex flex-col justify-between pl-4">
                <p className="mt-4 sm:mt-0"> ⭐ {repo.stars} Stars</p>

                <p> {expanded ? "▲ Hide Details" : "▼ Show Details"} </p>
            </div>

        </div>
    );
}

export default RepoCard;