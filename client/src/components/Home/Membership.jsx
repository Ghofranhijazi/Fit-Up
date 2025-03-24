import React from 'react';
import "./Membership.css";
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


export default function Membership() {
   useEffect(() => {
          AOS.init({
              duration: 1000,  
              once: true,      
          });
      }, []);
      
    return (
<div className='bg-[#f1f4fa]'>
  {/* Services Section */}
<section id="services" className="services py-14 ml-8 mr-8">
  {/* Section Title */}
  <div className="container mx-auto text-left mb-12 flex items-center ml-8">
  <h2 className="text-2m font-light text-gray-500 mr-4">MEMBERSHIP</h2>
  <div className="h-px bg-[#D3678A] w-40"></div>
</div>
<h2 className="text-center text-4xl font-bold text-[#9C2A46] mb-16">
Take a look at our membership plans
  </h2>

  <div className= "cards" data-aos="fade-up" data-aos-delay="500">
    {/* card one */}
  <div className="cardy">
    <div className="myheader">
      <span className="mytitle">Basic Plan</span>
      <span className="myplan">3 /months</span>
      <span className="myprice">19.00JD</span>
    </div>
    <ul className="lists">
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>View basic information (address and working hours).</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Possibility of direct booking through the websit.</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Access user reviews and ratings.</span>
      </li>
    </ul>
    <a href="payment-page.html" className="action">
      Get Started
      </a>
  </div>
{/* card two */}
  <div className="cardy">
    <div className="myheader">
      <span className="mytitle">Standard Plan</span>
      <span className="myplan">6 /months</span>
      <span className="myprice">39.00JD</span>
    </div>
    <ul className="lists">
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>All the features of the Basic plan.</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Notifications about offers and discount.</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Customized monthly reports on the gyms and nurseries that best suit your needs.
        </span>
      </li>
    </ul>
    <a href="payment-page.html" className="action" style={{marginTop:"21px"}}>
      Get Started
      </a>
  </div>
{/* card three */}
  <div className="cardy">
    <div className="myheader">
      <span className="mytitle">Premium Plan</span>
      <span className="myplan">12 /months</span>
      <span className="myprice">49.00JD</span>
    </div>
    <ul className="lists">
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>All Standard Plan Features.</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Customized discounts in agreement with the gym.</span>
      </li>
      <li className="list">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Book a trial appointment at any gym or nursery directly.</span>
      </li>
    </ul>
    <a href="payment-page.html" className="action">
      Get Started
      </a>
  </div>

  </div>

</section>
</div>
    )
}