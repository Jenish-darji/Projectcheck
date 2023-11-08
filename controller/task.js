const { validationResult } = require('express-validator')
const sql = require('../db')
const { pool } = require('postgres')


const addTask = async (req,res) =>{

    const result = validationResult(req)
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        return res.send({ result })
    }
    const {title, status, priority, created_by, assign_to, description, created_date} = req.body

    console.log({title, status, priority, created_by, assign_to, description, created_date});
    const date = new Date(); // Replace this with your date object

    const isoString = new Intl.DateTimeFormat('sv', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date);
    

    const taskResult = await sql`
    INSERT INTO public.task_list(title, status, priority, created_by, assign_to, description, created_date)
        VALUES (${title}, ${status}, ${priority}, ${created_by}, ${assign_to}, ${description}, ${date})
        RETURNING tid
    `;

    console.log(taskResult);

    const userTaskListResult = await sql`
    INSERT INTO public.user_task_list(uid, tid, pid, created_by)
    VALUES (${uid}, ${taskResult[0].tid}, ${projectResult[0].pid}, ${created_by})
    RETURNING *
    `;

    console.log(userTaskListResult);
    
    return res.send({taskResult, userTaskListResult});
}
async function getTaskByProject(req, res){
  


    try {
        let pid = req.params.pid;
        const task_list = await sql`
          SELECT 
          p.tid, p.title, p.status, p.priority, p.created_by, p.assign_to, p.description, p.created_date
          FROM task_project 
          INNER JOIN task_list as t on task_project.tid=t.id
          WHERE pid=${pid}`
         
        return res.json(task_list);
      } catch (e) {
        console.log("Error getting the list of tasks", e);
    
      }
}

module.exports = {
    addTask,
    getTaskByProject
}