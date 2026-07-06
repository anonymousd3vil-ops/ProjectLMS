function CarouselSlides({name, quote, image, slideNumber, totalSlides}){
    return (
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full flex items-center justify-center">
            <div className="flex flex-col md:flex-row justify-center  items-center gap-20 mx-10 ">
                <img
                    src={image}
                    className="w-50 h-50 rounded-full drop-shadow-[0_20px_40px_rgba(255,193,7,0.4)]" 
                />
                <p className="text-xl">{quote}<br /> <span className="font-semibold text-yellow-500 ">~{name}</span></p>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(slideNumber == 1 ? totalSlides : (slideNumber-1))}`} className="btn btn-circle">❮</a>
                <a href={`#slide${(slideNumber) % totalSlides + 1}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    );
}

export default CarouselSlides;