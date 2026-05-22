import { Bookmark, Briefcase, MapPin } from "lucide-react";

const JobCard = ({ job, onSave, onApply }) => {
    const formatDate = (date) => {
        const now = new Date();
        const posted = new Date(date);
        const diff = Math.floor((now - posted) / (1000 * 60 * 60));

        if (diff < 1) return "Just now";
        if (diff < 24) return `${diff}h ago`;

        return posted.toLocaleDateString();
    };

    return (
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">

            {/* Top Section */}
            <div className="flex justify-between items-start">

                {/* Job Info */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {job.title}
                    </h2>
                </div>

                {/* Save Button */}
                <button
                    onClick={() => onSave?.(job._id)}
                    className="text-gray-400 hover:text-blue-600 transition"
                >
                    <Bookmark size={20} />
                </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                    <MapPin size={16} /> {job.location}
                </span>

                <span className="flex items-center gap-1">
                    <Briefcase size={16} /> {job.type}
                </span>

            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {job.description}
            </p>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-5">

                {/* Posted Date */}
                <span className="text-xs text-gray-400">
                    Posted {formatDate(job.postedAt)}
                </span>

                {/* Apply Button */}
                <button
                    onClick={onApply}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}

export default JobCard