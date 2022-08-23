// FOR ENV FILE
require('dotenv').config()

// FOR EXPRESS
const express = require("express");
const db = require('../server/db');

// NOT USED IN THIS PROJECT, FOR DEBUGGING?
const morgan = require("morgan");
const app = express();
const cors = require("cors");

// SO ONE DOMAIN CAN BE QUERIED BY ANOTHER
app.use(cors());       

// ATTACHES BODY OF JSON FILE TO REQ OBJECT FOR CRUD FUNCTIONS
app.use(express.json());    

// GET ALL to do items
app.get
(
    "/api/v1/prollyshould/", async (req, res) =>
    {
        try
        {
            const results = await db.query("SELECT * FROM todolist");

            res.status(200).json
            ({
                status: "success",
                results: results.rows.length,
                data:
                {
                    todos: results.rows
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);


// GET only not done to do items
app.get
(
    "/api/v1/prollyshould/notdone", async (req, res) =>
    {
        try
        {
            const results = await db.query("SELECT * FROM todolist where done = false");

            res.status(200).json
            ({
                status: "success",
                results: results.rows.length,
                data:
                {
                    todos: results.rows
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// GET only done to do items
app.get
(
    "/api/v1/prollyshould/done", async (req, res) =>
    {
        try
        {
            const results = await db.query("SELECT * FROM todolist where done = true");
            //console.log(results);

            res.status(200).json
            ({
                status: "success",
                results: results.rows.length,
                data:
                {
                    todos: results.rows
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

// GET only done to do items
app.get
(
    "/api/v1/prollyshould/notdone/done/", async (req, res) =>
    {
        try
        {
            const sort1 = req.body.sort1 || "category";
            const sort2 = req.body.sort2 || "datecreated";

            const results = await db.query(
                "SELECT * FROM todolist WHERE done = false ORDER BY $1, $2", 
                [sort1, sort2]);
            //console.log(results);

            res.status(200).json
            ({
                status: "success",
                results: results.rows.length,
                data:
                {
                    todos: results.rows
                }
            })
        }
        catch (error)
        {
            console.log(error);
        }
    }
);

//GET A SINGLE to do item
app.get
(
    "/api/v1/prollyshould/:id", async (req, res) =>
    {    
        try
        {
            const results = await db.query("SELECT * FROM todolist where id = $1",
            [req.params.id]);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    results: results.rows[0]
                }
            });
        }

        catch (error)
        {
            console.log(error);
        } 
    }
);

//CREATE A To Do Item
app.post
(
    "/api/v1/prollyshould/createtodo", async (req, res) =>
    {
        try
        {
            //INSERT INTO todolist (content, category) VALUES ('Brush teeth', 'Health');

            let date;
            date = new Date();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' + 
                ('00' + date.getUTCHours()).slice(-2) + ':' + 
                ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
                ('00' + date.getUTCSeconds()).slice(-2);

            const results = await db.query("INSERT INTO todolist (content, category, dateCreated) VALUES ($1, $2, $3) returning *", 
            [req.body.content, req.body.category, date]);

            res.status(201).json
            ({
                status: "success",
                data:
                {
                    todo: results.rows[0],
                }
            })
        }

        catch (error)
        {
            console.log(error);
        }
    }
);

//UPDATE A to do item
app.put
(
    "/api/v1/prollyshould/:id", async (req, res) =>
    {
        try
        {
            const results = await db.query("UPDATE todolist SET content = $1, category = $2 WHERE id = $3 returning *", 
            [req.body.content, req.body.category, req.params.id]);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    todo: results.rows[0],
                }
            })
        }

        catch (error)
        {
            console.log(error);
        }
    }
);

// DO ITEM
app.put
(
    "/api/v1/prollyshould/done/:id", async (req, res) =>
    {
        try
        {

            let date;
            date = new Date();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' + 
                ('00' + date.getUTCHours()).slice(-2) + ':' + 
                ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
                ('00' + date.getUTCSeconds()).slice(-2);

            const results = await db.query("UPDATE todolist SET done = true, dateDONE = $2 WHERE id = $1 returning *",
            [req.params.id, date]);

            res.status(200).json
            ({
                status: "success",
                data:
                {
                    todo: results.rows[0],
                }
            })
        }
        catch (error)
        {

        }
    }
);

//DELETE A to do item
app.delete
(
    "/api/v1/prollyshould/:id", async (req, res) =>
    {
        try
        {
            const results = await db.query("DELETE FROM todolist WHERE id = $1", 
            [req.params.id]);

            //console.log(results);

            res.status(204).json
            ({
                status: "success",
            })
        }

        catch (error)
        {
            console.log(error);
        }
    }
);

// DEFINE PORT
const port = process.env.PORT || 3001;

//STARTUP
app.listen
(port, () => 
    {
        console.log(`SERVER UP ON PORT ${port}`);
    }
);