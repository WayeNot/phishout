type ModalBoolProps = {
    title: string;
    label: string;
    btn1: string;
    btn2: string;
    onSelect: (value: string) => void;
};

export default function ModalBool({ title, label, btn1, btn2, onSelect }: ModalBoolProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center gap-15 bg-black/70 backdrop-blur-sm">
            <div className="w-3/8 h-3/4 bg-[#1e1e2f] border border-gray-700 rounded-2xl shadow-2xl p-6 animate-fadeIn">
                <div className="w-fit flex flex-col items-center gap-2">
                    <h2>{title}</h2>
                    <p>{label}</p>
                    <hr className="w-fit" />
                </div>
                <div className="flex items-center gap-3 w-full">
                    <button onClick={() => onSelect(btn1)} key={title}>{btn1}</button>
                    <button onClick={() => onSelect(btn2)} key={label}>{btn2}</button>
                </div>
            </div>
        </div>
    );
}