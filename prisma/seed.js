const prisma = require("../prisma");
const seed = async () => {
    

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



// model Faculty {
//     id Int @id @default(autoincrement())
//     name String
//     bio String
//     profileImage String
//     contactInfo String 
//     department Department @relation(fields: [departmentId], references: [id])
//     departmentId Int
//   }
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
         name: "Victor",
        },
        {
         name: "Madeira Edwards",
        },
        {
         name: "Ms. Valerie Frizzle",
        },
        {
         name: "Sister Michael",
        },
        {
         name: "Janine Teagues",
        },
        {
         name: "Mohammad Amer",
        },
        {
         name: "Mr. Johnson",
        },
        {
         name: "Ms. Darbus",
        },
        {
         name: "Uncle Iroh",
        },
        {
         name: "Manish Kulkarni",
        },
        {
         name: "Issa Rae",
        },
    ];

}





















};













seed()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });