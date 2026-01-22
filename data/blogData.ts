export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    slug: string;
    image: string; // URL to an image
    category: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Zenith Secures Victory at Tekken World Tour 2025",
        excerpt: "Our team dominated the grand finals with an unforgettable performance by ShadowFist.",
        content: "Detailed content about the victory...",
        date: "October 15, 2025",
        slug: "zenith-victory-twt-2025",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
        category: "Tournament"
    },
    {
        id: "2",
        title: "The Road to Evo: Training Camp Diaries",
        excerpt: "An exclusive look behind the scenes as our players prepare for the biggest event of the year.",
        content: "Detailed content about training...",
        date: "August 10, 2025",
        slug: "road-to-evo-training-diaries",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3",
        category: "Behind the Scenes"
    },
];
