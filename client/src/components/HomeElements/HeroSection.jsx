import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      className="flex flex-row my-24 mx-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* herotitle */}
      <motion.div
        className="flex gap-5 w-3/5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col px-10">
          <motion.div
            className="text-7xl font-extrabold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Invest in the
            <br />
            <span className="text-8xl font-extrabold text-teal-400">Green Credit Program</span>
          </motion.div>
          <motion.div
            className="mt-4 text-3xl font-semibold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Get yourself custom investment plans and expert guidance on the whole process.
          </motion.div>
          {/* button */}
          <motion.div
            className="flex gap-5 my-10 self-start px-5 py-2 ml-40 text-2xl font-extrabold text-white bg-[#3030FF] rounded-3xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.a
              href="/invest"
              className="flex items-center gap-2   "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div>Start now</motion.div>

              <img loading="lazy" src="/img/arrow-1-4.svg" className="shrink-0 w-9" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
      {/* globe */}
      <motion.div
        className="flex ml-5 pl-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          loading="lazy"
          srcSet="/img/https-lottiefiles-com-animations-globe-pxrotzvjlh.gif"
          className="grow w-full aspect-[1.2]"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
