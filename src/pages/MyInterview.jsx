import React, {
    useEffect,
    useState
} from "react";

import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";

export default function MyInterviews() {

    const [interviews, setInterviews] =
        useState([]);

    // logged in user
    const user =
        JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchInterviews =
            async () => {

                try {

                    const response =
                        await Axios({

                            ...summaryApi.getMyInterviews,

                            url:
                                summaryApi.getMyInterviews.url.replace(
                                    ":userId",
                                    user._id
                                ),
                        });

                    if (response.data.success) {
                        setInterviews(
                            response.data.data
                        );
                    }

                } catch (error) {
                    console.log(error);
                }
            };

        fetchInterviews();

    }, []);

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                My Interviews
            </h1>

            <div className="bg-white shadow rounded overflow-hidden">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">
                                Job Title
                            </th>

                            <th className="p-3 text-left">
                                Location
                            </th>

                            <th className="p-3 text-left">
                                Date
                            </th>

                            <th className="p-3 text-left">
                                Time
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {interviews.map((item) => (

                            <tr
                                key={item._id}
                                className="border-t"
                            >

                                <td className="p-3">
                                    {item.jobId?.title}
                                </td>

                                <td className="p-3">
                                    {item.jobId?.location}
                                </td>

                                <td className="p-3">
                                    {new Date(
                                        item.interviewDate
                                    ).toLocaleDateString()}
                                </td>

                                <td className="p-3">
                                    {item.interviewTime}
                                </td>

                                <td className="p-3">

                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">

                                        {item.status}

                                    </span>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}