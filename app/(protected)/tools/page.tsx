"use client";

export default function Home() {
    const tools = [
        { name: "Tools" },
        { name: "GEOINT" },
        { name: "SOCMINT" },
        { name: "OPSEC" },
    ]
    return (
        <div>
            {tools.map((v, k) => (
                <div key={k}>
                    <h2 className="text-white/70 text-xl text-[30px] mt-10 ml-20 font-mono font-bold">{v.name}</h2>
                    <hr className="mt-5 mx-20 text-white/70" />
                </div>
            ))}
        </div>
    );
}