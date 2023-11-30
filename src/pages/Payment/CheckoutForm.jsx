import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret,setClientSecret] = useState('')

  const [transaction,setTransaction] = useState(null)
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()

  const [price,setPrice] = useState(1)


  const {user} =useAuth()

  

  useEffect(() => {
    
      axiosSecure.post("/create-payment-intent", { price: price })
      .then((res) => {
          console.log("sdfsdfsdf", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
      .catch((error) => {
          console.log("error", error);
        });
  }, [axiosSecure]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        setTransaction(paymentIntent.id);

        const funding = {
          fund: price,
        };
        axiosSecure.post("/funds", funding)
        .then((res => {
          console.log(res)
        }))
        .catch((error) => {
          console.log(error);
        })
      }
    }
  };
  return (
    <div>
      <form
        className="w-[40%] mx-auto p-10 shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="border border-gray-500 p-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
                border: "1px solid black",
              },
            }}
          ></CardElement>
        </div>
        <div>
          <input
            placeholder="Enter Your Donation Amount"
            className="border w-full  focus:outline focus:outline-gray-500 border-gray-400 p-3 rounded-lg placeholder:font-semibold placeholder:text-[#9CA3AF]/90"
            type="number"
            onBlur={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-red-500 active:bg-red-700 px-8 py-2  rounded-lg text-white font-semibold my-6"
            disabled={!stripe || !clientSecret}
          >
            Donate
          </button>
        </div>
        <p className="text-red-500">{error}</p>
        {transaction && (
          <p className="text-green-500">
            Transaction ID: <span className="font-semibold">{transaction}</span> was successful
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
