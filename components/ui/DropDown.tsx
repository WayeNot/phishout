import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";

type Option = {
    name: string;
    color?: string;
};

type DropDownProps = {
    label: string;
    value: string | string[];
    isOpen: boolean;
    options: Option[];
    onToggle: () => void;
    onSelect: (value: string) => void;
};

export default function DropDown({
    label,
    value,
    isOpen,
    options,
    onToggle,
    onSelect
}: DropDownProps) {

    const selected = Array.isArray(value) ? value : [];
    const selectedSet = new Set(selected);
    const count = selectedSet.size;

    return (
        <div className="w-1/2 relative">

            <button
                onClick={onToggle}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition duration-300 cursor-pointer
                ${count ? "border-green-500/30 text-white" : "border-white/10 text-white/60"}
                hover:border-white/30 hover:text-white bg-[#1b1b2a]`}
            >

                <span className="flex items-center gap-2">
                    {label}
                    {count > 0 && (
                        <span className="text-[10px] px-2 py-[2px] rounded-full bg-green-500/10 text-green-300">
                            {count}
                        </span>
                    )}
                </span>

                {isOpen
                    ? <IoIosArrowDropupCircle className="text-[16px]" />
                    : <IoIosArrowDropdownCircle className="text-[16px]" />
                }

            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-full bg-[#151522] border border-white/10 rounded-xl p-2 flex flex-wrap gap-2 z-50 shadow-2xl max-h-52 overflow-y-auto">

                    {options.map((el) => {

                        const isActive = selectedSet.has(el.name);

                        return (
                            <button
                                key={el.name}
                                onClick={() => onSelect(el.name)}
                                className={`px-2 py-1 rounded-lg text-xs border transition duration-300 cursor-pointer
                                ${isActive
                                        ? "bg-green-500/10 text-green-300 border-green-500/30"
                                        : "bg-[#232336] text-white/50 border-transparent hover:bg-[#2e2e44] hover:text-white"
                                    }`}
                            >
                                {el.name}
                            </button>
                        );
                    })}

                </div>
            )}

        </div>
    );
}