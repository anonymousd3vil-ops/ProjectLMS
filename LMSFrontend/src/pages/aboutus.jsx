import CarouselSlides from "../components/carouselSlides.jsx";
import HomeLayout from "../layouts/homeLayout.jsx";
import celebrities from "../constants/celebrityDetails.js";

function AboutUs(){

    return (
        <HomeLayout>
            <title>About Us</title>
            <div className="pt-20 flex flex-col text-white items-center">
                <div className="flex flex-col md:flex-row items-center gap-5 md:mx-20">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200 my-5">
                            We are dedicated to transforming education through innovation, technology, and personalized learning experiences. Our mission is to make quality education accessible to everyone by providing interactive courses, expert-led training, and cutting-edge digital learning solutions. We empower students, professionals, and lifelong learners with the knowledge and skills needed to succeed in an ever-evolving world. By combining engaging content, modern technology, and a learner-first approach, we strive to create an environment where learning is effective, enjoyable, and accessible anytime, anywhere.
                        </p>
                    </section>

                    <div>
                        <img 
                            src="../../assets/aboutUs.png" 
                            alt="" 
                            className="relative z-10 md:w-full md:max-w-xl w-[70%] mx-auto drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)] transition-all duration-500"
                        />
                    </div>
                </div>
                <div className="carousel w-[60%] my-10 rounded-4xl">
                    {celebrities.map( (celebrity) => <CarouselSlides name={celebrity.name} quote={celebrity.quote} image={celebrity.image} slideNumber={celebrity.slideNumber} totalSlides={celebrities.length}/> )}
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;