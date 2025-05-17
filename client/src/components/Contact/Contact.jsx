import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const userId = useSelector(state => state.user.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // لما يتغير userId خزنها في localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem('user_id', userId);
    }
  }, [userId]);

  // تعديل handleChange و handleSubmit مثل اللي عندك مع إضافة user_id في body
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user_id = localStorage.getItem('user_id') || userId;

    const response = await fetch('http://localhost:5000/api/contact/contactus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      toast.error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    toast.error('Something went wrong.');
  }
};
    return (
<>
        {/* Hero Section */}
       
  <section id="hero" className="relative w-full h-120 flex items-center  justify-center text-white">
   {/* Background Video */}
   <img
  className="absolute inset-0 w-full h-full object-cover filter"
  src="https://img.freepik.com/free-photo/dumbbells-blue-pink-background_23-2147628652.jpg?t=st=1745246002~exp=1745249602~hmac=94dc963ad27133984d2ee725104b1b05faf047b2f59fdfcc1153f0ae8500b4b1&w=1060"
  alt="Background"
/>


        {/* Overlay with Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(40, 36, 41, 0.8)',
          }}
        ></div>
 {/* Hero Content */}
 <div className="relative z-10 text-center max-w-3xl px-6 mt-25">
      <h2 className="text-4xl md:text-5xl font-bold mb-7 animate-fade-up" >
       <span className="text-[#C0526F]" style={{ fontFamily: "'Dancing Script', sans-serif"}}>Contact With Us</span>
      </h2>
      <p className="text-lg md:text-xl font-light mb-10 animate-fade-up delay-100">
      Contact us anytime, we are always here to to help!
      </p>
    </div>
</section>
<div className='w-full h-1 bg-[#C0526F]'></div>


        <div className="w-full bg-gray-100 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Contact Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Phone Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[#D3678A] hover:text-[#9C2A46] font-medium">+962-788844145</p>
                </div>
              </div>
    
              {/* Email Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[#D3678A] hover:text-[#9C2A46] font-medium">info@FitUp.com</p>
                </div>
              </div>
    
              {/* Location Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[#D3678A] hover:text-[#9C2A46] font-medium">8502 Jordan, Zarqa</p>
                </div>
              </div>
            </div>
    
            {/* Form and Map Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Send us a message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Your name
                      </label>
                      <input type="text" id="name" value={formData.name} onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Email address
                      </label>
                      <input type="email" id="email" value={formData.email} onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">
                        Phone number
                      </label>
                      <input type="tel" id="phone" value={formData.phone} onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                    
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block mb-2 font-medium text-gray-700">
                      Subject
                      </label>
                     <input type="text" id="subject" value={formData.subject} onChange={handleChange}
                        placeholder="Enter subject"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                      Message
                    </label>
                   <textarea id="message" value={formData.message} onChange={handleChange}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-100"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#C0526F] hover:bg-[#d1637f] text-white font-medium py-3 rounded transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
    
              {/* Google Maps Section */}
              <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
                 <h2 className="text-2xl font-bold mb-6 text-center">Find us</h2>
                
                {/* Map Container */}
              
                <iframe className="w-full min-h-[24rem] sm:min-h-[28rem] bg-gray-200 rounded-lg overflow-hidden"
                 src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3381.3895903407015!2d36.0877696!3d32.0587099!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sen!2sjo!4v1736962464303!5m2!1sen!2sjo"
                 width={600}
                 height={450}
                 style={{ border: 0 }}
                 allowFullScreen=""
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
              </div>
            </div>
          </div>
     </>
      );
    };

