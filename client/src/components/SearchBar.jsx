function SearchBar({ onSearch, searchInput, setSearchInput }) {

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!searchInput.trim()) return;

        onSearch(searchInput);
    };

    return (
        <form
            className="w-full max-w-lg mx-auto bg-white flex items-center justify-between rounded-lg shadow-sm border border-white h-12 p-1 pl-4 text-slate-600 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all duration-200 my-4"
            onSubmit={handleSubmit}
        >
            <input
                className="w-full bg-transparent outline-none pr-3 text-slate-700 placeholder-slate-400"
                type="text"
                placeholder="Enter GitHub Username"
                value={searchInput}
                onChange={(e) =>
                    setSearchInput(e.target.value)
                }
            />

            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-5 h-full rounded-md font-medium transition-colors cursor-pointer shrink-0">
                Search
            </button>
        </form>
    )
}

export default SearchBar;