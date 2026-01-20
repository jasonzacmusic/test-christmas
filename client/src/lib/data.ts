export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  category?: string;
  link?: string;
  thumbnail?: string;
  type?: 'tutorial' | 'performance';
}

export interface LiveSession {
  id: string;
  date: string;
  time: string;
  className: string;
  duration: string;
  description: string;
  icon: string;
}

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    title: "ALL the Scary Chords & Progressions you should know 👻",
    category: "Tutorial",
    link: "https://youtu.be/l7B37u8--OQ",
    description: "Learn how to form chords using the dissonant intervals that theory offers and compose some spooky, eerie, and scary music. Using tension intervals - Minor 2nd, Tritone, Major 6th & Major 7th, we build a variety of chords using unique musical concepts.",
    id: "l7B37u8--OQ"
  },
  {
    title: "How to play Chord Connections | Part 1",
    category: "Tutorial",
    link: "https://youtu.be/JCChCSaxFjw",
    description: "This video is part 1 of how to play chord connections.",
    id: "JCChCSaxFjw"
  },
  {
    title: "STOP Wasting Time with Boring Chords - Mysterious Connections Revealed",
    category: "Tutorial",
    link: "https://youtu.be/_yoM8SzSaEk",
    description: "Discover mysterious connections between chords to make your playing more interesting.",
    id: "_yoM8SzSaEk"
  },
  {
    title: "How to Use \"Wrong\" Notes Creatively - Intervals Music Theory",
    category: "Tutorial",
    link: "https://youtu.be/W6rTUhK4RgY",
    description: "Learn how to take the most unstable intervals in music – minor 2nds, tritones, major 7ths & minor 6ths – and turn them into lush, usable chords. Perfect for pianists, composers & arrangers looking to add emotional depth and harmonic colour.",
    id: "W6rTUhK4RgY"
  },
  {
    title: "How to Play Wednesday's Theme with This One Simple Piano Technique?",
    category: "Song",
    link: "https://youtu.be/Z309URkixMU",
    description: "Learn how to play the Wednesday Theme by Danny Elfman as a solo piano arrangement. After transcribing the epic cello bass line, orchestration, percussion, choir, and haunting theremin, this piano arrangement pushes your skills to the limit.",
    id: "Z309URkixMU"
  },
  {
    title: "🎹 Learn to Play The Addams Family Theme on Piano! 🖤",
    category: "Song",
    link: "https://youtu.be/Js31p-7mItU?si=xF4_xE_sAPq41MEg",
    description: "Learn to play The Addams Family Theme on piano in beginner, intermediate & advanced versions. We'll cover the essential music theory, melody phrasing, left-hand rhythm patterns, and ornaments to make your performance sound authentic and full.",
    id: "Js31p-7mItU"
  },
  {
    title: "How to Play the Halloween Theme 🎹 John Carpenter 👻",
    category: "Song",
    link: "https://youtu.be/eGKSpaNCS2k",
    description: "This video teaches you how to play John Carpenter's Halloween Theme on piano.",
    id: "eGKSpaNCS2k"
  },
  {
    title: "How to Play the Ghostbusters Theme on Piano 👻 Easy Piano Tutorial",
    category: "Song",
    link: "https://youtu.be/2cfx5Q4FV38",
    description: "Learn to play the Ghostbusters Theme on piano with this easy tutorial.",
    id: "2cfx5Q4FV38"
  },
  {
    title: "Thriller on the Piano - Michael Jackson",
    category: "Song",
    link: "https://youtu.be/uZ8Gl_p-ghE",
    description: "This video shows you how to play Michael Jackson's \"Thriller\" on the piano.",
    id: "uZ8Gl_p-ghE"
  }
];

export const PLAYLIST_VIDEOS: YouTubeVideo[] = [
  { id: "DFE6WufU3ec", title: "Halloween Riff #1 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/DFE6WufU3ec/hqdefault.jpg", description: "" },
  { id: "M2-jmN7Q3iU", title: "Halloween Riff #2 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/M2-jmN7Q3iU/hqdefault.jpg", description: "" },
  { id: "6c_Vqe9v9JE", title: "Halloween Riff #3 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/6c_Vqe9v9JE/hqdefault.jpg", description: "" },
  { id: "Drb2nG5O3cs", title: "Halloween Riff #4 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/Drb2nG5O3cs/hqdefault.jpg", description: "" },
  { id: "QnKi39VEwcg", title: "Halloween Riff #5 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/QnKi39VEwcg/hqdefault.jpg", description: "" },
  { id: "6jERhlyl3Fo", title: "Halloween Riff #6 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/6jERhlyl3Fo/hqdefault.jpg", description: "" },
  { id: "XGQ5bvKsLpA", title: "Halloween Riff #7 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/XGQ5bvKsLpA/hqdefault.jpg", description: "" },
  { id: "p8rlz0JLE58", title: "Halloween Riff #8 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/p8rlz0JLE58/hqdefault.jpg", description: "" },
  { id: "bK_1X3rPN-g", title: "Halloween Riff #9 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/bK_1X3rPN-g/hqdefault.jpg", description: "" },
  { id: "7WxiIP7wszE", title: "Halloween Riff #10 - Jason Zac", thumbnail: "https://i.ytimg.com/vi/7WxiIP7wszE/hqdefault.jpg", description: "" },
];

export const CHRISTMAS_VIDEOS: YouTubeVideo[] = [
  {
    title: "Learn how to Sing & Play “Go Tell it on the Mountain” - Christmas Piano Accompaniment Tutorial",
    link: "https://youtu.be/ueJEJYHhok4",
    description: "Grow as a Piano player & singer as you learn how to Play & Sing the Christmas Classic, “Go Tell it on the Mountain” in a variety of styles & genres on the Piano with this detailed accompaniment tutorial.",
    id: "ueJEJYHhok4",
    type: "tutorial"
  },
  {
    title: "How to Play Christmas Songs in BLUES STYLE!",
    link: "https://youtu.be/7MKjQxTjSUI",
    description: "Do you enjoy Rock n Roll & Blues Music and want to play your favourite Christmas songs on the Piano? Then look no further! This Christmas Piano tutorial covers popular Christmas hit songs with 2 easy to play rhythm patterns in the Left Hand.",
    id: "7MKjQxTjSUI",
    type: "tutorial"
  },
  {
    title: "Play Feliz Navidad in 5 GENRES on the Piano 🎄",
    link: "https://youtu.be/2uSnr3VwwTQ",
    description: "Wish your loved ones this Christmas in 5 different styles on the Piano with our Christmas Piano tutorial of the classic, “Feliz Navidad”",
    id: "2uSnr3VwwTQ",
    type: "tutorial"
  },
  {
    title: "Deck the Halls - Christmas🎄Piano 🎹 WORKOUT 🏋🏽‍♂️ | How to Transpose, Choose Chords & Rhythm Patterns",
    link: "https://youtu.be/ERMHstMmPXk",
    description: "\"Deck the Halls\" is a traditional Christmas carol that dates all the way back to the 16th century.",
    id: "ERMHstMmPXk",
    type: "tutorial"
  },
  {
    title: "Piano Accompaniment Styles & Chord Patterns for POPULAR Christmas Songs & Carols",
    link: "https://youtu.be/ZpcDit7B9WQ",
    description: "In this Christmas Piano Tutorial by Jason Zac, we cover 5 essential accompaniment patterns for almost all the popular songs & carols to get you to sing while you play or accompany other musicians and singers!",
    id: "ZpcDit7B9WQ",
    type: "tutorial"
  },
  {
    title: "God Rest Ye Merry Gentlemen - Easy & Advanced Christmas Piano Tutorial 🎄🎹",
    link: "https://youtu.be/kMIBQCSZtSw",
    description: "Learn how to play God Rest Ye Merry Gentlemen with our Piano Tutorial at all possible skill levels - Beginner to Advanced",
    id: "kMIBQCSZtSw",
    type: "tutorial"
  },
  {
    title: "We Three Kings 👑 - Christmas 🎄 Piano 🎹 Tutorial",
    link: "https://youtu.be/KwHbCLOgMtk",
    description: "Learn how to play \"We Three Kings of Orient Are\" on Piano with a Waltz (Tango-like) bass in the Left Hand and the Melody with harmonic embellishments in the Right hand.",
    id: "KwHbCLOgMtk",
    type: "tutorial"
  },
  {
    title: "We Wish You a Merry Christmas - Piano Tutorial (Easy & Advanced)",
    link: "https://youtu.be/3KbHN7JY23g",
    description: "Learn how to play We Wish You a Merry Christmas on Piano in a variety of ways starting with the Melody along with Simple bass and then moving on to an Anthemic Choral arrangement, Arpeggios, Bluegrass, and a Loungy Outro!",
    id: "3KbHN7JY23g",
    type: "tutorial"
  },
  {
    title: "EASY Christmas Piano Tutorial - Accompaniment & Solo Arrangement",
    link: "https://youtube.com/live/UxKFxlT3GcY",
    description: "Learn how to play easy versions of your favorite Christmas songs & carols as a Piano accompaniment or Solo arrangement",
    id: "UxKFxlT3GcY",
    type: "tutorial"
  },
  {
    title: "How to play “Rudolf the Red-Nosed Reindeer” - Easy 🎄Christmas Piano 🎹 Tutorial (Swing Blues)",
    link: "https://youtu.be/gtANmS8PxQQ",
    description: "A bluesy piano tutorial on how to play Rudolf the Red-Nosed Reindeer. The easy version includes the melody in the right hand along with the “iconic” blues pattern in the left hand along with passing bass notes.",
    id: "gtANmS8PxQQ",
    type: "tutorial"
  },
  {
    title: "How to play “Joy to the World” - 🎹🎄Christmas Piano Tutorial (Folk Version)",
    link: "https://youtu.be/Ss8wZVuHU18",
    description: "Get into the Christmas piano spirit with our lesson on how to play the timeless carol Joy to the World.",
    id: "Ss8wZVuHU18",
    type: "tutorial"
  },
  {
    title: "Play Jingle Bells on the Piano in 5 ways - Christmas Lesson ❄️🎹",
    link: "https://youtu.be/TSlQ-HDtuR0",
    description: "Learn how to play the “Jingle Bells” on the Piano with 5 chord patterns for different levels.",
    id: "TSlQ-HDtuR0",
    type: "tutorial"
  },
  {
    title: "Play Silent Night on Piano - Beginner Christmas Tutorial ❄️🎹",
    link: "https://youtu.be/ZCdnSsqmAkA",
    description: "Learn how to play the traditional Christmas Carol, \"Silent Night\" on the Piano with both melody and harmony (chords).",
    id: "ZCdnSsqmAkA",
    type: "tutorial"
  },
  {
    title: "O Little Town of Bethlehem - 🎄CHRISTMAS PIANO 🎹 TUTORIAL 🎶",
    link: "https://youtu.be/NoaYZmc6iqw",
    description: "Learn how to play the folk Christmas Carol, \"O Little Town of Bethlehem\" on the Piano at different skill levels",
    id: "NoaYZmc6iqw",
    type: "tutorial"
  },
  {
    title: "When a Child is Born - Boney M - Complete Piano Tutorial - PART 1",
    link: "https://youtu.be/Z1_DtDGoSoY",
    description: "In Part 1, we will learn the Intro, Verse 1 & Verse 2 with the correct chords and their inversions used in the popular version by Boney M.",
    id: "Z1_DtDGoSoY",
    type: "tutorial"
  },
  {
    title: "10 Easy Christmas Songs in 3/4 Time for Piano",
    link: "https://youtu.be/_5cJwOoJ_Nw",
    description: "Here’s a marathon Christmas Piano lesson that aims to teach you 10 songs with 3 different rhythm patterns for the left hand.",
    id: "_5cJwOoJ_Nw",
    type: "tutorial"
  },
  {
    title: "When a Child is Born - Boney M - Complete Piano Tutorial",
    link: "https://youtu.be/1kEm-bXz3v4",
    description: "In Part 2, we will practice block chords in the Right hand along with ornaments while bringing out sixteenth note flavour in the Left Hand with Drum-like Bass movement.",
    id: "1kEm-bXz3v4",
    type: "tutorial"
  },
  {
    title: "Sing & Play your Favourite Christmas Carols (10 songs) - Part 1",
    link: "https://youtu.be/BDuMfjLnKNM",
    description: "Learn how to sing & play 10 Christmas Carols with 10 unique accompaniment patterns for all skill levels.",
    id: "BDuMfjLnKNM",
    type: "tutorial"
  },
  {
    title: "Sing & Play your Favourite Christmas Carols (10 songs) - Part 2",
    link: "https://youtu.be/6WDSjQcUwIY",
    description: "Here’s a marathon Christmas Piano lesson that aims to teach you 10 songs, each having a different scale and rhythm pattern for both hands.",
    id: "6WDSjQcUwIY",
    type: "tutorial"
  },
  {
    title: "How to Play “Fairytale of New York” in 30 Minutes",
    link: "https://youtu.be/TE_JUMz5EI8",
    description: "Here’s a complete Piano tutorial of the entire song, Fairytale of New York by The Pogues feat. Kirsty Maccoll.",
    id: "TE_JUMz5EI8",
    type: "tutorial"
  },
  {
    title: "How to Play \"Linus and Lucy\" | Full Piano Tutorial (including Solos)",
    link: "https://youtu.be/QiIi6HIEl1Y",
    description: "Here’s a detailed piano lesson on the iconic jazz piece Linus and Lucy by the Vince Guaraldi Trio.",
    id: "QiIi6HIEl1Y",
    type: "performance" 
  }
];
