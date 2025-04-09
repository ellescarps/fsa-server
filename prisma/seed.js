const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const seed = async () => {
    
const createAdmins = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.admin.create({
        data: {
            email: "admin@fsa.edu",
            password: hashedPassword,
        }
    });
}


const createDepartments = async () => {
    const departments = [
        {
            name: "English",
            description: "covers classic literature, counterculture writings, drama, and poetry forms",
            image: "https://uoa.edu.iq/wp-content/uploads/2020/05/English.jpg",
            contactInfo: "eng@fsa.edu",
        },
        {
            name: "Intersectional US History",
            description: "covers Black US and Global History, Intersectional Revolutionary Movements, and Black Panther Party Initiatives",
            image: "https://logos-world.net/wp-content/uploads/2022/03/Black-Panther-Party-Symbol.png",
            contactInfo: "ushistory@fsa.edu",
        },
        {
            name: "Ancient Civilizations",
            description: "covers ancient Rome, Egypt, and Greek History and Mythology",
            image: "https://as1.ftcdn.net/jpg/04/68/55/80/1000_F_468558071_6FGbhj0iERsCHUff6XwBwP53DwRrfcC8.jpg",
            contactInfo: "ancientCivi@fsa.edu"
        },
        {
            name: "Math",
            description: "offers geometry, algebra, and advanced math courses",
            image: "https://m.media-amazon.com/images/I/41MGiLNhy2L._AC_UF894,1000_QL80_.jpg",
            contactInfo: "math@fsa.edu",
        },
        {
            name: "Theatre Arts/Drama & StageCraft",
            description: "covers onstage and oncamera acting classes, backstage technical theatre, and performance analysis",
            image: "https://www.shutterstock.com/image-vector/color-cartoon-illustration-depicting-theatre-260nw-445393579.jpg",
            contactInfo: "tds@fsa.edu",
        },
        {
            name: "Science",
            description: "offers biology, chemistry, physics, and astrophysics",
            image: "https://m.media-amazon.com/images/I/71edLQXbWNL.jpg",
            contactInfo: "science@fsa.edu",
        },
        {
            name: "Computer Science",
            description: "covers all programming languages and applications",
            image: "https://www.shutterstock.com/image-vector/banner-about-programming-coding-course-260nw-1870989130.jpg",
            contactInfo: "compsci@fsa.edu",
        },
    ];
    await prisma.department.createMany( { data: departments });
};


const createFaculty = async () => {
    const faculty = [
        {
         name: " George Feeny",
         bio: "the secret of life is people change people..it's about what us does for them. As a professor, I guide my students through introspective discussions. We read and learn to analyze material within the aspects that relates to each unique student.",   
         profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemoPwPn6Dl6vjDQdMOdlWWw_pvyj8a-Oerg&s",
         contactInfo: "mrfeeny@fsa.edu",
         departmentId: 1,
        },
        {
         name: "Victor Rodenmaar Jr.",
         bio: "It's 10:00 O'Clock. You have five minutes precisely. Then I want to hear a pin drop. Do not arrive late to my classes and I assure you will receive the finest instruction as we dive into the depths of ancient civilizations; egyptian mythology of which is my specialty.",
         profileImage: "https://encaffeinated.ca/wp-content/uploads/2015/04/latest.jpg",
         contactInfo: "victor@fsa.edu",
         departmentId: 3,
        },
        {
         name: "Madeira Edwards",
         bio: "I enjoy introducing students to intersectional history, covering movements that include all communities that usually tend to be left out of the US education system. We are all interconnected and we can not be free until we are all free; we'll learn from revolutionary figures and movements and exercise how we can put into practice impactful actions every day to prevent the continuing nefarious cycles history reiterates",
         profileImage: "https://www.victoryforwomen.org/sites/default/files/share_bundle/Maya%20Angelou.jpg",
         contactInfo: "madeiraed@fsa.edu",
         departmentId: 2,
        },
        {
         name: "Ms. Valerie Frizzle",
         bio: "Take chances, make mistakes, get messy! and Seatbelts, everyone!",
         profileImage: "https://static.wikia.nocookie.net/p__/images/0/0f/Mrs._Frizzle.png/revision/latest?cb=20160505233220&path-prefix=protagonist",
         contactInfo: "msfrizzle@fsa.edu",
         departmentId: 6,
        },
        {
         name: "Sister Michael",
         bio: "If anyone is feeling anxious or worried.. or even if you just want to chat, please, please, do not come crying to me. And do not ask why I became a nun; part of the reason I became a nun..free accommodation.",
         profileImage: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/10/Sister-Michael-folds-her-arms-in-Derry-Girls.jpg",
         contactInfo: "sismike@fsa.edu",
         departmentId: 4,
        },
        {
         name: "Janine Teagues",
         bio: "Our real heroes are our teachers. They don’t have cool powers like spiderman or invisible cars like wonder woman. Some of them can’t afford cars. But they still are our heroes.",
         profileImage: "https://static.wikia.nocookie.net/abbottelementary/images/0/0b/Janine_Teagues.png/revision/latest/scale-to-width/360?cb=20240202194021",
         contactInfo: "msteagues@fsa.edu",
         departmentId: 5,
        },
        {
         name: "Mohammad Amer",
         bio: "We dive into our histories and leave the legacies of ourselves for the next generations. Within our lifetime, we will free ourselves and each other. We will learn to organize and understand from the people before us and create with the people around us on a path not towards peace but collective liberation. Soon, you will be able to distinguish between the two and bring positive changes to our world.",
         profileImage: "https://pbs.twimg.com/media/Giiv28_WgAAsTyl?format=jpg&name=large",
         contactInfo: "mo@fsa.edu",
         departmentId: 2,
        },
        {
         name: "Mr. Johnson",
         bio: "A dream can be a distraction just as easy as it can be a goal. We will learn techniques to apply ourselves so that we meet our goals as tangible as we can make the dream that will follow it feel.",
         profileImage: "https://pbs.twimg.com/media/GOXwe-KXYAAcm-K?format=jpg&name=large",
         contactInfo: "mrjohnson@fsa.edu",
         departmentId: 7,
        },
        {
         name: "Ms. Darbus",
         bio: "Proximity to the arts is cleansing for the soul. There are no bad actors, only bad directors unless you don't show up to work on your craft. We will harness techniques for times when you can access emotions and times when you just cannot. We will breathe through our words, the silence, and the space we create within the context of stories we will soon get to know and honor. I will be of guidance to you and enhance from where each individual is coming from. We will grow that unique spark within each of you. No student will be left behind, the world's a stage to fill.",
         profileImage: "https://static.wikia.nocookie.net/hsmtmts/images/b/b6/A_Star_is_Reborn_Promotion_9.jpeg/revision/latest?cb=20230803174756",
         contactInfo: "msdarbus@fsa.edu",
         departmentId: 5,
        },
        {
         name: "Uncle Iroh",
         bio: "It is important to draw wisdom from many different places. If you take it from only one place, it becomes rigid and stale. Understanding others, the other elements and the other nations will help you become whole.",
         profileImage: "https://static.wikia.nocookie.net/p__/images/f/fb/Iroh_with_tea.png/revision/latest?cb=20230122204156&path-prefix=protagonist",
         contactInfo: "unciroh@fsa.edu",
         departmentId: 6,
        },
        {
         name: "Manish Kulkarni",
         bio: " 'The three best friends of a spiritual seeker are self-study, self-control, and selfless service. Self-study means studying, in the light of scriptures, our body and mind to make the necessary rectifications, and our soul to reinstate its correlation' - Mahayogi Buddh Puri. ",
         profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiNzlVOSruXiBQ8xjJscnCu1XElCmgOS3Uw&s",
         contactInfo: "mkulkarni@fsa.edu",
         departmentId: 1,
        },
        {
         name: "Issa Rae",
         bio: "If you don't define yourself for yourself, you'll be crushed into other people's fantasies of you and eaten alive. Failure is a stepping stone to success; dream big, start small, but most importantly, just start.",
         profileImage: "https://cdn.britannica.com/16/252016-050-9A10AA1B/Issa-Rae-2019.jpg",
         contactInfo: "issarae@fsa.edu",
         departmentId: 5,
        },
    ];
        await prisma.faculty.createMany( { data: faculty } );
};

await createAdmins();
await createDepartments();
await createFaculty();



};
seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });