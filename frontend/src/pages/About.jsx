import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full max-w-112.5 " src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            totam doloribus explicabo aut quod, fugit blanditiis qui repudiandae
            dignissimos nesciunt ipsam quos hic saepe molestiae voluptates quae
            labore, corporis similique?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum porro
            nostrum earum quidem. Sequi est ut, sunt molestiae reprehenderit
            recusandae voluptate placeat facilis nobis laboriosam repellendus
            eligendi, dolore error alias.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            nihil deserunt asperiores sint voluptatibus aspernatur sunt itaque
            qui, neque vitae illo adipisci quos tempora nemo. Incidunt libero
            fugit tempore magni?
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:py-16 py-8 sm:py-20 flex-col gap-5">
          <b className="text-gray-600">Quality Assurance:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            excepturi aspernatur dolor illum unde similique fuga rerum,
            repellendus explicabo perspiciatis. Libero id maiores at accusamus
            quibusdam. Quibusdam, similique. Recusandae, architecto?
          </p>
        </div>
        <div className="border px-10 md:py-16 py-8 sm:py-20 flex-col gap-5">
          <b className="text-gray-600">Conveniance:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            excepturi aspernatur dolor illum unde similique fuga rerum,
            repellendus explicabo perspiciatis. Libero id maiores at accusamus
            quibusdam. Quibusdam, similique. Recusandae, architecto?
          </p>
        </div>
        <div className="border px-10 md:py-16 py-8 sm:py-20 flex-col gap-5">
          <b className="text-gray-600">Exeptional Customer Service:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            excepturi aspernatur dolor illum unde similique fuga rerum,
            repellendus explicabo perspiciatis. Libero id maiores at accusamus
            quibusdam. Quibusdam, similique. Recusandae, architecto?
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
