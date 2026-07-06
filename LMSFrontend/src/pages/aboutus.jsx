import HomeLayout from "../layouts/homeLayout";

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
                    <div id="slide1" className="carousel-item relative w-full flex items-center justify-center">
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10 ">
                            <img
                                src="../../assets/cvRaman.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl">"The essence of science is independent thinking, hard work, and not equipment." <br /> <span className="font-semibold text-yellow-500 ">~Sir C. V. Raman</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide6" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full flex items-center justify-center">
                        
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10">
                            <img
                                src="../../assets/albert.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl">"Imagination is more important than knowledge." <br /> <span className="text-yellow-500 font-semibold">~Albert Einstein</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full flex items-center justify-center">
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10">
                            <img
                                src="../../assets/drKalam.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl">"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action." <br /> <span className="text-yellow-500 font-semibold">~Dr. A. P. J. Abdul Kalam</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full flex items-center justify-center">
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10">
                            <img
                                src="../../assets/newton.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl">"If I have seen further, it is by standing on the shoulders of giants." <br /> <span className="text-yellow-500 font-semibold">~Sir Isaac Newton</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide5" className="carousel-item relative w-full flex items-center justify-center">
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10">
                            <img
                                src="../../assets/ramanujan.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl">"An equation for me has no meaning unless it expresses a thought of God." <br /> <span className="text-yellow-500 font-semibold">~Srinivasa Ramanujan</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide6" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide6" className="carousel-item relative w-full flex items-center justify-center">
                        <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10">
                            <img
                                src="../../assets/sardar.jpg"
                                className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                            />
                            <p className="text-xl ">"Manpower without unity is not a strength unless it is harmonized and united properly."<br /> <span className="text-yellow-500 font-semibold">~Sardar Vallabhbhai Patel</span></p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide5" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </HomeLayout>
    )
}

export default AboutUs;