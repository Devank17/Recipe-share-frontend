import React from "react";

const About = () => {
  return (
    <>
      <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
        <img
          className="absolute h-full w-full "
          src="https://res.cloudinary.com/dt6oidtog/image/upload/v1742208471/Main_qe3k26.jpg"
          alt="Image"
        />
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12 font-[monsterrat]">
        <p className="text-xl leading-relaxed mb-6 ">
          RecipeShare is a community-driven platform where food enthusiasts can
          discover, share, and celebrate culinary creations from around the
          world.
        </p>
        <p className="mb-6 tracking-wide font-serif">
          Our mission is to bring people together through the universal language
          of food. We believe that cooking is not just about nourishment, but
          also about creativity, tradition, and connection. Whether you're a
          professional chef or a home cook, RecipeShare provides a space for you
          to showcase your recipes and draw inspiration from others.
        </p>
        <p className="mb-6 tracking-wide font-serif">
        Founded in 2025, RecipeShare has grown into a vibrant community of food lovers who are passionate about sharing their culinary journeys. From traditional family recipes passed down through generations to innovative dishes that push the boundaries of cooking, our platform celebrates the diversity and richness of global cuisine.
        </p>
      </div>
    </>
  );
};

export default About;
