import React from 'react';
import useAllReq from '../../../../hooks/useAllReq';

const DonorReqView = () => {
    const { AllReq, refetch } = useAllReq();
    return (
        <div>
            thisi s view
        </div>
    );
};

export default DonorReqView;