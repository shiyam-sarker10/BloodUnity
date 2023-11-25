import React from 'react';

const Feature = () => {
    return (
      <div>
        {/* header  */}
        <div>
          <h1 className="text-center font-bold text-3xl md:text-4xl">
            Our Impactful <span className="text-red-600">Features</span>
          </h1>
          {/* <img
          className='mx-auto my-4'
            src="https://i.ibb.co/Wg0zkqJ/Screenshot-25-removebg-preview.png"
            alt=""
          /> */}
        </div>

        {/* feature section  */}

        <div className="max-w-[1366px] px-4 py-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-8 mx-auto">
          <div className="mt-20  grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Life-Saving Precision
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-red-600">
                99.95%
              </p>
              <p className="mt-1 text-gray-500">Precision Lifesaving</p>
            </div>

            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Community Allies
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-red-600">
                2,000+
              </p>
              <p className="mt-1 text-gray-500">Community Support.</p>
            </div>

            <div className="text-center">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                Donor Satisfaction
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-red-600">
                85%
              </p>
              <p className="mt-1 text-gray-500">Happy Donors.</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Feature;