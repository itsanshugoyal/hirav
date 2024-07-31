import { FaQs, HowItWorks, Component, HeroSection, NavBar } from "../index";
const Home = () => {
  return (
    <>
      <NavBar />
      <div className="w-4/5 mx-auto pb-32 ">
        <HeroSection />
        <a href="#component" style={{ scrollBehavior: "smooth" }} className="transition-all">
          <img src="/img/vector-1.svg" alt="" className="mx-auto pt-12 mb-20" />
        </a>
        <Component />
        <HowItWorks />
        <FaQs />
      </div>
    </>
  );
};

export default Home;
