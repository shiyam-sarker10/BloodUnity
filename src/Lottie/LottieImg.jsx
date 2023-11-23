import Lottie from "lottie-react";
import donation from '../../public/donor.json'

export const Donor = () => {
    return <Lottie animationData={donation} loop={true} />;
}