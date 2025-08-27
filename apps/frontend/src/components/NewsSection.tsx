function NewsSection() {
    console.log("render NewsSection()");
    return (
        <section className="text-white font-druk">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="md:col-span-1 lg:col-span-1 w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                    <img
                        src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                        alt="A football player in a blue Giants jersey runs on the field"
                        className="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="font-druk font-bold text-lg md:text-xl lg:text-3xl">Worst-to-First Candidates</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:col-span-1">
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
                        <div key={item.id} className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                            <img
                                src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                                alt={item.alt}
                                className="w-full h-auto relative z-0 rounded-lg scale-110 transition-all duration-300 hover:scale-100"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="font-druk font-bold text-xs md:text-sm">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewsSection;