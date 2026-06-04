function ProfileCard({ user }) {

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 flex flex-col md:flex-row gap-8">
            <img
                className="w-32 h-32 rounded-full border-2 border-slate-200"
                src={user.avatarUrl}
                alt={user.name}
            />

            <div className="flex-1 ">

                <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>

                <p className="text-slate-500">@{user.login}</p>

                <p className="mt-4 text-slate-700">{user.bio}</p>

            </div>

            <div className="grid grid-cols-3 gap-4 bg-slate-100 rounded-lg p-4 ">

                <div className="bg-white p-3 rounded-lg text-center">
                    <div className="font-bold text-xl">
                        {user.followers}
                    </div>
                    <div className="text-sm text-slate-500">
                        Followers
                    </div>
                </div>

                <div className="bg-white p-3 rounded-lg text-center">
                    <div className="font-bold text-xl">
                        {user.following}
                    </div>
                    <div className="text-sm text-slate-500">
                        Following
                    </div>
                </div>

                <div className="bg-white p-3 rounded-lg text-center">
                    <div className="font-bold text-xl">
                        {user.publicRepos}
                    </div>
                    <div className="text-sm text-slate-500">
                        Repos
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ProfileCard;