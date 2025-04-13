require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const JWT_SECRET = process.env.JWT_SECRET

const app = express();
const PORT = 3000;

const prisma = require("../prisma");

app.use(cors({ origin: /localhost/ }));
app.use(express.json())
app.use(require("morgan")("dev"));


function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

app.get("/api/departments", async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany();
        res.json(departments);
    } catch (error) {
        next(error);     
    }
});

app.get("/api/departments/:id", async (req, res, next) => {
  try {
      const id = +req.params.id;
      const department = await prisma.department.findUnique({
          where: { id },
          include: { faculty: true }, 
      });

      if (!department) {
          const error = new Error("Department not found");
          error.status = 404;
          throw error;
      }

      res.json(department);
  } catch (error) {
      next(error);
  }
});


app.get("/api/departments/:id/faculty", async (req, res, next) => {
  try {
      const departmentId = +req.params.id;
      const faculty = await prisma.faculty.findMany({
          where: { departmentId },
      });
      res.json(faculty);
  } catch (error) {
      next(error);
  }
});


app.post("/api/departments", authenticate, async (req, res, next) => {
    try {
      const { name, description, image, contactInfo   } = req.body;
      const department = await prisma.department.create({
        data: { name, description, image, contactInfo },
      });
      res.json(department);
    } catch (error) {
      next(error);
    }
});

app.put("/api/departments/:id", authenticate, async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { name, description, image, contactInfo } = req.body;
      const department = await prisma.department.update({
        where: { id },
        data: { name, description, image, contactInfo   },
      });
        res.json(department);
    } catch (error) {
      next(error);
    }
});

app.delete("/api/departments/:id", authenticate, async (req, res, next) => {
    try {
      const id = +req.params.id;
      await prisma.department.delete( { where: { id } });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
});



app.get("/api/faculty", async ( req, res, next) => {
    try {
      const faculty = await prisma.faculty.findMany();
      res.json(faculty);
    } catch (error) {
      next(error);
    }
});

app.get("/api/faculty/:id", async ( req, res, next ) => {
    try {
      const id = +req.params.id;
      const singleFaculty = await prisma.faculty.findUnique( { where: {id} } );
      if (!singleFaculty) {
        const error = new Error("Faculty Member Not Found");
        error.status = 404;
        throw error;
      }
      res.json(singleFaculty);
    } catch (error) {
      next(error);     
    }
});


app.get("/api/faculty/:id/department", async (req, res, next) => {
  try {
      const facultyId = +req.params.id;
      const faculty = await prisma.faculty.findUnique({
          where: { id: facultyId },
          include: { department: true },  
      });
      if (!faculty) {
          const error = new Error("Faculty Member Not Found");
          error.status = 404;
          throw error;
      }
      res.json(faculty.department);  
  } catch (error) {
      next(error);
  }
});



app.post("/api/faculty", authenticate, async (req, res, next) => {
    try {
      const { name, bio, profileImage, contactInfo, departmentId  } = req.body;
      const faculty = await prisma.faculty.create({
        data: { name, bio, profileImage, contactInfo, departmentId },
      });
      res.json(faculty);
    } catch (error) {
      next(error);
    }
});

app.put("/api/faculty/:id", authenticate, async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { name, bio, profileImage, contactInfo, departmentId } = req.body;
      const faculty = await prisma.faculty.update({
        where: { id },
        data: { name, bio, profileImage, contactInfo, departmentId },
      })
      res.json(faculty);
    } catch (error) {
      next(error);
    }
});

app.delete("/api/faculty/:id", authenticate, async (req, res, next) => {
    try {
      const id = +req.params.id;
      await prisma.faculty.delete( { where: {id} });
      res.sendStatus(204);
    } catch (error) {
      next(error); 
    }
});





app.get("/api/admin", async (req, res, next) => {
    try {
        const admin = await prisma.admin.findMany();
        res.json(admin);
    } catch (error) {
        next(error);
    }
});

app.get("/api/admin/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const admin = await prisma.admin.findUnique( { where: {id } });
      if (!admin) {
        const error = new Error("Admin not found");
        throw error;
      }
      res.json(admin);
    } catch (error) {
      next(error);
    }
});

app.post("/api/admin/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Admin already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    const { password: _, ...adminData } = admin;


    res.status(201).json({
      message: "Admin registered",
      admin: adminData,
      token, 
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." }); 
  }
});

app.post("/api/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials." });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "72h",
    });

    const { password: _, ...adminData } = admin;

    res.json({ token, admin: adminData });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/:id", authenticate, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.update({
      where: { id },
      data: { email, password: hashedPassword },
    });

    const { password: _, ...adminData } = admin;
    res.json(adminData);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/:id", authenticate, async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.admin.delete( { where: { id }} );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


 
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal server error.';
    res.status(status).json({ message });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });