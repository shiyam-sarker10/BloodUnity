import Lottie from "lottie-react";
import donation from '../../public/donor.json'
import error from '../../public/404.json'

export const Donor = () => {
    return <Lottie animationData={donation} loop={true} />;
}
export const JsonError = () => {
    return <Lottie animationData={error} loop={true} />;
}