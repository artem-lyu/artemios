"use client";
import { TypeAnimation } from 'react-type-animation';
import { LogInIcon } from 'lucide-react';
import Image from 'next/image';
import undraw_runner from '@/public/images/undraw_different_love_a-3-rg.svg';
import { motion } from 'framer-motion';

export default async function Page() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-500 flex flex-col items-center justify-center">
        <div className="absolute top-0 right-0 p-6">
          <a href="/login">
            <motion.div whileHover={{ opacity: 0.6 }}>
              <LogInIcon className="h-16 w-16" />
            </motion.div>
          </a>
        </div>

        <div className="right-0 top-1/2">
          <Image
            src={undraw_runner}
            alt="Runner"
            className="opacity-75 w-48 h-auto sm:w-64 md:w-80 lg:w-96"
          />
        </div>

        <div className="text-center p-8 max-w-screen-lg mx-auto">
          <h1 className="text-5xl sm:text-7xl md:text-9xl">WELCOME TO ARTEMIOS</h1>
          <TypeAnimation
            speed={55}
            sequence={[
              "We're so glad you could make it!",
              1000,
              "We're so glad you could make it!\nWe're here to help you grow!",
            ]}
            wrapper="span"
            cursor={false}
            repeat={0}
            className="block mt-4 text-xl sm:text-2xl md:text-3xl"
            style={{ whiteSpace: 'pre-line', height: 'auto' }}
          />

          <div className="mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2 }}
            >
              <motion.button
                className="bg-transparent text-black py-2 px-4 border-2 border-black rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                Get started
              </motion.button>
            </motion.div>
          </div>
        </div>


      </div>
    </>
  );
}
