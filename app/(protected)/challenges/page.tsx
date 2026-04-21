"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/hooks/userSession";
import { useApi } from "@/hooks/useApi";

import { ctf, geoint } from "@/lib/types";

import CtfBuilder from "@/components/challenges/ctf/CtfBuilder";
import GeointBuilder from "@/components/challenges/geoint/GeointBuilder";

import HomeTabs from "@/components/challenges/home/HomeTabs";
import CreateButtons from "@/components/challenges/home/CreateButtons";
import GeointGroups from "@/components/challenges/home/GeointGroups";
import ChallengeCard from "@/components/challenges/home/ChallengeCard";

export default function Home() {
    const { userSession } = useSession();
    const { call } = useApi();
    const router = useRouter();

    const [tab, setTab] = useState<0 | 1>(0);
    const [ctf, setCtf] = useState<ctf[]>([]);
    const [geoint, setGeoint] = useState<geoint[]>([]);
    const [openGeo, setOpenGeo] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await call(`/api/challenges?type=${tab === 0 ? "ctf" : "geoint"}`);
            tab === 0 ? setCtf(data || []) : setGeoint(data || []);
        })();
    }, [tab]);

    const open = (type: string, id: number) => router.push(`/challenges/${type}/${id}`);

    const groupedGeoint = useMemo(() => {
        const f = (l: string) => geoint.filter(e => e.difficulty === l);
        return {
            Facile: f("Facile"),
            Intermédiaire: f("Intermédiaire"),
            Avancé: f("Avancé"),
            Expert: f("Expert"),
        };
    }, [geoint]);

    return (
        <div className="min-h-screen text-white">

            <HomeTabs tab={tab} setTab={setTab} />

            {tab === 0 && (
                <div className="px-6 space-y-6">
                    <CreateButtons
                        type="ctf"
                        role={userSession?.role}
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {ctf.map(c => (
                            <ChallengeCard key={c.id} title={c.title} onClick={() => open("ctf", c.id)} />
                        ))}
                    </div>
                </div>
            )}

            {tab === 1 && (
                <div className="px-6 space-y-10">
                    <CreateButtons
                        type="geoint"
                        role={userSession?.role}
                        onGeoOpen={() => setOpenGeo(true)}
                    />
                    <GeointGroups data={groupedGeoint} open={open} />
                </div>
            )}

            <CtfBuilder />
            {openGeo && <GeointBuilder onClose={() => setOpenGeo(false)} />}
        </div>
    );
}