const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("../prisma");

app.use(express.json())
app.use(require("morgan")("dev"));

app.get("/api/departments", async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany();
        res.json(departments);
    } catch (error) {
        next();     
    }
});

app.get("/api/departments/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const department = await prisma.department.findUnique( { where: { id } } );
        if (!department) {
            const error = new Error("Department not found");
            error.status = 404;
            throw error;
        }
         res.json(department);
    } catch (error) {
        next();
    }
});

app.post("/api/department", async (req, res, next) => {
    try {
      const { name, bio, profileImage, contactInfo, departmentId  } = req.body;
      const department = await prisma.department.create({
        data: { name, description, image, contactInfo },
      });
      res.json(department);
    } catch (error) {
      next();
    }
});

app.put("/api/department/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { name, bio, profileImage, contactInfo, departmentId } = req.body;
      const department = await prisma.department.update({
        where: { id },
        data: { name, bio, profileImage, contactInfo, departmentId  },
      });
        res.json(department);
    } catch (error) {
      next();
    }
});

app.delete("/api/department/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      await prisma.department.delete( { where: { id } });
      res.sendStatus(204);
    } catch (error) {
      next();
    }
});



app.get("/api/faculty", async ( req, res, next) => {
    try {
      const faculty = await prisma.faculty.findMany();
      res.json(faculty);
    } catch (error) {
      next();
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
      next();     
    }
});

app.post("/api/faculty", async (req, res, next) => {
    try {
      const { name, bio, profileImage, contactInfo, departmentId  } = req.body;
      const faculty = await prisma.faculty.create({
        data: { name, bio, profileImage, contactInfo, departmentId },
      });
      res.json(faculty);
    } catch (error) {
      next();
    }
});

app.put("/api/faculty/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const { name, bio, profileImage, contactInfo, departmentId } = req.body;
      const faculty = await prisma.faculty.update({
        where: { id },
        data: { name, bio, profileImage, contactInfo, departmentId },
      })
      res.json(faculty);
    } catch (error) {
      next();
    }
});

app.delete("/api/faculty/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      await prisma.faculty.delete( { where: {id} });
      res.sendStatus(404);
    } catch (error) {
      next(); 
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