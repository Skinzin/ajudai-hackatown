

export function CircleLoading() {
    return (
        <div className="flex justify-center items-center">
            <svg
                className="h-5 w-5"
                viewBox="0 0 40 40"
                height="40"
                width="40"
            >
                <circle 
                    className="fill-none opacity-0 transition-all ease-in duration-500"
                    cx="20" 
                    cy="20" 
                    r="17.5" 
                    pathLength="100" 
                    strokeWidth="5" 
                    fill="none" 
                />
                <circle 
                    className="car stroke-zinc-400"
                    cx="20" 
                    cy="20" 
                    r="17.5" 
                    pathLength="100" 
                    strokeWidth="5" 
                    strokeDasharray="1 200"
                    strokeDashoffset={0}
                    strokeLinecap="round"
                    fill="none" 
                />
            </svg>
        </div>
    );
}