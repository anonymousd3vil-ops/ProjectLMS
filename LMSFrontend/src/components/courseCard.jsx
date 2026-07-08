import { useNavigate } from "react-router-dom";

import { GoNumber } from "react-icons/go";
import { FiArrowRight, FiGrid, FiUser, FiStar } from "react-icons/fi";
import { MdWorkspacePremium } from "react-icons/md";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", {state: {...data}})}
      className=" group relative w-92.5 overflow-hidden rounded-[28px] border border-zinc-600 bg-linear-to-br from-[#1b1d22] via-[#17191f] to-[#111318] transition-all duration-500  hover:border-yellow-400 hover:shadow-[15px_15px_55px_rgba(250,204,21,0.35)] cursor-pointer  m-3"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
          className="h-50 w-full object-cover transition-all duration-700 group-hover:brightness-110 "
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Premium Badge */}
        <div className=" absolute top-5 left-5 flex items-center gap-2 rounded-full border border-yellow-400 bg-[#1b1d22]/90 px-4 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-md shadow-[0_0_15px_rgba(250,204,21,0.4)]">
          <MdWorkspacePremium size={24}/>
        </div>
      </div>

      {/* Body */}
      <div className="relative p-3">

        {/* Title */}
        <h2 className=" text-4xl font-bold leading-tight text-yellow-400 line-clamp-1">
          {data?.title}
        </h2>

        {/* Arrow */}
        <div className=" absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-400 text-2xl shadow-[0_0_18px_rgba(250,204,21,0.45)] transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black group-hover:translate-x-1">
          <FiArrowRight />
        </div>

        {/* Description */}
        <p className=" my-2 text-lg text-zinc-300 line-clamp-3">
          {data?.description}
        </p>

        {/* Divider */}
        <div className=" border-t border-zinc-700"></div>

        {/* Category */}
        <div className="flex items-center justify-between border-b border-dashed border-zinc-700 py-1">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3 text-yellow-400">
              <FiGrid size={22} />
            </div>

            <span className="text-lg text-zinc-200">Category</span>
          </div>

          <span className="font-semibold text-yellow-400">
            {data?.category}
          </span>
        </div>

        {/* Lectures */}
        <div className="flex items-center justify-between border-b border-dashed border-zinc-700 py-1">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3 text-yellow-400">
              <GoNumber size={22} />
            </div>

            <span className="text-lg text-zinc-200">Number of Lectures</span>
          </div>

          <span className="font-semibold text-yellow-400">
            {data?.numberOfLectures}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3 text-yellow-400">
              <FiUser size={22} />
            </div>

            <span className="text-lg text-zinc-200">Instructor</span>
          </div>

          <span className="font-semibold text-yellow-400">
            {data?.createdBy}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
