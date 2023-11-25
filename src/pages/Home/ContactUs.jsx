import { TextField } from '@mui/material';
import React from 'react';

const ContactUs = () => {
    return (
      <div className="my-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
              Get in <span className='text-red-600'>Touch</span>
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              We'd love to talk about how we can help you.
            </p>
          </div>
        </div>

        <div className="max-w-[85rem] flex flex-col md:flex-row  justify-center items-center px-4 py-6 sm:px-6 lg:px-8  mx-auto">
          <div className="flex-1">
            <div className="mt-12 max-w-lg mx-auto">
              <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 dark:border-gray-700">
                <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Fill in the form
                </h2>

                <form>
                  <div className="grid gap-4 lg:gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="hs-firstname-contacts-1"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          First Name
                        </label>
                        <TextField
                          id="outlined-basic"
                          label="First name"
                          variant="outlined"
                          size="small"
                          name="first-name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="hs-lastname-contacts-1"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          Last Name
                        </label>
                        <TextField
                          id="outlined-basic"
                          label="Last name"
                          variant="outlined"
                          size="small"
                          name="last-name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="hs-email-contacts-1"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          Email
                        </label>
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          size="small"
                          name="email"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="hs-phone-number-1"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          Phone Number
                        </label>
                        <TextField
                          id="outlined-basic"
                          label="Number"
                          variant="outlined"
                          size="small"
                          name="Number"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="hs-about-contacts-1"
                        className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                      >
                        Details
                      </label>
                      <TextField
                        id="outlined-multiline-static"
                        label="Details"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Send inquiry
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-500">
                      We'll get back to you in 1-2 business days.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="https://i.ibb.co/L9XbQSd/istockphoto-1340452442-612x612-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
    );
};

export default ContactUs;