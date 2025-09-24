import AlertComponent from './trianglealert';

export function HarvestableMonthCards() {
    // Static data
    const harvestableMonths = [
        {
            month: "October",
            wholesale_price: 102.4,
            retail_price: 156.7
        }
    ];

    return (
        <div className="w-full p-8 equipment-card-inner rounded-xl shadow-md border border-zinc-50/10">
            <h2 className="text-[20px] font-normal text-white">
                Potential Harvestable Months & Rates
            </h2>
            <p className=' text-base text-zinc-50/70 pt-4'>
            You&apos;ll be able to sell soybean in the following months. The prices are based on the current market trends.
          </p>
            <div className="flex flex-wrap pt-4 gap-[6rem]">
                {harvestableMonths.slice(0, 3).map((item, index) => (
                    item && (
                        <div
                            key={index}
                            style={{ borderRadius: '12px' }}
                            className="flex max-w-fit md:h-[160px] items-left justify-center flex-col overflow-hidden bg-transparent"
                        >
                            <div className="flex flex-row items-left justify-between">
                                <div className="p-0 w-full flex flex-col gap-2">
                                    <div className="text-left text-[22px] text-white">
                                        {item.month}
                                    </div>
                                    <div className="flex flex-row gap-[5rem]">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col border-l-2 border-blue-500 pl-4">
                                                <div className="text-left font-normal text-zinc-50/70 text-[14px]">
                                                    Wholesale
                                                </div>
                                                <div className="text-left text-zinc-50/70 text-[14px]">
                                                    Price
                                                </div>
                                            </div>
                                            <div className="text-left text-[28px] text-zinc-200">
                                                ₹ {item.wholesale_price.toFixed(1)} / kg
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col border-l-2 border-[#713dff] pl-4">
                                                <div className="text-left font-normal text-zinc-50/70 text-[14px]">
                                                    Retail
                                                </div>
                                                <div className="text-left text-zinc-50/70 text-[14px]">
                                                    Price
                                                </div>
                                            </div>
                                            <div className="text-left text-[28px] text-zinc-200">
                                                ₹ {item.retail_price.toFixed(1)} / kg
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    )
                ))}
                
            </div>
            <AlertComponent />
        </div>
    );
}
