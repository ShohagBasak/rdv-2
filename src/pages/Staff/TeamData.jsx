import React from 'react';
import { useLoaderData } from 'react-router';
import TeamCard from './TeamCard';

const TeamData = () => {
    const data = useLoaderData();
    // console.log(data);
    return (
        <div className='w-11/12 mx-auto py-15 md:py-30'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4'>
                {
                    data
                        .slice()
                        .sort((a, b) => {
                            const cleanA = a.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                            const cleanB = b.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                            return cleanA.localeCompare(cleanB);
                        })
                        .map(teamData => (
                            <TeamCard
                                key={teamData.serialNo}
                                teamData={teamData}
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default TeamData;