/**
 * ====================================================================
 * ROMANTIC BIRTHDAY SURPRISE - CONFIGURATION
 * ====================================================================
 * Edit this file to easily customize names, dates, messages, music,
 * captions, and timeline milestones for your girlfriend!
 */

const CONFIG = {
  // ------------------------------------------------------------------
  // 1. COUPLE INFORMATION
  // ------------------------------------------------------------------
  herName: "My Love",        // Change to her name or nickname (e.g. "Priya", "Ananya", "Baby", etc.)
  hisName: "Your Love",      // Change to your name (e.g. "Naman")
  relationshipTitle: "My Everything ❤️",

  // ------------------------------------------------------------------
  // 2. BIRTHDAY DATE & TIME (YEAR-MONTH-DAYTHOUR:MINUTE:SECOND)
  // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour time)
  // ------------------------------------------------------------------
  birthdayDate: "2026-09-07T00:00:00",

  // ------------------------------------------------------------------
  // 3. MUSIC SETTINGS
  // ------------------------------------------------------------------
  audioFilePath: "assets/music/our-song.mp3",
  songTitle: "Our Romantic Song 🎵",
  artistName: "For My Special Girl",

  // ------------------------------------------------------------------
  // 4. HERO / HOME PAGE
  // ------------------------------------------------------------------
  hero: {
    badge: "A Special Digital Surprise For You ✨",
    heading: "Happy Birthday, My Love ❤️",
    subtitle: "Today is all about celebrating the most beautiful person in my life.",
    buttonText: "Open Your Surprise ❤️",
    heroImage: "assets/photos/photo_03.jpeg" // Cozy restaurant couple portrait
  },

  // ------------------------------------------------------------------
  // 5. HEARTFELT BIRTHDAY LETTER
  // ------------------------------------------------------------------
  letter: {
    title: "A Letter From My Heart 💌",
    salutation: "My Dearest,",
    paragraphs: [
      "Happy Birthday to the girl who makes my world brighter, my days happier, and my life more beautiful. ❤️",
      "I don't know if words will ever be enough to explain how special you are to me, but I want you to know that every moment with you is something I treasure.",
      "Your smile, your laugh, your little habits, and even the smallest moments we share mean more to me than you know.",
      "On your special day, I just want to wish you endless happiness, success, love, and everything your heart desires.",
      "Thank you for being you.\nThank you for being a beautiful part of my life.",
      "Happy Birthday, my love. ❤️\nHere's to more memories, more laughter, more adventures, and many more birthdays together."
    ],
    closing: "Forever & Always Yours,",
    signature: "With all my love ❤️"
  },

  // ------------------------------------------------------------------
  // 6. CURATED MEMORIES (Carefully selected 12 non-repetitive photos)
  // ------------------------------------------------------------------
  photos: [
    {
      id: 1,
      src: "assets/photos/photo_03.jpeg",
      caption: "Cozy dinner dates & your sweetest smile 🕯️❤️",
      category: "dates",
      orientation: "portrait"
    },
    {
      id: 2,
      src: "assets/photos/photo_06.jpeg",
      caption: "Red roses for the prettiest flower in the world 🌹✨",
      category: "dates",
      orientation: "landscape"
    },
    {
      id: 3,
      src: "assets/photos/photo_07.jpeg",
      caption: "Your cute, playful side that always melts my heart 🧸💕",
      category: "candid",
      orientation: "portrait"
    },
    {
      id: 4,
      src: "assets/photos/photo_10.jpeg",
      caption: "Looking into your eyes — my favorite place to be 🌸💍",
      category: "traditional",
      orientation: "portrait"
    },
    {
      id: 5,
      src: "assets/photos/photo_13.jpeg",
      caption: "Breathtakingly gorgeous in pink, glowing as always 💖",
      category: "candid",
      orientation: "portrait"
    },
    {
      id: 6,
      src: "assets/photos/photo_16.jpeg",
      caption: "Blessed moments & timeless traditions together 🪔✨",
      category: "traditional",
      orientation: "portrait"
    },
    {
      id: 7,
      src: "assets/photos/photo_18.jpeg",
      caption: "Sunshine, blue skies, and your radiant laugh ☀️🌿",
      category: "adventures",
      orientation: "portrait"
    },
    {
      id: 8,
      src: "assets/photos/photo_20.jpeg",
      caption: "Exploring new horizons hand in hand with you 🗺️🤍",
      category: "adventures",
      orientation: "portrait"
    },
    {
      id: 9,
      src: "assets/photos/photo_22.jpeg",
      caption: "The world is so peaceful when you're by my side 🌊💙",
      category: "adventures",
      orientation: "landscape"
    },
    {
      id: 10,
      src: "assets/photos/photo_24.jpeg",
      caption: "Ocean waves, sea spray, and purest joy with you 🌊❤️",
      category: "adventures",
      orientation: "portrait"
    },
    {
      id: 11,
      src: "assets/photos/photo_25.jpeg",
      caption: "Sitting on the sand, dreaming of our tomorrow 🌅✨",
      category: "adventures",
      orientation: "portrait"
    },
    {
      id: 12,
      src: "assets/photos/photo_26.jpeg",
      caption: "To a lifetime of endless seaside sunsets together 🥂💕",
      category: "dates",
      orientation: "landscape"
    }
  ],

  // ------------------------------------------------------------------
  // 7. REASONS I LOVE YOU
  // ------------------------------------------------------------------
  reasons: [
    {
      title: "Your Smile",
      desc: "It lights up my darkest days and instantly brings peace to my heart. Seeing you smile is genuinely my favorite thing in the world.",
      icon: "✨"
    },
    {
      title: "The Way You Make Me Happy",
      desc: "In ways no one else ever could. Even on the most ordinary day, just being with you makes life feel magical.",
      icon: "💖"
    },
    {
      title: "Your Kindness",
      desc: "The warmth, grace, and tenderness you show to everyone around you. You have a heart of pure gold.",
      icon: "🌸"
    },
    {
      title: "Your Beautiful Heart",
      desc: "Soft, caring, empathetic, and full of genuine love. You love with your whole soul, and that inspires me every day.",
      icon: "🕊️"
    },
    {
      title: "The Little Things You Do",
      desc: "Your sweet expressions, the cute habits only I get to notice, the way you look at me, and how you care so deeply.",
      icon: "🎀"
    },
    {
      title: "The Memories We Create",
      desc: "From beach waves washing over our feet to cozy quiet dinners, every second spent with you turns into a treasured memory.",
      icon: "📸"
    },
    {
      title: "Simply Because You're You",
      desc: "Irreplaceable, wonderful, strong, and beautiful inside and out. I love every single part of who you are.",
      icon: "👑"
    }
  ],

  // ------------------------------------------------------------------
  // 8. OUR STORY (Timeline Milestones)
  // ------------------------------------------------------------------
  timeline: [
    {
      badge: "The Beginning",
      title: "The Day We Met",
      date: "A Day I'll Never Forget",
      desc: "The moment our paths crossed and fate did its magic. Little did I know that my entire universe was about to change for the best.",
      photo: "assets/photos/photo_03.jpeg"
    },
    {
      badge: "The Spark",
      title: "Our First Memorable Moment",
      date: "Butterflies & Sweet Smiles",
      desc: "The laughs that came so naturally, the long conversations where time vanished, and the realization that you were someone truly special.",
      photo: "assets/photos/photo_06.jpeg"
    },
    {
      badge: "Special Place",
      title: "Our Favorite Memory",
      date: "By The Ocean Waves",
      desc: "Sitting side by side on the sand, listening to the gentle rhythm of the sea, with your head on my shoulder. In that quiet moment, everything felt complete.",
      photo: "assets/photos/photo_25.jpeg"
    },
    {
      badge: "Closer Each Day",
      title: "The Moments That Made Us Closer",
      date: "Tradition & Warm Hearts",
      desc: "Through every celebration, inside joke, and honest conversation, our bond only grew deeper and more meaningful.",
      photo: "assets/photos/photo_10.jpeg"
    },
    {
      badge: "Today's Celebration",
      title: "Today — Her Birthday 🎂",
      date: "Celebrating The Queen of My Heart",
      desc: "Today the world celebrates the most wonderful human being. You deserve all the joy, love, warmth, and magic life has to offer.",
      photo: "assets/photos/photo_13.jpeg"
    },
    {
      badge: "Forever & Ever",
      title: "And This Is Only The Beginning...",
      date: "To All Our Tomorrows",
      desc: "Here's to a thousand more sunsets, countless dreams fulfilled, unending laughter, and an eternity of holding your hand.",
      photo: "assets/photos/photo_26.jpeg"
    }
  ],

  // ------------------------------------------------------------------
  // 9. FINAL SURPRISE & WISH
  // ------------------------------------------------------------------
  finalSurprise: {
    bgImage: "assets/photos/photo_13.jpeg",
    title: "One Last Thing... ❤️",
    message: "No matter where life takes us, I hope we continue creating beautiful memories together.\n\nHappy Birthday, beautiful. ❤️\n\nI love you.",
    buttonText: "Make a Wish 🎂",
    wishSentMessage: "Your wish has been sent to the universe. ✨❤️\nMay every single dream of yours come true!"
  },

  // ------------------------------------------------------------------
  // 10. SECRET EASTER EGG
  // ------------------------------------------------------------------
  secretNote: {
    title: "You Found My Secret Note! 💌",
    message: "P.S. If you're reading this, know that you are the most precious person in my life. Every beat of my heart whispers how grateful I am for you. Forever yours! ❤️"
  }
};
