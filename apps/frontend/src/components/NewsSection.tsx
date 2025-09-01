function NewsSection() {
    return (
        <section className="text-white font-druk bg-gradient-to-t from-black to-transparent py-8 sm:py-19">
            <div className="container mx-auto px-2 sm:px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 px-2">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="md:col-span-1 lg:col-span-1 w-full relative mx-auto h-auto overflow-hidden rounded-lg transform transition-transform hover:scale-[1.02]">
                        <img
                            src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                            alt="A football player in a blue Giants jersey runs on the field"
                            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover relative z-0 rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
                            <p className="font-druk font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Worst-to-First Candidates</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:col-span-1">
                        {[{
                            id: 1,
                            title: "Dream Landing Spots for Richardson",
                            alt: "A football player in a Colts jersey stands on the field"
                        },
                        {
                            id: 2,
                            title: "Glenn Shuts Down Nail Trade Rumors",
                            alt: "A football player in a Jets jersey stands with a green helmet"
                        },
                        {
                            id: 3,
                            title: "Predictions for Biggest Remaining FAs",
                            alt: "A football player in a Chargers jersey with a headset on"
                        },
                        {
                            id: 4,
                            title: "Waller Cleared to Practice",
                            alt: "A football player in a Dolphins jersey speaks at a press conference"
                        }].map((item) => (
                            <div 
                                key={item.id} 
                                className="w-full relative mx-auto h-full min-h-[100px] sm:min-h-[120px] overflow-hidden rounded-lg transform transition-transform hover:scale-[1.03]"
                            >
                                <img
                                    src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                                    alt={item.alt}
                                    className="w-full h-full object-cover relative z-0"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="font-druk font-bold text-xs sm:text-sm md:text-base leading-tight">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsSection;