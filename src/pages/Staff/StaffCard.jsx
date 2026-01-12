import React, { useEffect, useState } from 'react';
import Loading from '../Loading';

const StaffCard = ({ singleStaff }) => {
    const [discordData, setDiscordData] = useState(null);
    const { id, role, description } = singleStaff;

    useEffect(() => {
        const fetchData = () => {
            // local host api link
            fetch(`https://51.68.234.157:20206/api/status/${id}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success) setDiscordData(res.data);
                })
                .catch(err => console.error("Discord Fetch Error:", err));
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [id]);

    if (!discordData) return (
        <div className="card w-full bg-[#1a1c2e] shadow-xl animate-pulse h-96 border border-gray-700">
            <Loading />
        </div>
    );

    const { username, status, activities, avatar, displayName } = discordData;


    const getStatusText = () => {
        if (!activities || activities.length === 0) return "Chilling 💤";

        const customStatus = activities.find(act => act.type === 4 || act.name === "Custom Status");

        if (customStatus && customStatus.state) {
            return customStatus.state;
        }

        const normalActivity = activities.find(act => act.name !== "Custom Status");

        return normalActivity ? normalActivity.name : "Chilling 💤";
    };

    const statusClass = {
        online: "badge-success",
        idle: "badge-warning",
        dnd: "badge-error",
        offline: "badge-ghost"
    };

    const statusColor = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-gray-500"
    };

    return (
        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105
                    transition-all duration-300">

            {/* Original Card */}
            <div className="card p-4 w-full bg-[#1a1c2e] text-white shadow-2xl
                        rounded-2xl transform  transition-all duration-300">

                <figure className="px-10 py-10 relative">
                    <div className="avatar">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-[#1a1c2e] p-[2px]">
                                <img
                                    className="rounded-full w-full h-full object-cover"
                                    src={avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
                                    alt={username}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`absolute top-12 right-1/3 w-5 h-5 rounded-full border-4 border-[#1a1c2e] ${statusColor[status]}`}
                    ></div>
                </figure>

                <div className="card-body p-0 items-center text-center">
                    <h2 className="card-title text-2xl font-bold">
                        {displayName || username}
                    </h2>

                    <p className="text-gray-400 text-sm mt-[-10px]">
                        @{username}
                    </p>

                    <div className="badge badge-primary badge-outline font-bold mt-2 px-4 py-3">
                        {role}
                    </div>

                    <p className="text-sm text-gray-300 my-2">
                        {description}
                    </p>

                    <div className="card-actions justify-center mt-4 w-full border-t border-gray-700 pt-4">
                        <div className={`badge ${statusClass[status]} gap-2 p-3 font-semibold capitalize`}>
                            {status}
                        </div>

                        <div className="badge badge-outline p-3 opacity-70">
                            {getStatusText()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCard;