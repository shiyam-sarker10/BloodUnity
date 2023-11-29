import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {

    
    return (
      <div className='my-20'>
        <h3 className="text-3xl font-bold text-center ">
          Payment <span className="text-red-600">Donation</span>
        </h3>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    );
};

export default Payment;