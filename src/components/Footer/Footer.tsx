import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r mt-6 from-slate-400 via-gray-500 to-slate-500 text-white py-4">
            <div className="px-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center mb-6 md:mb-0 w-full">
                        <Image
                            src="/assets/img/avatar/profile.png" // URL gambar placeholder (ganti dengan gambar avatar sebenarnya)
                            alt="User Avatar"
                            className="w-16 h-16 object-cover"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-2xl font-bold text-white  transform hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                            Raihan Prasetia
                        </h2>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap w-full justify-center md:justify-center space-x-6 text-center md:text-left mb-6 md:mb-0">
                        <a href="#home" className="hover:text-gray-300 transition duration-300">Home</a>
                        <a href="#services" className="hover:text-gray-300 transition duration-300">Services</a>
                        <a href="#about" className="hover:text-gray-300 transition duration-300">About Us</a>
                        <a href="#contact" className="hover:text-gray-300 transition duration-300">Contact</a>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex justify-end space-x-6 mb-6 md:mb-0 w-full">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                            <FaFacebook className="text-3xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                            <FaTwitter className="text-3xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                            <FaInstagram className="text-3xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all duration-300">
                            <FaLinkedin className="text-3xl" />
                        </a>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center text-gray-200 mt-4">
                    <p>&copy; 2024 MyCompany. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
