import React from 'react'

interface IProps {
    inputOffset: number
    forkID: string | number
}

const RatingFork: React.FC<IProps> = ({ inputOffset, forkID }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`forkGradient-${forkID}`}>
                    <stop id="stop1" offset={inputOffset} stopColor="#BF9D8A" />
                    <stop id="stop2" offset={inputOffset} stopColor="#d7d7d9" />
                </linearGradient>
            </defs>
            <g fillRule="nonzero" fill="none">
                <rect fill={`url('#forkGradient-${forkID}')`} width="24" height="24" rx="2" />
                <path
                    d="M15 8h-2V2h-2v6H9V2H7v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C15.34 12.84 17 11.12 17 9V2h-2v6z"
                    fill="#FFF"
                />
            </g>
        </svg>
    )
}

export default RatingFork
