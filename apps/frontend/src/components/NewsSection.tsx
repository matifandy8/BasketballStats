

function NewsSection() {
    console.log("render NewsSection()");
    return (
        <section className="text-white font-druk">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="md:col-span-1 lg:col-span-1 relative">
                    <img
                        src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                        alt="A football player in a blue Giants jersey runs on the field"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="p-2">
                        <p className="font-druk font-bold text-lg md:text-xl lg:text-3xl">Worst-to-First Candidates</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:col-span-1">
                    <div className="flex flex-col">
                        <img
                            src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                            alt="A football player in a Colts jersey stands on the field"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                        <div className="p-1">
                            <p className="font-druk font-bold text-sm md:text-base">Dream Landing Spots for Richardson</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <img
                            src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                            alt="A football player in a Jets jersey stands with a green helmet"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                        <div className="p-1">
                            <p className="font-druk font-bold text-sm md:text-base">Glenn Shuts Down Nail Trade Rumors</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <img
                            src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                            alt="A football player in a Chargers jersey with a headset on"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                        <div className="p-1">
                            <p className="font-druk font-bold text-sm md:text-base">Predictions for Biggest Remaining FAs</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <img
                            src="https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250820135136233-null.png"
                            alt="A football player in a Dolphins jersey speaks at a press conference"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                        <div className="p-1">
                            <p className="font-druk font-bold text-sm md:text-base">Waller Cleared to Practice</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsSection;