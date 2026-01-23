"use client";

import { motion } from "framer-motion";
import { Twitter, Twitch, Youtube, Instagram } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const players = [
    {
        id: 1,
        gamertag: "VoidWalker",
        name: "Alex Mercer",
        mains: [
            {
                character: "Kazuya Mishima",
                characterImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2600&auto=format&fit=crop"
            },
            {
                character: "Devil Jin",
                characterImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2600&auto=format&fit=crop"
            }
        ],
        rank: "God of Destruction",
        playerImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2600&auto=format&fit=crop",
        socials: { twitter: "#", twitch: "#" }
    },
    {
        id: 2,
        gamertag: "NeonStrike",
        name: "Sarah Lin",
        mains: [
            {
                character: "Reina",
                characterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2574&auto=format&fit=crop"
            }
        ],
        rank: "Tekken God Supreme",
        playerImage: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=2574&auto=format&fit=crop",
        socials: { twitter: "#", youtube: "#" }
    },
    {
        id: 3,
        gamertag: "IronFist",
        name: "Marcus King",
        mains: [
            {
                character: "King",
                characterImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2680&auto=format&fit=crop"
            },
            {
                character: "Armor King",
                characterImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2680&auto=format&fit=crop"
            }
        ],
        rank: "Tekken God Omega",
        playerImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop",
        socials: { twitter: "#", twitch: "#", instagram: "#" }
    },
    {
        id: 4,
        gamertag: "ShadowStep",
        name: "Kenji Sato",
        mains: [
            {
                character: "Jin Kazama",
                characterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
            }
        ],
        rank: "Bushin",
        playerImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop",
        socials: { twitter: "#", twitch: "#" }
    }
];

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
                    slidesPerView="auto"
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
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {players.map((player, index) => (
                        <SwiperSlide key={player.id} className="!w-[350px]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-colors duration-300"
                            >
                                {/* Image Swiper for Player and Characters */}
                                <div className="relative h-80 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10"></div>

                                    <Swiper
                                        modules={[Pagination]}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        loop={true}
                                        className="h-full"
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
            `}</style>
        </section>
    );
}
