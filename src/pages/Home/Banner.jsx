import { Link } from "react-router-dom";

const Banner = () => {
    return (
      <div
        className="hero place-items-start px-4 py-20  max-w-[1366px] mx-auto justify-center  flex  w-full h-screen relative"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/9V6rKwZ/blood-donation-rkto-1-scaled-e1613380226989.jpg)",
        }}
      >
        <img
          className="absolute h-[250px] w-full object-cover bottom-0 z-30 ob"
          src="https://i.ibb.co/85VkkCP/svg-1.png"
          alt=""
        />
        <div className="bg-gradient-to-r from-black/20 to-transparent absolute inset-0"></div>
        <div className="  ">
          <div className="relative z-20 md:w-2/3 space-y-4 md:space-y-10">
            <h1 className=" text-3xl md:text-5xl text-white font-bold drop-shadow-lg">
              Transforming Lives with Blood Donation
            </h1>
            <p className=" font-semibold text-md md:text-2xl text-white leading-[150%]">
              BloodUnity is a real-time free platform to help blood searchers
              connect voluntary blood donors around Bangladesh.
            </p>
            <div className="flex  items-center gap-4 md:gap-8">
              <Link to="/register">
                <button className=" px-3 py-2 md:px-8 md:py-3 bg-[#EB2C29] rounded-md text-white font-semibold">
                  Join as a Donor
                </button>
              </Link>
              <Link to="/search">
                <button className=" px-3 py-2 md:px-8 md:py-3 bg-white rounded-md text-[#EB2C29] font-semibold">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;