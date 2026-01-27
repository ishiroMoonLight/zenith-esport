"use client";

import { motion } from "framer-motion";
import { Twitter, Twitch, Youtube, Instagram } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { players } from "../public/zenith/players/data.js";

export default function Roster() {
    return (
        <section id="team" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-900/10 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                        Active <span className="text-violet-500">Roster</span>
                    </h2>
                    <div className="w-24 h-1 bg-violet-600 mx-auto rounded-full"></div>
                </motion.div>

                {/* Automatic Swiper Carousel for Players */}
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    loop={true}
                    className="mySwiper pb-16"
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    spaceBetween={20}
                >
                    {players.map((player, index) => (
                        <SwiperSlide key={player.id} className="!h-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-colors duration-300"
                            >
                                {/* Image Swiper for Player and Characters */}
                                <div className="relative h-80 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 pointer-events-none"></div>

                                    <Swiper
                                        modules={[Pagination]}
                                        pagination={{
                                            clickable: true,
                                            el: `.pagination-${player.id}`,
                                        }}
                                        loop={true}
                                        className="h-full player-image-swiper"
                                    >
                                        {/* Player Image Slide */}
                                        <SwiperSlide>
                                            <div className="relative h-full w-full">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={player.playerImage}
                                                    alt={player.gamertag}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                />
                                                <div className="absolute top-4 left-4 bg-violet-600/90 backdrop-blur-sm px-3 py-1 rounded-full z-20">
                                                    <span className="text-white text-xs font-bold">JOUEUR</span>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        {/* Character Images Slides */}
                                        {player.mains.map((main, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div className="relative h-full w-full">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={main.characterImage}
                                                        alt={main.character}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute top-4 left-4 bg-violet-600/90 backdrop-blur-sm px-3 py-1 rounded-full z-20">
                                                        <span className="text-white text-xs font-bold">{main.character.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* Custom pagination for this player's swiper */}
                                    <div className={`pagination-${player.id} absolute bottom-2 left-0 right-0 z-30 flex justify-center gap-2`}></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                    <span className="text-violet-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                                        {player.name}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{player.gamertag}</h3>
                                    <p className="text-sm text-gray-400 mb-1">
                                        Mains: <span className="text-white font-medium">{player.mains.map(m => m.character).join(", ")}</span>
                                    </p>
                                    <p className="text-xs text-violet-300 mb-4">{player.rank}</p>

                                    <div className="flex gap-3 pt-4 border-t border-white/10">
                                        {player.socials.twitter && (
                                            <a href={player.socials.twitter} className="text-gray-400 hover:text-sky-500 transition-colors"><Twitter size={18} /></a>
                                        )}
                                        {player.socials.twitch && (
                                            <a href={player.socials.twitch} className="text-gray-400 hover:text-violet-500 transition-colors"><Twitch size={18} /></a>
                                        )}
                                        {player.socials.youtube && (
                                            <a href={player.socials.youtube} className="text-gray-400 hover:text-red-500 transition-colors"><Youtube size={18} /></a>
                                        )}
                                        {player.socials.instagram && (
                                            <a href={player.socials.instagram} className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={18} /></a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: rgba(139, 92, 246, 0.5);
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                }
                .swiper-pagination-bullet-active {
                    background: rgb(139, 92, 246);
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: rgb(139, 92, 246);
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 24px;
                }
                .player-image-swiper .swiper-slide {
                    height: 100%;
                }
                .player-image-swiper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}</style>
        </section>
    );
}
