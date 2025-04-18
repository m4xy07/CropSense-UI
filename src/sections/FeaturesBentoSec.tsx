"use client";

import React from "react";
import { BentoCard } from "@/components/bentogrid";
import { Keyboard } from "@/components/keyboard";
import { LogoCluster } from "@/components/logocluster";
import { Map } from "@/components/map";
import { AnimatedBeamMultipleOutputDemo } from "@/components/MultipleAnimatedBeam";
import Orb from "@/components/Orb/Orb";

const FeaturesBentoSec = () => {
    return (
        <section className="pb-12 mb-20 pt-4 bg-dark">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[20px] max-w-[510px] text-center">
                            <h2 className="text-[3.5rem] pt-4 font-bold text-center tracking-normal effect-font-gradient">
                                Above and beyond
                            </h2>
                            <p className="text-white/70 text-xl font-inter text-center mt-4 tracking-tight">
                                Next-level features to power your growth.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    id="features"
                    className="mt-10 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-6 lg:grid-rows-2"
                >
                    <div className="bg-black rounded-xl">
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesBentoSec;
