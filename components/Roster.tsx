"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Twitch, Youtube, Instagram } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { players } from "../public/zenith/players/data.js";
import PlayerModal, { Player } from "./PlayerModal";

export default function Roster() {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePlayerClick = (player: Player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: clear selected player after animation, but keeping it for now serves the exit animation well if we had one on the content itself dependent on data
    };

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
                                className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 hover:border-violet-500/50 transition-colors duration-300 cursor-pointer"
                                onClickCapture={() => handlePlayerClick(player)}
                            >
                                {/* Image Swiper for Player and Characters */}
                                <div className="relative h-80 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 pointer-events-none"></div>

                                    {/* Hover Overlay with Icon */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center pointer-events-none">
                                        <div className="bg-violet-600/90 p-3 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <span className="font-bold text-sm">Voir Profil</span>
                                        </div>
                                    </div>

                                    <div className="relative h-full w-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={player.playerImage}
                                            alt={player.gamertag}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                    </div>

                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                    <span className="text-violet-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                                        {player.name}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{player.gamertag}</h3>
                                    <p className="text-sm text-gray-400 mb-1">
                                        Mains: <span className="text-white font-medium">{player.mains.length > 0 ? player.mains.map(m => m.character).join(", ") : "Still learning"}</span>
                                    </p>
                                    <p className="text-xs text-violet-300 mb-4">{player.rank}</p>

                                    <div className="flex gap-3 pt-4 border-t border-white/10" onClickCapture={(e) => e.stopPropagation()}>
                                        {player.socials.twitter && (
                                            <a href={player.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-500 transition-colors"><Twitter size={18} /></a>
                                        )}
                                        {player.socials.twitch && (
                                            <a href={player.socials.twitch} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors"><Twitch size={18} /></a>
                                        )}
                                        {player.socials.youtube && (
                                            <a href={player.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors"><Youtube size={18} /></a>
                                        )}
                                        {player.socials.instagram && (
                                            <a href={player.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={18} /></a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <PlayerModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    player={selectedPlayer}
                />

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
                `}</style>
            </div>
        </section>
    );
}
