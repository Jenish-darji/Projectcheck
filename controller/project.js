const { validationResult } = require('express-validator')
const sql = require('../db')
const { pool } = require('postgres')
 

async function addNewProject(req, res) {

  // console.log(req.body)

  const result = validationResult(req)
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    return res.send({ result })
  }

  const { name, description, end_date, p_status, photo_url, uid } = req.body

  console.log({ name, description, end_date, p_status, photo_url, uid });

  try {
    // First SQL statement
    const projectResult = await sql`
      INSERT INTO public.project(name, description, end_date, p_status, photo_url)
      VALUES (${name}, ${description}, ${end_date}, ${p_status}, ${photo_url})
      RETURNING pid
    `;

    console.log(projectResult);
  
    // Second SQL statement
    const userProjectResult = await sql`
      INSERT INTO public.user_project(uid, pid, rid, created_by)
      VALUES (${uid}, ${projectResult[0].pid}, 1, ${uid})
      RETURNING *
    `;

    console.log(userProjectResult);
    return res.send(userProjectResult)
  } catch (e) {
    console.error(e);
    return res.send({ error: "Something went wrong" });
  }
  
}
// create a function to get projects by userid 



async function getProjectsByUserId(req, res) {
  console.log('haa')
  try {
    let userID = req.params.uid;
    const projectList = await sql`
      SELECT up.pid, up.rid, p.name AS project_name, p.description, p.end_date, p.p_status, p.photo_url, r.name AS role
      FROM public.user_project up
      JOIN public.role r ON up.rid=r.rid
      JOIN public.project p ON up.pid=p.pid
      WHERE up.uid=${userID}
      ORDER BY p.end_date
     `
    return res.json(projectList);
  } catch (e) {
    console.log("Error getting the list of Projects", e);

  }

};

//create a function to update project status


async function getProjectsByUID(req, res) {
  // create a function to get projects by userid

  console.log('ping')
  const projects = await sql`
        SELECT *
        FROM project WHERE uid=${uid}
    `
  console.log('pong')
  return res.send(projects)
}
// create a function to get users by project get reference from above function
async function getUsersByProjectId(req, res) {
  try {
    let projectID = req.params.pid;
    const userList = await sql`
      SELECT up.uid, up.pid
      FROM public.user_project up
      JOIN public.user u ON up.uid=u.uid
      WHERE up.pid=${projectID}
    `
    return res.json(userList);
  } catch (e) {
    console.log("Error getting the list of Users for the Project", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addUsersToProject(req, res) {
  const { pid, uids } = req.body;
  console.log({uids, pid});

  // Check if pid and uids are defined and not null
  if (!pid || !uids || !Array.isArray(uids) || uids.length === 0) {
    return res.status(400).json({ error: "Invalid input parameters" });
  }

  try {
    // Validate if the project exists
    const projectExists = await sql`
      SELECT pid FROM public.project WHERE pid=${pid}
    `;

    if (projectExists.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Insert users into the user_project table
    const insertUsersResult = await Promise.all(
      uids.map(async (uid) => {
        // Check if uid is defined and not null
        if (uid) {
          const userProjectResult = await sql`
            INSERT INTO public.user_project(uid, pid, rid, created_by)
            VALUES (${uid}, ${pid}, 1, ${uid})
            RETURNING *
          `;
          return userProjectResult;
        } else {
          return null;
        }
      })
    );

    return res.json(insertUsersResult);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}








module.exports = {
  addNewProject,
  getProjectsByUID,
  getProjectsByUserId,
  getUsersByProjectId,
  addUsersToProject
}