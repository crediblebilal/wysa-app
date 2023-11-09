import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBeer } from 'react-icons/fa';
import { AiOutlineArrowDown } from 'react-icons/ai';



export default function SecondPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const data = localStorage.getItem("wysaUser");
        if (data) {
            setUser(JSON.parse(data));
        } else {
            navigate("/login");
        }
    }, []);

    const [options, setOptions] = useState({
        fallAsleep: false,
        sleepThroughNight: false,
        wakeUpRefreshed: false,
    });


    const selectedOptions = Object.keys(options).filter((key: any) => options[key]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {


            if (selectedOptions.length === 0) {
                toast.error("Please select at least one option");
                return;
            }

            await fetch("http://localhost:4100/addsleepchanges", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    changes: selectedOptions,
                    id: user.id,
                }),
            });

            navigate(`/q3`);
        } catch (err: any) {
            toast.error(err.message);
        }
    }


    function handleOptionChange(e: any) {
        const { name, checked } = e.target;
        setOptions((prevState) => ({ ...prevState, [name]: checked }));
    }
    return (
        <div className="animate-fade-in flex justify-center items-center h-screen bg-[#111633]">
            <div className="p-8  rounded-lg shadow-xl">
                <h2 className="text-white font-semibold mb-4 text-2xl">
                    Let's say in a few weeks, you're sleeping well. What would change?
                </h2>
                <p className="text-white font-semibold mb-4">
                    Select all the changes you would like to see
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="fallAsleep"
                            checked={options.fallAsleep}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would go to sleep easily</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="sleepThroughNight"
                            checked={options.sleepThroughNight}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would sleep through the night</span>
                    </label>
                    <label className="block text-white my-3 rounded-xl p-4 bg-[#386fa6]">
                        <input
                            type="checkbox"
                            name="wakeUpRefreshed"
                            checked={options.wakeUpRefreshed}
                            onChange={handleOptionChange}
                        />
                        <span className="ml-2">I would wake up on time, refreshed</span>
                    </label>
                    <button
                        type="submit"
                        className="btn-down w-min mx-auto text-center align-middle"
                    >
                        <AiOutlineArrowDown />
                    </button>
                </form>
            </div>
        </div>
    )
}