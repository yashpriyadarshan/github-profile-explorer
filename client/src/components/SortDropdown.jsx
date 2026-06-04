function SortDropdown({ sort, setSort }) {

    return (
        <div className="relative inline-block w-48 mt-4 mb-4">
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-white border border-white text-slate-700 py-2.5 px-4 pr-10 rounded-lg shadow-sm cursor-pointer transition-all duration-200 font-medium text-sm outline-none"
            >
                <option value="updated">Last Updated</option>
                <option value="stars">Stars</option>
                <option value="name">Name</option>
            </select>
        </div>
    );
}

export default SortDropdown;