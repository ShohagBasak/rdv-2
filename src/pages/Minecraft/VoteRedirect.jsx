import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useParams } from "react-router";
import Error from "../Error/Error";

import lottieBilai from "../../assets/lottie asstes/Cat playing animation.json";

const REDIRECT_TIME = 4;

const links = {
    "1": "https://minecraft-mp.com/server/353711/vote/",
    "2": "https://minecraft-serverlist.com/server/4231",
    "3": "https://topminecraftservers.org/vote/42692",
    // 4 & 5 intentionally missing → Error
};

const VoteRedirect = () => {
    const { voteId } = useParams();
    const id = voteId?.replace("vote", "");

    const timerRef = useRef(null);
    const intervalRef = useRef(null);

    const [countdown, setCountdown] = useState(REDIRECT_TIME);

    const isValidVote = Boolean(links[id]);


    useEffect(() => {
        if (voteId === "vote") {
            window.location.replace("/minecraft");
        }
    }, [voteId]);

    
    useEffect(() => {
        if (!isValidVote) return;

        intervalRef.current = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        timerRef.current = setTimeout(() => {
            window.location.replace(links[id]);
        }, REDIRECT_TIME * 1000);

        return () => {
            clearTimeout(timerRef.current);
            clearInterval(intervalRef.current);
        };
    }, [id, isValidVote]);

    const handleManualVote = () => {
        clearTimeout(timerRef.current);
        clearInterval(intervalRef.current);
        window.location.href = links[id];
    };

    
    if (!isValidVote) {
        return <Error />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <div className="w-5/12">
                <Lottie animationData={lottieBilai} loop />
            </div>

            <p className="text-white font-semibold text-center">
                You will be redirected automatically in{" "}
                <span className="text-yellow-400 font-extrabold">
                    {countdown}s
                </span>{" "}
                seconds.
                <br />
                If not, click the button below 👇
            </p>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleManualVote}
                className="btn rounded-full bg-blue-950 hover:bg-blue-800 text-white border-2 border-blue-700 font-extrabold capitalize"
            >
                Vote Now
            </motion.button>
        </div>
    );
};

export default VoteRedirect;
