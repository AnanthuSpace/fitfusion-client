import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const PaymentFailed = () => {
    return (
        <div className='background-gradient-main d-flex align-items-center h-100'>
        <div className="w-100">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center glass-effect">
                        <div className="card-body">
                            <h1 className="card-title mb-4 text-danger">
                                Payment Failed
                            </h1>
                            <p className="card-text text-white">
                                Unfortunately, your payment could not be processed. Please try again later or contact support if the problem persists.
                            </p>
                            <a onClick={()=>navigate(-3)} className="btn gradient-red-white mt-3">Retry</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PaymentFailed;
